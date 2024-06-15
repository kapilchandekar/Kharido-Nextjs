import { BASE_URL } from "@/http";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const reqBody = await request.json();
    const { items, email } = await reqBody;

    const updatedItems = await items.map((item) => ({
      quantity: item.availableQty,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.img ],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: updatedItems,
      mode: "payment",
      success_url:
        `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_APP_BASE_URL}`,
      metadata: {
        email,
      },
    });
    return NextResponse.json({
      message: "Connection is alive",
      success: true,
      id: session.id,
    });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
