import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { SearchInput } from "@/ui/molecules/SearchInput";

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
		<html lang="en">
			<body className={inter.className}>
				<section className="mx-auto mb-5 mt-5 max-w-screen-sm ">
					<Suspense>
						<SearchInput />
					</Suspense>
				</section>
				<nav>
					<ul className="mt-2 flex justify-center space-x-4">
						<li>
							<ActiveLink href="/">Home</ActiveLink>
						</li>
						<li>
							<ActiveLink activePath={"/products"} href="/products/1">
								All
							</ActiveLink>
						</li>
						<li>
							<ActiveLink activePath={"/categories"} href="/categories/t-shirts/1">
								Categories
							</ActiveLink>
						</li>
						<li>
							<ActiveLink activePath={"/collections"} href="/collections/summer-vibes">
								Collections
							</ActiveLink>
						</li>
					</ul>
				</nav>
				<section className="mx-auto max-w-md p-4 sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
					{children}
				</section>
			</body>
		</html>
	);
}
