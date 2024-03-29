import React from "react";
import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

interface PaginationProps<T extends string> {
	currentPage: number;
	resourcesTotal: number;
	resourcesPerPage: number;
	baseUrl: Route<T> | URL;
	searchParams?: Record<string, string>;
}

export function Pagination<T extends string>({
	currentPage,
	resourcesTotal,
	resourcesPerPage,
	baseUrl,
	searchParams = {},
}: PaginationProps<T>) {
	const totalPages = Math.ceil(resourcesTotal / resourcesPerPage);

	const searchParamsString = Object.entries(searchParams)
		.map(([name, value]) => `${name}=${value}`)
		.join("&");

	const getUrl = (pageNumber: number) =>
		`${baseUrl as string}/${pageNumber}${searchParamsString ? `?${searchParamsString}` : ""}` as Route;

	const pageNumbersToShow = getPageNumbersToShow(currentPage, totalPages);

	return (
		<section aria-label="pagination" className="mt-8 text-center">
			<ActiveLink isDisabled={currentPage === 1} href={getUrl(currentPage - 1)}>
				Prev
			</ActiveLink>
			{pageNumbersToShow.map((pageNumber) => (
				<ActiveLink href={getUrl(pageNumber)} key={pageNumber}>
					{pageNumber}
				</ActiveLink>
			))}
			<ActiveLink isDisabled={currentPage === totalPages} href={getUrl(currentPage + 1)}>
				Next
			</ActiveLink>
		</section>
	);
}

const getPageNumbersToShow = (currentPage: number, totalPages: number) => {
	let pageNumbers = Array.from(Array(totalPages).keys()).map((e) => e + 1);

	if (currentPage === totalPages) {
		pageNumbers = pageNumbers.slice(-3, currentPage);
	} else if (currentPage === 1) {
		pageNumbers = pageNumbers.slice(currentPage - 1, +3);
	} else {
		pageNumbers = pageNumbers.slice(currentPage - 2, currentPage + 1);
	}

	return pageNumbers;
};
