const API_URL = import.meta.env.VITE_API_URL;

export interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  description?: string;
  productUrl?: string;
}

export interface ProductsResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const productService = {
  /**
   * Get all products for public display
   */
  getProducts: async (category?: string): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    params.append("limit", "50");
    if (category) {
      params.append("category", category);
    }

    const response = await fetch(
      `${API_URL}/api/products/public?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  /**
   * Get unique categories from products
   */
  getCategories: async (): Promise<{ label: string; count: number }[]> => {
    const response = await productService.getProducts();
    const categoryMap = new Map<string, number>();

    response.data.forEach((product) => {
      const cat = product.category || "Khác";
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    });

    return Array.from(categoryMap.entries()).map(([label, count]) => ({
      label,
      count,
    }));
  },
};
