import clsx from "clsx";

export const StyledInput = ({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			{...props}
			className={clsx(
				"w-full rounded-md border border-gray-300 p-2 transition-colors focus:border-blue-500 focus:outline-none",
				className,
			)}
		/>
	);
};
