<template>
    <v-container class="py-2 px-0 mx-1 my-2">
        <v-row>
            <v-col cols="2">
                <v-card style="height: 500px;" color="two">
                    <draggable v-model="teams" group="people" @start="drag = true" @end="drag = false" item-key="id">
                        <template #item="{ element }">
                            <div>{{ element.title }}</div>
                        </template>
                    </draggable>
                </v-card>
            </v-col>
            <v-col v-for="day in days" cols="10" md="6">
                <v-card :title="day.title" color="five" class="pa-1">
                    <v-container>
                        <v-row v-for="timeslot in day.timeslots">
                            <v-col cols="3"><v-text-field readonly
                                    :value="timeslot.starttime + '-' + timeslot.endtime"></v-text-field></v-col>
                            <v-col cols="9">
                                <v-row class="fill-row">
                                    <v-col v-for="court in timeslot.courtsArray" :key="court" class="fill-column">
                                        <draggable v-model="timeslot.courtsArray" group="people" @start="drag = true"
                                            @end="drag = false" item-key="id">
                                            <template #item="{ element }">
                                                <div>{{ element.title }}</div>
                                            </template>
                                        </draggable>
                                        <!-- CONTAINER FROM WHICH I CAN DRAG AND DROP CARDS -->
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable'

const days = ref([])
const teams = ref([])
const filledTeams = ref([])

onMounted(() => {
    let currentLayout = JSON.parse(localStorage.getItem('currentLayout'))
    days.value = currentLayout.days
    teams.value = currentLayout.teams
    for (let day = 0; day < days.value.length; day++) {
        for (let timeslot = 0; timeslot < days.value[day].timeslots.length; timeslot++) {
            let courts = days.value[day].timeslots[timeslot].courts
            days.value[day].timeslots[timeslot].courtsArray = Array.from({ length: courts }, (_, i) => ({ title: "Empty " + i.toString(), practicesPerWeek: 1 }));

        }
    }
    console.log(days.value, teams.value)
})

</script>