<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-dialog v-model="formActive" width="600">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="tonal" text="Add a training day"> </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <AddDayForm @done-click="AddDay"></AddDayForm>
                    </template>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="day in days" cols="6">

                <v-card :title="day.title" color="five" class="pa-1">
                    <v-container>
                        <v-card title="Fill in the timeslot information">
                            <v-row v-for="timeslot in day.timeslots">
                                <v-col cols="4">
                                    <v-text-field v-model="timeslot.starttime" label="Start time"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="timeslot.endtime" label="End time"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="timeslot.courts" type="number" label="Courts"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="pa-2">
                                <v-spacer></v-spacer>
                                <v-col cols="auto">
                                    <v-btn color="error" variant="tonal" @click="() => DeleteDay(day)">
                                        <span>Delete</span>
                                        <v-icon right icon="mdi-delete"></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import AddDayForm from './AddDayForm.vue'

const { days, teams } = defineProps(['days', 'teams']);


const defaultText = "Helloooo"

const formActive = ref(false)


const AddDay = (info) => {
    formActive.value = false;
    let day = { title: info.weekday + ', ' + info.location, timeslots: [] }
    for (let i = 0; i < info.amountOfTimeslots; i++) {
        day.timeslots.push({ starttime: "00:00", endtime: "00:00", courts: 0 })
    }

    days.push(day)
    console.log(days)
}

function DeleteDay(day) {
    console.log(day)
    const index = days.indexOf(day);
    if (index > -1) { // only splice array when item is found
        days.splice(index, 1); // 2nd parameter means remove one item only
    }
}

function AddCourt(day) {
    day.timeslots.push({ starttime: "00:00", endtime: "00:00" })
}

</script>