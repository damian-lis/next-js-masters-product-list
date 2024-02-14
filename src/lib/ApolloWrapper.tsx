"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
	ApolloNextAppProvider,
	NextSSRApolloClient,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { API_URL } from "../../constants";

const makeClient = () => {
	const httpLink = new HttpLink({
		uri: API_URL,
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
					])
				: httpLink,
	});
};

export const ApolloWrapper = ({ children }: React.PropsWithChildren) => (
	<ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
);
