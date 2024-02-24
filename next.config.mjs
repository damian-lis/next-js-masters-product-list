/** @type {import('next').NextConfig} */

import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = nextMDX({
	options: {
		remarkPlugins: [remarkGfm],
	},
});

export default withMDX({
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		mdxRs: true,
		typedRoutes: true,
	},
	images: {
		domains: ["static-ourstore.hyperfunctor.com"],
	},
	redirects: async () => {
		return [
			{
				source: "/categories/:path((?!.*\\/).*)",
				destination: "/categories/t-shirts/1",
				permanent: false,
			},
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories",
				destination: "/categories/t-shirts/1",
				permanent: false,
			},
			{
				source: "/collections",
				destination: "/collections/summer-vibes",
				permanent: false,
			},
		];
	},
});
