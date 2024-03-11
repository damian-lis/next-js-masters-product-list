import { cookies } from "next/headers";

export const getCartIdFromCookies = () => cookies().get("cartId")?.value;
