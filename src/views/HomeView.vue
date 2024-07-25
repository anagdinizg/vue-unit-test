<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const username = computed(() => store.getters.getUsername);

</script>

<template>
  <div class="about">
    <h1 v-if="username">Bem vindo(a), {{ username }}!</h1>
    <h1 v-else>Bem vindo(a)!</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
