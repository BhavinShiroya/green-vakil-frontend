"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Alert, Card, CardContent, Chip } from "@mui/material";
import { Article } from "../../services/api";
import Image from "next/image";

interface ArticlesClientProps {
  articles: Article[];
  error: string | null;
}

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function ArticlesClient({
  articles,
  error,
}: ArticlesClientProps) {
  const router = useRouter();

  const handleArticleClick = (article: Article) => {
    const slug = article.slug || article.id;
    router.push(`/articles/${slug}`);
  };

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
              onClick={() => handleArticleClick(article)}
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
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Image
                    src={article.filePath}
                    alt={`${article.title}${
                      article.subtitle ? ` - ${article.subtitle}` : ""
                    }`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                    }}
                    quality={85}
                    loading="lazy"
                  />
                </Box>
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
                </Box>

                {article.subtitle && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      marginBottom: "16px",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {article.subtitle}
                  </Typography>
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
                    By {article.authorName}
                  </Typography>
                  <Chip
                    label={formatDate(article.createdAt)}
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
