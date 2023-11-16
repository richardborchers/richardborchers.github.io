<template>
    <nav>
        <v-app-bar color="one">
            <v-btn icon="mdi-menu" @click="menuClick"></v-btn>
            <v-app-bar-title>Let's create your schedule</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn flat color="grey" to="/">
                <span>Log in</span>
                <v-icon right icon="mdi-login"></v-icon>
            </v-btn>
            <v-btn flat color="grey" to="/">
                <span>Log out</span>
                <v-icon right icon="mdi-logout"></v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left" color="one">
            <v-list density="compact" nav>
                <v-list-item v-for="item in items" :prepend-icon="item.icon" :title="item.text"
                    :value="item.text"></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false)

function menuClick() {
    drawer.value = !drawer.value
}

const items = ref([
    { text: "Start", icon: "mdi-play" },
    { text: "Load", icon: "mdi-download" },
    { text: "About", icon: "mdi-forum" }
])

</script>