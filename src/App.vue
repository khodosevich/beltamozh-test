<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Table from '@/components/Table.vue';
import Popup from '@/components/Popup.vue';

import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const isPopupVisible = ref(false);
function openPopup() {
    isPopupVisible.value = true;
}

function closePopup() {
    isPopupVisible.value = false;
}

const store = useStore();
const isLoading = computed(() => store.getters.IS_FETCH_REQUEST)
</script>

<template>
    <div v-if="isLoading" class="loader">Выполняется запрос...</div>

    <v-app class="wrapper">
        <Header/>
        <div class="page">
            <div class="page__content">
                <Sidebar/>
                <Table :openPopup="openPopup"/>
            </div>
            <Popup :isPopupVisible :closePopup="closePopup"/>
        </div>
    </v-app>
</template>

<style>
@import "styles/config/base.scss";
@import "styles/config/root.scss";

.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--beltamozh-color-white);
    font-size: 20px;
    z-index: 10000;
}
</style>
