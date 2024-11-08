<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const burgerIsOpen = computed(() => store.getters.BURGER_STATE);

const updateBurgerState = () => {
    store.dispatch('TOGGLE_BURGER_STATE', !burgerIsOpen.value);
};
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

            <button class="header__search">
                <img src="../assets/loop.svg" width="15" height="15" alt=""/>
            </button>
        </div>
    </div>
</template>

<style>
@import "../styles/components/header.scss";
</style>
