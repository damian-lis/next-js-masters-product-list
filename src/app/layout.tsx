import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const inter = Inter({ subsets: ["latin"] });

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
				<nav>
					<ul className="mt-2 flex justify-center space-x-4">
						<li>
							<ActiveLink href="/">Homepage</ActiveLink>
						</li>
						<li>
							<ActiveLink href="/products">Products</ActiveLink>
						</li>
					</ul>
				</nav>
				<section className="mx-auto max-w-md p-4 sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
					<ApolloWrapper>{children}</ApolloWrapper>
				</section>
			</body>
		</html>
	);
}
