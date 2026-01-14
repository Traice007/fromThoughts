import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://foundervision.io";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/results/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
