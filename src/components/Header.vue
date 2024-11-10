<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { ProfileActionTypeEnum } from '@/store/index.js';

const store = useStore();
const burgerIsOpen = computed(() => store.getters.BURGER_STATE);

const popup = defineProps({
    openPopup: {
        type: Function,
        required: true
    }
})

const updateBurgerState = () => {
    store.dispatch('TOGGLE_BURGER_STATE_ACTION', !burgerIsOpen.value);
};

const searchHandler = () => {
    store.dispatch('UPDATE_PROFILE_ACTION_TYPE_ACTION', ProfileActionTypeEnum.SEARCH);
    popup.openPopup();
}
</script>

<template>
    <div class="header">
        <div class="header__content">
            <button class="header__burger" @click="updateBurgerState"
                    :class="{'active': burgerIsOpen}">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <button class="header__search" @click="searchHandler">
                <img src="../assets/loop.svg" width="15" height="15" alt=""/>
            </button>
        </div>
    </div>
</template>

<style>
@import "../styles/components/header.scss";
</style>
