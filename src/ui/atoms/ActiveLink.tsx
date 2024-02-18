"use client";

import clsx from "clsx";
import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function ActiveLink<T extends string>({
	href,
	children,
	className,
	isDisabled,
	activeClassName = "bg-blue-100 text-blue-500",
	isExact = true,
}: {
	href: Route<T> | URL;
	activeClassName?: string;
	isDisabled?: boolean;
	isExact?: boolean;
	children: ReactNode;
	className?: string;
}) {
	const pathname = usePathname();
	const choosenPathname = isExact ? pathname : `/${pathname.split("/")[1]}`;
	const isActive = choosenPathname === href;

	return (
		<Link
			href={href}
			{...(isActive ? { "aria-current": true } : {})}
			className={clsx(
				"rounded-md px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-blue-50",
				className,
				{ [activeClassName]: isActive, "pointer-events-none bg-gray-300 opacity-40": isDisabled },
			)}
		>
			{children}
		</Link>
	);
}
