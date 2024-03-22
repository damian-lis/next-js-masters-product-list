"use client";

import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<div className="ml-2">
			<Menu
				className={clsx("lg:hidden", {
					"cursor-pointer border-2 border-solid bg-blue-100 text-blue-500": isOpen,
				})}
				onClick={() => setIsOpen((v) => !v)}
			/>

			{isOpen && (
				<ul className="border-1 absolute right-16 top-16 z-10 rounded  border-2 border-blue-100 bg-slate-100 p-4 leading-10  lg:hidden ">
					<li>
						<ActiveLink href="/">Home</ActiveLink>
					</li>
					<li>
						<ActiveLink activeWhen={"/products"} href="/products/1?sortBy=price">
							Products
						</ActiveLink>
					</li>
					{children}
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
			)}
		</div>
	);
};
