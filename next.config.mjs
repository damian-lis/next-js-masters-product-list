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
});
