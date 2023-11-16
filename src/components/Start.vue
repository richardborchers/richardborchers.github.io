<template>
    <v-card class="mt-5" color="two">
        <v-tabs v-model="tab" bg-color="one" color="four" grow>
            <v-tab v-for="item in tabContent" :key="item.title" :value="item.title">
                {{ item.title }}
            </v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item v-for="item in tabContent" :key="item.title" :value="item.title">
                <v-card color="one" flat>
                    <component :is="item.comp" :days="days" :teams="teams"></component>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import EditLayout from '../components/EditLayout.vue'
import ViewLayout from '../components/ViewLayout.vue'
import Teams from '../components/Teams.vue'

const days = ref([])
const teams = ref([])

const tab = ref('')
const tabContent = shallowRef([
    { title: "Edit Layout", comp: EditLayout },
    { title: "View Layout", comp: ViewLayout },
    { title: "Teams", comp: Teams }
])

</script>