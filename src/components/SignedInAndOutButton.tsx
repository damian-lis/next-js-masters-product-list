import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const SignedInAndOutButton = () => {
	return (
		<div className="ml-4 min-w-fit  text-blue-500 transition-colors hover:text-blue-300">
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton />
			</SignedOut>
		</div>
	);
};
