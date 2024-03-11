import React from "react";

export const StyledButton = ({
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			{...props}
			className="disabled:cursor-wait-sm mt-5 rounded border bg-slate-200 px-6 py-2 shadow-sm transition-colors duration-200 hover:bg-blue-50 disabled:opacity-20"
		>
			{children}
		</button>
	);
};
