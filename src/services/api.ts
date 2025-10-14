// API service for making HTTP requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fronterainfotech.com/v1';

export interface Author {
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  status: string;
  filePath?: string;
  slug?: string;
}

export interface ArticlesResponse {
  results: Article[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export const apiService = {
  async getPublishedArticles(): Promise<Article[]> {
    try {
      let allArticles: Article[] = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const response = await fetch(`${API_BASE_URL}/articles/published?sortBy=createdAt:desc&page=${currentPage}&limit=100`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ArticlesResponse = await response.json();
        
        if (data.results && data.results.length > 0) {
          allArticles = [...allArticles, ...data.results];
        }
        
        totalPages = data.totalPages || 1;
        currentPage++;
      } while (currentPage <= totalPages);

      return allArticles;
    } catch (error) {
      console.error('Error fetching published articles:', error);
      throw error;
    }
  },

  // Get single article by ID
  async getArticle(id: string): Promise<Article> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Article = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  // Get published article by slug
  async getPublishedArticleBySlug(slug: string): Promise<Article> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/published/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Article = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching published article by slug:', error);
      throw error;
    }
  },
};
