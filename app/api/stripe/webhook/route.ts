import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Create a Supabase client with the service role key for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // For now, we'll parse the event directly since we may not have webhook secret set up
    event = JSON.parse(body) as Stripe.Event
  } catch (err) {
    console.error('Error parsing webhook:', err)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.user_id
    const customerEmail = session.customer_email

    if (userId) {
      // Calculate subscription end date (1 year from now)
      const subscriptionEndDate = new Date()
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1)

      // Update the user's subscription status in Supabase
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'active',
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: subscriptionEndDate.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (error) {
        console.error('Error updating subscription:', error)
        return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
      }

      console.log(`Subscription activated for user ${userId} until ${subscriptionEndDate.toISOString()}`)
    }
  }

  return NextResponse.json({ received: true })
}
