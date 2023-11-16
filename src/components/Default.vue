<template>
    <v-container fluid>

        <v-row justify="center">
            <v-col cols="6">
                <v-card color="four">
                    <v-btn variant="tonal" class="large-button" to="/start" @click="startClick">Get started</v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">

            <v-col cols="6">
                <v-card color="four">
                    <v-btn variant="tonal" class="large-button">Load existing project</v-btn>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>
// import router from '../../plugins/router'

// function startClick() {
//     router.push("/start")
// }
</script>

<style scoped>
.large-button {
    min-height: 30vh;
    width: 100%;
}
</style>