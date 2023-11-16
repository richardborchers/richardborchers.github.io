<template>
  <v-app>
    <v-main style="background-color: #433633">
      <Navigation></Navigation>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script setup>
import Navigation from './components/Navigation.vue';
</script>

<style>
body {
  background-color:#433633;
}
</style>
