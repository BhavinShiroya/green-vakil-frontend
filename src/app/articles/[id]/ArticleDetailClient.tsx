"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Alert,
  Card,
  CardContent,
  Button,
  Container,
  Breadcrumbs,
  Link,
  LinearProgress,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";
import { ArrowBack, AccessTime, CalendarToday } from "@mui/icons-material";
import { Article } from "../../../services/api";
import Image from "next/image";

interface ArticleDetailClientProps {
  article: Article | null;
  error: string | null;
}

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to calculate reading time
const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper function to format date for display
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ArticleDetailClient({
  article,
  error,
}: ArticleDetailClientProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reading progress tracking
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const scrollTop = window.scrollY;
      const docHeight = element.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);

      setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (error) {
    return (
      <Box
        sx={{
          paddingTop: { xs: "90px", md: "120px" },
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

  if (!article) {
    return (
      <Box
        sx={{
          paddingTop: { xs: "90px", md: "120px" },
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Alert severity="warning" sx={{ maxWidth: 500 }}>
          Article not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingTop: { xs: "90px", md: "120px" },
        minHeight: "100vh",
        padding: "40px 20px",
        position: "relative",
      }}
    >
      {/* Reading Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={readingProgress}
        sx={{
          position: "fixed",
          top: { xs: "70px", md: "100px" },
          left: 0,
          right: 0,
          height: "4px",
          zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#1976d2",
          },
        }}
      />

      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: "24px", fontSize: "14px" }}
        >
          <Link
            color="inherit"
            href="/"
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Home
          </Link>
          <Link
            color="inherit"
            href="/articles"
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Articles
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "14px" }}>
            {article.title.length > 50
              ? `${article.title.substring(0, 50)}...`
              : article.title}
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {/* Main Content */}
          <Box sx={{ flex: 1, maxWidth: { lg: "800px" } }}>
            {/* Back Button */}
            <Button
              startIcon={<ArrowBack />}
              onClick={() => router.back()}
              sx={{
                marginBottom: "24px",
                color: "#666",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              Back to Articles
            </Button>

            {/* Article Card */}
            <Card
              ref={contentRef}
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              {article.filePath && (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                    transition: "transform 0.3s ease",
                    "&:hover img": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Image
                    src={article.filePath}
                    alt={`${article.title}${
                      article.subtitle ? ` - ${article.subtitle}` : ""
                    }`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    quality={90}
                    priority
                  />
                </Box>
              )}

              <CardContent sx={{ padding: "40px" }}>
                {/* Article Header */}
                <Box sx={{ marginBottom: "32px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "24px",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "32px" },
                        lineHeight: 1.4,
                        color: "#1a1a1a",
                        flex: 1,
                        minWidth: "300px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {article.title}
                    </Typography>
                  </Box>

                  {/* Author and Meta Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      marginBottom: "24px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#1976d2",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {article.author.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#333",
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "2px",
                          }}
                        >
                          {article.author.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            fontSize: "14px",
                          }}
                        >
                          {article.author.role}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ fontSize: "16px", color: "#666" }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        {mounted ? formatDate(article.createdAt) : "Loading..."}
                      </Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ fontSize: "16px", color: "#666" }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        {article.description
                          ? calculateReadingTime(article.description)
                          : "1 min read"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Article Content */}
                {article.description && (
                  <Box
                    sx={{
                      "& p": {
                        marginBottom: "24px",
                        lineHeight: 1.8,
                        fontSize: "18px",
                        color: "#2c2c2c",
                        textAlign: "justify",
                      },
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        marginTop: "32px",
                        marginBottom: "16px",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        lineHeight: 1.3,
                      },
                      "& h1": { fontSize: "32px" },
                      "& h2": { fontSize: "28px" },
                      "& h3": { fontSize: "24px" },
                      "& h4": { fontSize: "20px" },
                      "& ul, & ol": {
                        marginBottom: "24px",
                        paddingLeft: "32px",
                      },
                      "& li": {
                        marginBottom: "12px",
                        lineHeight: 1.7,
                        fontSize: "18px",
                        color: "#2c2c2c",
                      },
                      "& blockquote": {
                        borderLeft: "4px solid #1976d2",
                        paddingLeft: "24px",
                        margin: "24px 0",
                        fontStyle: "italic",
                        color: "#555",
                        backgroundColor: "#f8f9fa",
                        padding: "16px 24px",
                        borderRadius: "0 8px 8px 0",
                      },
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        margin: "24px 0",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      },
                      "& a": {
                        color: "#1976d2",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: article.description
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">"),
                    }}
                  />
                )}

                {/* Article Footer */}
                <Box
                  sx={{
                    marginTop: "48px",
                    paddingTop: "24px",
                    borderTop: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "14px", marginBottom: "4px" }}
                    >
                      Published on{" "}
                      {mounted ? formatDate(article.createdAt) : "Loading..."}
                    </Typography>
                    {article.updatedAt !== article.createdAt && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "12px" }}
                      >
                        Last updated:{" "}
                        {mounted ? formatDate(article.updatedAt) : "Loading..."}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "12px" }}
                    >
                      Reading progress: {readingProgress}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Sidebar */}
          <Box sx={{ width: { lg: "300px" }, flexShrink: 0 }}>
            <Paper
              sx={{
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: "sticky",
                top: { xs: "90px", md: "220px" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginBottom: "16px", fontWeight: "600" }}
              >
                Article Info
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    AUTHOR
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    {article.author.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    READING TIME
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    {article.description
                      ? calculateReadingTime(article.description)
                      : "1 min read"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    PUBLISHED
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    {mounted ? formatDateTime(article.createdAt) : "Loading..."}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
