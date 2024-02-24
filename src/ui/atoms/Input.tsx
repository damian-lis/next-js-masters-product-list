export const StyledInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			{...props}
			className="w-full rounded-md border border-gray-300 p-2 transition-colors focus:border-blue-500 focus:outline-none"
		/>
	);
};
