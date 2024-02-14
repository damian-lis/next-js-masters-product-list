"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export const ActiveLink = ({ href, children }: { href: string; children: ReactNode }) => {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={clsx(
				"rounded-md px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-blue-50",
				{ "bg-blue-100 text-blue-500": isActive },
			)}
		>
			{children}
		</Link>
	);
};
