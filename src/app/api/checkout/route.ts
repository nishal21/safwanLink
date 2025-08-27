import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const { title, price, file_url, link, type, currency } = await req.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: (currency || 'USD').toLowerCase(),
          product_data: {
            name: title,
            // description removed to avoid showing link or file_url on Stripe Checkout
          },
          unit_amount: Math.round(Number(price) * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?file_url=${encodeURIComponent(file_url || '')}&link=${encodeURIComponent(link || '')}&type=${encodeURIComponent(type || '')}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/content`,
  });
  return NextResponse.json({ url: session.url });
}
