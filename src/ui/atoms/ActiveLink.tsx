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
	activePath = href,
	asSubLink,
}: {
	href: Route<T> | URL;
	activeClassName?: string;
	isDisabled?: boolean;
	asSubLink?: boolean;
	activePath?: string | URL;
	children: ReactNode;
	className?: string;
}) {
	const pathname = usePathname();
	const pathnameParts = pathname.split("/"); // TODO: Change the name
	const activePathParts = (activePath as string)?.split("/"); // TODO: Change the name

	const isActive = activePathParts.every((part, index) => part === pathnameParts[index]);

	return (
		<Link
			href={href as Route} // INFO: I had to do that since it is flaky (sometimes it works without type casting but sometimes not - it breaks a deployment)
			{...(isActive ? { "aria-current": true } : {})}
			className={clsx(
				"text-s rounded-md px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:bg-blue-50",
				className,
				{
					[activeClassName]: isActive,
					"pointer-events-none bg-gray-300 opacity-40": isDisabled,
					[`text-xs`]: asSubLink,
				},
			)}
		>
			{children}
		</Link>
	);
}
