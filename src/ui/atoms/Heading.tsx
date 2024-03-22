import clsx from "clsx";
import React from "react";

export const Heading = ({
	children,
	asSubHeading,
}: {
	children: React.ReactNode;
	asSubHeading?: boolean;
}) => {
	const commonClassName = "mb-4 mt-4 text-center font-bold";

	if (asSubHeading) return <h2 className={clsx(commonClassName, "text-l")}>{children}</h2>;

	return <h1 className={clsx(commonClassName, "text-xl")}>{children}</h1>;
};
