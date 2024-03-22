"use client";

import React, { useOptimistic, useRef } from "react";
import { StyledInput } from "@/ui/atoms/StyledInput";

import { type ProductReviewFragment } from "@/graphql/generated/graphql";
import { createReviewAction } from "@/actions";
import { StyledButton } from "@/ui/atoms/StyledButton";
import { Heading } from "@/ui/atoms/Heading";

export const ProductReviews = ({
	productId,
	reviews,
}: {
	productId: string;
	reviews: ProductReviewFragment[];
}) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		reviews,
		(state: ProductReviewFragment[], newReview: ProductReviewFragment) => {
			return [...state, newReview];
		},
	);

	return (
		<section className="mb-16">
			<Heading asSubHeading>Reviews</Heading>
			<div className="mb-16">
				{optimisticReviews.map((review) => (
					<React.Fragment key={review.author + review.title + review.email}>
						<br />
						<div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
							<div className="p-5">
								<p className="text-lg font-semibold text-gray-900">{review.title}</p>
								<p className="mt-2 text-gray-700">
									<span className="font-semibold text-gray-900">Author:</span> {review.author}
								</p>
								<p className="mt-2 text-gray-600">
									<span className="font-semibold text-gray-900">Description:</span>{" "}
									{review.description}
								</p>
								<p className="mt-2 text-gray-600">
									<span className="font-semibold text-gray-900">Email:</span> {review.email}
								</p>
								<div className="mt-3">
									<span className="font-semibold text-gray-900">Rating:</span> {review.rating}
								</div>
							</div>
						</div>
					</React.Fragment>
				))}
			</div>
			<Heading asSubHeading>Leave a review!</Heading>
			<form
				data-testid="add-review-form"
				ref={formRef}
				className="mx-auto mt-8 max-w-md "
				action={async (formData: FormData) => {
					const title = (formData.get("headline") as string) || "";
					const author = (formData.get("name") as string) || "";
					const description = (formData.get("content") as string) || "";
					const email = (formData.get("email") as string) || "";
					const rating = Number(formData.get("rating") || "");

					setOptimisticReviews({ author, description, email, rating, title });
					formRef?.current?.reset();
					await createReviewAction({ author, description, email, rating, title, productId });
				}}
			>
				<StyledInput required name="headline" placeholder="Headline" />
				<StyledInput required className="mt-4" name="content" placeholder="Content" />
				<StyledInput
					required
					type="number"
					max={5}
					className="mt-4"
					name="rating"
					placeholder="Rating"
				/>
				<StyledInput required className="mt-4" name="name" placeholder="Name" />
				<StyledInput required type="email" className="mt-4" name="email" placeholder="Email" />
				<div className="text-center">
					<StyledButton type="submit">Add a review</StyledButton>
				</div>
			</form>
		</section>
	);
};
