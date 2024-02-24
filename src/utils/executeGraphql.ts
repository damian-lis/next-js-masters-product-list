import { type TypedDocumentString } from "@/graphql/generated/graphql";

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables?: TVariables,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) throw TypeError("GRAPHQL_URL is not defined");

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphQLResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphQLResponse.errors) {
		throw TypeError(`GraphQL Error`, { cause: graphQLResponse.errors[0]?.message });
	}

	return graphQLResponse.data;
};
