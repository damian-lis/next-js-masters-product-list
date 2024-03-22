import { currentUser } from "@clerk/nextjs";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const ListItemOrdersLink = async () => {
	const user = await currentUser();

	if (!user) return;

	return (
		<li>
			<ActiveLink href="/orders">Orders</ActiveLink>
		</li>
	);
};
