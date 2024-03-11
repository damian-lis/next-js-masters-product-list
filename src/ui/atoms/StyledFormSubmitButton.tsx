"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { StyledButton } from "./StyledButton";

export const StyledFormSubmitButton = ({ children, ...props }: { children: React.ReactNode }) => {
	const { pending } = useFormStatus();

	return (
		<StyledButton {...props} type="submit" disabled={pending}>
			{children}
		</StyledButton>
	);
};
