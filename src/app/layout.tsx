import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ClerkProvider} from "@clerk/nextjs";
import clsx from "clsx";

import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Search } from "@/ui/molecules/Search";
import { CartIcon } from "@/components/CartIcon";
import { SignedInAndOutButton } from "@/components/SignedInAndOutButton";
import { MobileNav } from "@/components/MobileNav";
import { ListItemOrdersLink } from "@/components/ListItemOrdersLink";

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
				<body className={clsx(inter.className)}>
					<nav className="bg-slate-100">
						<div className="mx-auto flex max-w-7xl justify-between p-4">
							<ul className="mr-10 mt-2 hidden justify-center space-x-4 lg:flex">
								<li>
									<ActiveLink href="/">Home</ActiveLink>
								</li>
								<li>
									<ActiveLink activeWhen={"/products"} href="/products/1?sortBy=price">
										Products
									</ActiveLink>
								</li>
								<ListItemOrdersLink />
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

							<div className="flex w-full items-center">
								<Suspense>
									<Search />
								</Suspense>
								<CartIcon />
								<MobileNav>
									<ListItemOrdersLink />
								</MobileNav>
								<SignedInAndOutButton />
							</div>
						</div>
					</nav>
					<section className="mx-auto h-full max-w-md p-4 sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
						{children}
					</section>
					<footer className="mt-4 border-t-2 bg-slate-100 p-4 text-center">
						© Damian Lis 2024
					</footer>
				</body>
			</html>
		</ClerkProvider>
	);
}
