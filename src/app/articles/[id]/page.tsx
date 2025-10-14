"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Container,
  Breadcrumbs,
  Link,
  IconButton,
  Tooltip,
  LinearProgress,
  Skeleton,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  Share,
  Print,
  BookmarkBorder,
  Bookmark,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  AccessTime,
  Person,
  CalendarToday,
} from "@mui/icons-material";
import { apiService, Article } from "../../../services/api";

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

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const articleId = params?.id as string;

  // Reading progress tracking
  useEffect(() => {
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

  // Social sharing functions
  const shareToSocial = (platform: string) => {
    if (!article) return;

    const url = window.location.href;
    const title = article.title;
    const text =
      article.description?.replace(/<[^>]*>/g, "").substring(0, 200) || "";

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${url}`
        )}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you could save to localStorage or send to API
  };

  useEffect(() => {
    setMounted(true);
    if (articleId) {
      const fetchArticle = async () => {
        try {
          setLoading(true);
          const data = await apiService.getArticle(articleId);
          setArticle(data);
          setError(null);
        } catch (err) {
          setError("Failed to fetch article. Please try again later.");
          console.error("Error fetching article:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [articleId]);

  // Skeleton loading component
  const SkeletonLoader = () => (
    <Box
      sx={{
        paddingTop: { xs: "90px", md: "120px" },
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <Container maxWidth="md">
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ mb: 3 }}
        />
        <Card
          sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}
        >
          <Skeleton variant="rectangular" height={400} />
          <CardContent sx={{ padding: "32px" }}>
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={40} width="60%" sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" height={20} width={100} />
            </Box>
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="80%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="60%" />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );

  if (!mounted || loading) {
    return <SkeletonLoader />;
  }

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
                <CardMedia
                  component="img"
                  height="500"
                  image={article.filePath}
                  alt={article.title}
                  sx={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
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
                      variant="h2"
                      sx={{
                        fontWeight: "800",
                        fontSize: { xs: "32px", md: "42px", lg: "48px" },
                        lineHeight: 1.1,
                        color: "#1a1a1a",
                        flex: 1,
                        minWidth: "300px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Chip
                      label={article.status}
                      size="medium"
                      sx={{
                        backgroundColor:
                          article.status === "published"
                            ? "#4caf50"
                            : "#ff9800",
                        color: "white",
                        fontSize: "12px",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        height: "32px",
                      }}
                    />
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
                    STATUS
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
