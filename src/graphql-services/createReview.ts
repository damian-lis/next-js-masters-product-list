import {
	ReviewCreateDocument,
	type ReviewCreateMutationVariables,
} from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const createReview = async ({
	author,
	description,
	email,
	productId,
	rating,
	title,
}: ReviewCreateMutationVariables) => {
	const review = await executeGraphql({
		query: ReviewCreateDocument,
		variables: {
			author,
			description,
			email,
			productId,
			rating,
			title,
		},
		cache: "no-store",
	});

	return review;
};
