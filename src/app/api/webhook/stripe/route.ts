/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest): Promise<Response> {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		return new Response("No webhook secret", { status: 500 });
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		return new Response("No Stripe secret key", { status: 500 });
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = req.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 400 });
	}

	const event = stripe.webhooks.constructEvent(
		await req.text(),
		signature,
		webhookSecret,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		// based on the event type we should update our server graphql and change the order status
		case "checkout.session.completed":
			console.log(event.data.object.metadata?.cartId); // we provide the previously saved cart id
			break;

		default:
			break;
	}

	console.dir(event, { depth: 999 });

	return new Response(null, { status: 204 }); // regardless of action in the switch case statement we should always return something - in this case stauts 204
}
