import { cookies } from "next/headers";

export const removeCartIdFromCookies = () => cookies().set("cartId", "");
