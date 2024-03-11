"use client";

import React from "react";

const ProductsPageError = ({ error }: { error: Error; reset: () => void }) => {
	return <div>Error: {error.message} </div>;
};

export default ProductsPageError;
