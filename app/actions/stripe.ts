'use server'

import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function checkSubscriptionStatus() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.log("[v0] No user found:", userError)
      return { hasAccess: false, status: 'not_logged_in' }
    }

    console.log("[v0] User found:", user.email)

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_end_date')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.log("[v0] Profile error:", profileError)
      // Profile doesn't exist yet - user needs to subscribe
      return { hasAccess: false, status: 'no_profile' }
    }

    if (!profile) {
      console.log("[v0] No profile found")
      return { hasAccess: false, status: 'no_profile' }
    }

    console.log("[v0] Profile found:", profile)

    // Check if subscription is active and not expired
    if (profile.subscription_status === 'active') {
      if (profile.subscription_end_date) {
        const endDate = new Date(profile.subscription_end_date)
        if (endDate > new Date()) {
          return { hasAccess: true, status: 'active', endDate: profile.subscription_end_date }
        } else {
          return { hasAccess: false, status: 'expired' }
        }
      }
      return { hasAccess: true, status: 'active' }
    }

    return { hasAccess: false, status: profile.subscription_status || 'trial' }
  } catch (error) {
    console.error("[v0] Error in checkSubscriptionStatus:", error)
    return { hasAccess: false, status: 'error' }
  }
}

export async function verifyPaymentAndActivate(sessionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'You must be logged in' }
  }

  try {
    // Verify the checkout session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return { success: false, error: 'Payment not completed' }
    }

    // Verify the email matches (extra security)
    if (session.customer_email !== user.email && session.customer_details?.email !== user.email) {
      return { success: false, error: 'Payment email does not match your account' }
    }

    // Calculate subscription end date (1 year from now)
    const startDate = new Date()
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1)

    // Update the user's subscription status
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'active',
        subscription_start_date: startDate.toISOString(),
        subscription_end_date: endDate.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating subscription:', updateError)
      return { success: false, error: 'Failed to activate subscription. Please contact support.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Stripe verification error:', error)
    return { success: false, error: 'Failed to verify payment with Stripe' }
  }
}
