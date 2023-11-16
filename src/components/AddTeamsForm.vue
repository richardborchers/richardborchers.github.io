

<template>
    <v-card title="Add teams" class="pa-1">
      <v-card-text>
        Please, fill in the required information
      </v-card-text>
      <v-text-field v-model="teamBaseName" label="Team base name"></v-text-field>
      <v-text-field v-model="practicesPerWeek" type="number" min="1" max="20" label="Practices/week"></v-text-field>
      <v-text-field v-model="amountOfTeams" type="number" min="1" max="20" label="Amount of teams"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
  
        <v-btn text="Done" :disabled="!(teamBaseName && practicesPerWeek && amountOfTeams)" color="success" variant="tonal" @click="DoneClick"></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  <script setup>
  import { computed } from '@vue/reactivity';
  import { ref } from 'vue';
  
  const emit = defineEmits(['doneClick'])
  
  function DoneClick() {
    var info = { teamBaseName: teamBaseName.value, practicesPerWeek: practicesPerWeek.value, amountOfTeams: amountOfTeams.value }
    
    emit('doneClick', info)
  }
  const teamBaseName = ref()
  const amountOfTeams = ref()
  const practicesPerWeek = ref()
  
  const color = computed(() => {
    return weekDay.value ? 'success' : 'error'
  })
  
  </script>