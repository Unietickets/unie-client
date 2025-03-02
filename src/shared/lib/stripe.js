import 'server-only'
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = new loadStripe(process.env.STRIPE_SECRET_KEY)
