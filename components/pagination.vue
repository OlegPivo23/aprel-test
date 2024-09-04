<template>
  <div v-if="paginatedBooks.length" class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Предыдущая</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Следующая
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCatalogStore } from "#imports";
const catalogStore = useCatalogStore();
const props = defineProps<{
  total: number;
  perPage: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const currentPage = ref(1);
const paginatedBooks = computed(() => catalogStore.paginatedBooks);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("pageChange", currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit("pageChange", currentPage.value);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
