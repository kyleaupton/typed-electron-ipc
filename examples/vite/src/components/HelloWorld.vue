<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ msg: string }>()

const name = ref('')
let greeting = ref('')

const greet = async () => {
  greeting.value = await window.api.greet(name.value);
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>Enter your name</p>

  <div style="display: flex; justify-content: center; gap: 12px;">
    <input v-model="name" id="text" />
    <button @click="greet">Greet</button>
  </div>

  <p v-if="greeting">{{ greeting }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
