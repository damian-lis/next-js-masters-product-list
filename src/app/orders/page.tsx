import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getOrders } from "@/graphql-services/getOrders";

export default async function OrderPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}

	const userOrders = await getOrders(email);

	return (
		<div>
			<h1>{user.firstName}&rsquo;s Orders:</h1>
			{userOrders.length === 0 ? (
				<div>No orders found</div>
			) : (
				<ul>
					{userOrders.map((order) => (
						<div
							key={order.id}
							className="mt-2 w-fit rounded-md border  border-blue-100 bg-gray-200 p-4"
						>
							<h2>
								<b>ID:</b> {order.id}
							</h2>
							<h2>
								<b>Status:</b> {order.status}
							</h2>
							<h2>
								<b>Products:</b>
							</h2>
							<pre>{JSON.stringify(order.lines, null, 2)}</pre>
						</div>
					))}
				</ul>
			)}
		</div>
	);
}
