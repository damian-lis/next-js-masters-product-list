import React from "react";
import { type Route } from "next";

import { ActiveLink } from "../atoms/ActiveLink";

interface LinkItem<T extends string> {
	href: Route<T> | URL;
	isDisabled: boolean;
	name: string | number;
}

interface PaginationProps<T extends string> {
	links: (LinkItem<T> | undefined)[];
}

export function Pagination<T extends string>({ links }: PaginationProps<T>) {
	return (
		<div aria-label="pagination">
			{links.map((link, index) => {
				if (!link) return;
				return (
					<ActiveLink key={index} isDisabled={link.isDisabled} href={link.href}>
						{link.name}
					</ActiveLink>
				);
			})}
		</div>
	);
}
