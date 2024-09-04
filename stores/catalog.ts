import { defineStore } from "pinia";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    books: [] as Book[],
    searchQuery: "",
    viewMode: "grid",
    currentPage: 1,
    itemsPerPage: 5,
  }),
  getters: {
    filteredBooks: (state) => {
      return state.books.filter(
        (book) =>
          book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          book.description
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase())
      );
    },
    paginatedBooks: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.filteredBooks.slice(start, end);
    },
  },
  actions: {
    async fetchBooks() {
      try {
        const response = await axios.get("https://fakerapi.it/api/v2/books?");
        console.log("API Response:", response.data);
        this.books = response.data.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    setViewMode(mode: "grid" | "list") {
      this.viewMode = mode;
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
  },
});
