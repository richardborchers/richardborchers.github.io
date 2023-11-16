

<template>
  <v-card title="Add a training day" class="pa-1">
    <v-card-text>
      Please, fill in the required information
    </v-card-text>
    <v-select v-model="weekDay" label="Day of the week"
      :items="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']">
    </v-select>
    <v-text-field v-model="location" label="Location"></v-text-field>
    <v-text-field v-model="amountOfTimeslots" type="number" min="1" max="20" label="Amount of timeslots"></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text="Done" :disabled="!(weekDay && location && amountOfTimeslots)" color="success" variant="tonal" @click="DoneClick"></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const emit = defineEmits(['doneClick'])

function DoneClick() {
  var info = { weekday: weekDay.value, location: location.value, amountOfTimeslots: amountOfTimeslots.value }
  
  emit('doneClick', info)
}
const weekDay = ref()
const location = ref()
const amountOfTimeslots = ref()

const color = computed(() => {
  return weekDay.value ? 'success' : 'error'
})

</script>