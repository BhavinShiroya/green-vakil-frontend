import { apiService, Article } from "../../../services/api";
import ArticleDetailClient from "./ArticleDetailClient";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for all articles at build time
export async function generateStaticParams() {
  try {
    const articles = await apiService.getPublishedArticles();

    // Generate paths for all articles using slug or id
    return articles.map((article) => ({
      id: article.slug || article.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return empty array on error - pages will be generated on demand
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const article = await apiService.getPublishedArticleBySlug(params.id);

    return {
      title: article.title,
      description:
        article.subtitle ||
        article.description.replace(/<[^>]*>/g, "").substring(0, 160),
      openGraph: {
        title: article.title,
        description:
          article.subtitle ||
          article.description.replace(/<[^>]*>/g, "").substring(0, 160),
        images: article.filePath ? [article.filePath] : [],
      },
    };
  } catch (error) {
    console.log(" error:", error);
    return {
      title: "Article Not Found",
    };
  }
}

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { id } = await params;

  // Server-side data fetching for SSG
  let article: Article | null = null;
  let error: string | null = null;

  try {
    article = await apiService.getPublishedArticleBySlug(id);
  } catch (err) {
    console.error("Error fetching article:", err);
    error = "Failed to fetch article. Please try again later.";
  }

  // Return 404 if article not found
  if (!article && !error) {
    notFound();
  }

  // Pass data to client component for interactivity
  return <ArticleDetailClient article={article} error={error} />;
}
