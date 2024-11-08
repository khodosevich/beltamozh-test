<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Table from '@/components/Table.vue';

</script>

<template>
    <v-app class="wrapper">
        <Header/>
        <div class="page">
            <div class="page__content">
                <Sidebar/>
                <Table/>
            </div>
        </div>
    </v-app>
</template>

<style>
@import "styles/config/base.scss";
@import "styles/config/root.scss";

</style>
