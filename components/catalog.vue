<template>
  <div class="catalog-container">
    <header class="header">
      <input
        v-model="searchQuery"
        placeholder="Поиск..."
        class="search-input"
      />
      <div class="view-mode">
        <button
          @click="setViewMode('grid')"
          :class="{ active: viewMode === 'grid' }"
        >
          Сетка
        </button>
        <button
          @click="setViewMode('list')"
          :class="{ active: viewMode === 'list' }"
        >
          Список
        </button>
      </div>
    </header>
    <div v-if="paginatedBooks.length" :class="viewMode">
      <div
        v-for="book in paginatedBooks"
        :key="book.id"
        class="book-item"
        @click="showDetails(book)"
      >
        <h2>{{ book.title }}</h2>
        <p>{{ book.author }}</p>
      </div>
    </div>
    <div v-else class="">
      <p>Ничего не найдено</p>
    </div>
    <Teleport to="body">
      <BookDetailsModal
        :book="selectedBook"
        :visible="modalVisible"
        @close="closeModal"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useCatalogStore } from "~/stores/catalog";

const catalogStore = useCatalogStore();

const searchQuery = ref(catalogStore.searchQuery);
const viewMode = computed(() => catalogStore.viewMode);
const paginatedBooks = computed(() => catalogStore.paginatedBooks);

const selectedBook = ref(null);
const modalVisible = ref(false);

const showDetails = (book) => {
  selectedBook.value = book;
  modalVisible.value = true;
};

watch(searchQuery, (newQuery) => {
  catalogStore.setSearchQuery(newQuery);
});

const setViewMode = (mode: "grid" | "list") => {
  catalogStore.setViewMode(mode);
};

const closeModal = () => {
  modalVisible.value = !modalVisible.value;
};

onMounted(async () => {
  await catalogStore.fetchBooks();
});
</script>

<style scoped lang="scss">
.catalog-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media(max-width: 576px){
    flex-direction: column;
  }
}

.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.view-mode {
  button {
    margin-left: 10px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }
    &.active {
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.list {
  display: flex;
  flex-direction: column;
}

.book-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #555;
  }
}

.pagination {
  margin-top: 20px;
}
</style>
