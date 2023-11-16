<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-dialog v-model="formActive" width="600">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="tonal" text="Add teams"> </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <AddTeamsForm @done-click="AddTeams"></AddTeamsForm>
                    </template>
                </v-dialog>
            </v-col>
        </v-row>
        <v-card color="five" class="pa-1 my-2">
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Team name" readonly variant="outlined" density="compact" hide-details="true"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Practices per week" readonly variant="outlined" density="compact" hide-details="true"></v-text-field>
                </v-col>
            </v-row>
            <v-row class="mt-0" v-if="teams.length  == 0">
                <v-col>No teams yet</v-col>
            </v-row>
        </v-card>
        <v-card v-if="teams.length > 0" color="five" class="pa-1 my-2">
            <v-row v-for="team in teams">
                <v-col cols="6">
                    <v-text-field v-model="team.title" variant="outlined" density="compact" hide-details="true"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field type="number" v-model="team.practicesPerWeek" variant="outlined" density="compact" hide-details="true"></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-btn color="error" variant="elevated" @click="() => DeleteTeam(team)">
                        <span>Delete</span>
                        <v-icon right icon="mdi-delete"></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        
    </v-container>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import AddTeamsForm from './AddTeamsForm.vue'

const { days, teams } = defineProps(['days', 'teams']);

const formActive = ref(false)


const AddTeams = (info) => {
    console.log(info)
    formActive.value = false;

    for (let i = 0; i < info.amountOfTeams; i++) {
        let team = { title: info.teamBaseName, practicesPerWeek: info.practicesPerWeek }
        teams.push(team)
    }

}

function DeleteTeam(team) {
    console.log(team)
    const index = teams.indexOf(team);
    if (index > -1) { // only splice array when item is found
        teams.splice(index, 1); // 2nd parameter means remove one item only
    }
}

function AddCourt(day) {
    day.timeslots.push({ starttime: "00:00", endtime: "00:00" })
}

</script>
