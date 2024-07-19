<template>
  <div>
    <a href="https://www.electronjs.org/" target="_blank">
      <img src="./assets/electron.svg" class="logo electron" alt="Electron logo" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <h1>Electron + Vite + Vue</h1>

  <p>Enter your name</p>

  <div class="greet-form">
    <input v-model="name" id="text" />
    <button @click="greet">Greet</button>
  </div>
    
  <p>{{ greeting }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const greeting = ref('');

const greet = async () => {
  greeting.value = await window.ipcInvoke('greet', name.value);
}
</script>

<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.greet-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
