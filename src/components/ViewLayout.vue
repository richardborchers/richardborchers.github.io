<template>
    <v-container class="py-2 px-0 mx-1 my-2">
        <v-row class="mt-0" v-if="days.length == 0">
            <v-col>Layout empty, create the schedule in "Edit Layout"</v-col>
        </v-row>
        <v-row>
            <v-col v-for="day in days" cols="12" md="6">
                <v-card :title="day.title" color="five" class="pa-1">
                    <v-container>
                        <v-row v-for="timeslot in day.timeslots">
                            <v-col cols="4"><v-text-field readonly
                                    :value="timeslot.starttime + '-' + timeslot.endtime"></v-text-field></v-col>
                            <v-col cols="8">
                                <!-- INSERT A NEW GRID IN THAT CREATES timeslot.courts AMOUNT OF EVENLY SPACED COLUMNS -->
                                <v-row class="fill-row">
                                    <v-col
                                        v-for="courtIndex in Array.from({ length: timeslot.courts }, (_, index) => index + 1)"
                                        :key="courtIndex" class="fill-column">
                                        <!-- Your content for each court goes here -->
                                        <v-text-field readonly outlined :label="'Court ' + courtIndex"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" class="mr-4" variant="tonal" @click="DoneClick">
                <span>Done</span>
                <v-icon right icon="mdi-check"></v-icon>
            </v-btn>
        </v-card-actions> -->
    </v-container>
</template>

<style scoped>
.fill-row {
    display: flex;
    flex-wrap: wrap;
}

.fill-column {
    flex-grow: 1;
    flex-basis: 0;
}
</style>

<script setup>
import { ref, defineProps } from 'vue';

const { days, teams } = defineProps(['days', 'teams']);

</script>