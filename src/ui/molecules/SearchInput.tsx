"use client";

import React, { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { StyledInput } from "../atoms/StyledInput";

export const SearchInput = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const debounced = useDebouncedCallback((value: string) => {
		const queryString = createQueryString("query", value);
		router.push(`/search?${queryString}`);
	}, 500);

	return (
		<StyledInput
			type="text"
			value={searchTerm}
			onChange={(e) => {
				setSearchTerm(e.target.value);
				debounced(e.target.value);
			}}
			placeholder={"Search categories or collections..."}
		/>
	);
};
