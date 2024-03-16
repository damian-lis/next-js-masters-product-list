import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	currentUser,
} from "@clerk/nextjs";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { SearchInput } from "@/ui/molecules/SearchInput";
import { CartIcon } from "@/components/CartIcon";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "NextJS Masters Product List",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<section className="mx-auto mb-5 mt-5 max-w-screen-sm ">
						<Suspense>
							<SearchInput />
						</Suspense>
					</section>
					<nav className="flex w-full justify-center">
						<ul className="mt-2 flex justify-center space-x-4">
							<li>
								<ActiveLink href="/">Home</ActiveLink>
							</li>
							<li>
								<ActiveLink activeWhen={"/products"} href="/products/1?sortBy=price">
									All
								</ActiveLink>
							</li>
							<ListItemOrdersLink />
							<li>
								<CartIcon />
							</li>
							<li>
								<ActiveLink activeWhen={"/collections"} href="/collections/summer-vibes">
									Collections
								</ActiveLink>
							</li>
							<li>
								<ActiveLink activeWhen={"/categories"} href="/categories/t-shirts/1">
									Categories
								</ActiveLink>
							</li>
						</ul>
						<div className="text-s ml-4 cursor-pointer rounded-md border border-blue-200 px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:bg-blue-100">
							<SignedIn>
								<UserButton />
							</SignedIn>
							<SignedOut>
								<SignInButton />
							</SignedOut>
						</div>
					</nav>
					<section className="mx-auto max-w-md p-4 sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
						{children}
					</section>
				</body>
			</html>
		</ClerkProvider>
	);
}

const ListItemOrdersLink = async () => {
	const user = await currentUser();

	if (!user) return;

	return (
		<li>
			<ActiveLink href="/orders">Orders</ActiveLink>
		</li>
	);
};
