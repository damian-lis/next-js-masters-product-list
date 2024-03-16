"use client";

import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { StyledInput } from "../atoms/StyledInput";

export const SearchInput = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

	const debounced = useDebouncedCallback(() => {
		router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
	}, 500);

	return (
		<StyledInput
			type="search"
			value={searchTerm}
			onChange={(e) => {
				setSearchTerm(e.target.value);
				debounced();
			}}
			placeholder={"Search categories or collections..."}
		/>
	);
};
