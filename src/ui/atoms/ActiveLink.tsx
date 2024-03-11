"use client";

import clsx from "clsx";
import { type Route } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode } from "react";

export function ActiveLink<T extends string>({
	href,
	children,
	className,
	isDisabled,
	activeClassName = "bg-blue-100 text-blue-500",
	activeWhen = href,
	asSubLink,
	...props
}: {
	href: Route<T> | URL;
	activeClassName?: string;
	isDisabled?: boolean;
	asSubLink?: boolean;
	activeWhen?: string | URL;
	children: ReactNode;
	className?: string;
	keepSearchParams?: boolean;
}) {
	const pathname = usePathname();
	const searchParam = useSearchParams().toString();
	const currentPath = `${pathname}${searchParam ? `?${searchParam}` : ""}`;
	const currentPathParts = currentPath.split("/");

	const activePathParts = (activeWhen as string)?.split("/");
	const isActive = activePathParts.every((activePart, i) => activePart === currentPathParts[i]);

	return (
		<Link
			{...props}
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
