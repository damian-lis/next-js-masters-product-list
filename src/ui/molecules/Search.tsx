"use client";

import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { StyledInput } from "../atoms/StyledInput";

export const Search = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const query = searchParams.get("query");

	const [searchTerm, setSearchTerm] = useState(query || "");

	useEffect(() => {
		if (!query) setSearchTerm("");
	}, [query]);

	const debounced = useDebouncedCallback(() => {
		if (!searchTerm || searchTerm.length === 1) return;
		router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
	}, 500);

	return (
		<StyledInput
			className="mr-4 w-full"
			type="search"
			value={searchTerm}
			onChange={(e) => {
				setSearchTerm(e.target.value);
				debounced();
			}}
			placeholder={"Search..."}
		/>
	);
};
