<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ProfileEnum } from '@/store/modules/UserModule.store.js';

import checkMark from '../assets/check-mark.svg';
import exclamationMark from '../assets/exclamation-mark.svg';

const isContentVisible = ref(false);
const toggleContentVisibility = () => {
    isContentVisible.value = !isContentVisible.value;
};

const store = useStore();
const burgerIsOpen = computed(() => store.getters['BurgerModule/BURGER_STATE']);
const currentProfile = computed(() => store.getters['UserModule/CURRENT_PROFILE']);

const setProfile = (profile) => {
    store.dispatch('UserModule/SET_CURRENT_PROFILE_ACTION', profile);
};
const sidebarItems = [
    {
        name: 'Профили',
        subitems: [
            {
                name: 'Все',
                id: ProfileEnum.ALL,
                imgSrc: checkMark,
            },
            {
                name: 'Обработанные',
                id: ProfileEnum.PROCESSED,
                imgSrc: checkMark,
            },
            {
                name: 'Необработанные',
                id: ProfileEnum.UNPROCESSED,
                imgSrc: exclamationMark,
            },
        ],
    },
];
</script>

<template>
    <aside class="sidebar" :class="{'active': burgerIsOpen}">
        <div class="sidebar__item" v-for="item in sidebarItems" :key="item.name">
            <div class="sidebar__header" @click="toggleContentVisibility" :class="{ active: isContentVisible }">
                <div class="sidebar__title">
                    {{ item.name }}
                </div>
                <img src="../assets/arrow.svg" width="10" height="6" alt=""/>
            </div>

            <div class="sidebar__content" v-show="isContentVisible">
                <div class="sidebar__profile" v-for="subitem in item.subitems" :key="subitem.name"
                     @click="setProfile(subitem.id)">
                    <div class="sidebar__checkbox">
                        <img :src="subitem.imgSrc" width="15" height="15" alt=""/>
                    </div>
                    <router-link class="sidebar__name"
                                 :class="{ active: currentProfile === subitem.id }"
                                 @click="setProfile(subitem.id)"
                                 to="#"
                    >
                        {{ subitem.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
@import "../styles/components/sidebar.scss";
</style>