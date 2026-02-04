'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import { createClient } from '@/lib/supabase/server'

export async function startCheckoutSession(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('You must be logged in to purchase')
  }

  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    customer_email: user.email,
    metadata: {
      user_id: user.id,
      product_id: productId,
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  })

  return session.client_secret
}

export async function checkSubscriptionStatus() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { hasAccess: false, status: 'not_logged_in' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, subscription_end_date')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return { hasAccess: false, status: 'no_profile' }
  }

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
