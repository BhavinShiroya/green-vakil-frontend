import { apiService, Article } from "../../services/api";
import ArticlesClient from "./ArticlesClient";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function ArticlesPage() {
  // Server-side data fetching for SSG
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    articles = await apiService.getPublishedArticles();
  } catch (err) {
    console.error("Error fetching articles:", err);
    error = "Failed to fetch articles. Please try again later.";
  }

  // Pass data to client component for interactivity
  return <ArticlesClient articles={articles} error={error} />;
}
