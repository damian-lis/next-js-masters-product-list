import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
							<ActiveLink href="/">Home</ActiveLink>
						</li>
						<li>
							<ActiveLink isExact={false} href="/products">
								All
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
