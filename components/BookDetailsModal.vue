<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <h2>{{ book?.title }}</h2>
        <p><strong>Автор:</strong> {{ book?.author }}</p>
        <p><strong>Описание:</strong> {{ book?.description }}</p>
        <button @click="close">Закрыть</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
  } | null;
  visible: boolean;
}>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
