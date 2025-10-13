"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { apiService, Article } from "../../services/api";

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleArticleClick = (articleId: string) => {
    router.push(`/articles/${articleId}`);
  };

  useEffect(() => {
    setMounted(true);
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await apiService.getArticles();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (!mounted || loading) {
    return (
      <Box
        sx={{
          paddingTop: "120px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          paddingTop: "120px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingTop: "120px",
        minHeight: "100vh",
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "28px", md: "36px" },
          fontWeight: "700",
          color: "#333",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Articles
      </Typography>

      {articles.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No articles found
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {articles.map((article) => (
            <Card
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              {article.filePath && (
                <CardMedia
                  component="img"
                  height="200"
                  image={article.filePath}
                  alt={article.title}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, padding: "24px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginBottom: "12px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      lineHeight: 1.4,
                      color: "#333",
                      flex: 1,
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Chip
                    label={article.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        article.status === "published" ? "#4caf50" : "#ff9800",
                      color: "white",
                      fontSize: "10px",
                      textTransform: "capitalize",
                    }}
                  />
                </Box>

                {article.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      marginBottom: "16px",
                      lineHeight: 1.6,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: article.description
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">"),
                    }}
                  />
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    By {article.author.name}
                  </Typography>
                  <Chip
                    label={
                      mounted ? formatDate(article.createdAt) : "Loading..."
                    }
                    size="small"
                    sx={{
                      backgroundColor: "#f0f0f0",
                      color: "#666",
                      fontSize: "11px",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
