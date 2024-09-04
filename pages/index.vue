<template>
  <div class="catalog-container">
    <Catalog />
    <Pagination
      :total="filteredBooks.length"
      :perPage="itemsPerPage"
      @pageChange="setCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCatalogStore } from "~/stores/catalog";

const catalogStore = useCatalogStore();
const filteredBooks = computed(() => catalogStore.filteredBooks);
const itemsPerPage = computed(() => catalogStore.itemsPerPage);
const setCurrentPage = (page: number) => {
  catalogStore.setCurrentPage(page);
};
</script>

<style lang="scss" scoped>
.catalog-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
}
</style>
