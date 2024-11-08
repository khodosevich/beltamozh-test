<script setup>
import { ref } from 'vue';

const isContentVisible = ref(false);
const toggleContentVisibility = () => {
    isContentVisible.value = !isContentVisible.value;
};
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__item">
            <div class="sidebar__header" @click="toggleContentVisibility"
                 :class="{ active: isContentVisible }">
                <div class="sidebar__title">
                    Профили
                </div>
                <img src="../assets/arrow.svg" width="10" height="6" alt=""/>
            </div>

            <div v-show="isContentVisible" class="sidebar__content">
                <div class="sidebar__profile">
                    <div class="sidebar__checkbox">
                        <img src="../assets/check-mark.svg" width="15" height="15" alt=""/>
                    </div>
                    <router-link class="sidebar__name active" to="">
                        Все
                    </router-link>
                </div>
                <div class="sidebar__profile">
                    <div class="sidebar__checkbox">
                        <img src="../assets/check-mark.svg" width="15" height="15" alt=""/>
                    </div>
                    <router-link class="sidebar__name" to="#">
                        Обработанные
                    </router-link>
                </div>
                <div class="sidebar__profile">
                    <div class="sidebar__checkbox">
                        <img src="../assets/exclamation-mark.svg" width="15" height="15" alt=""/>
                    </div>
                    <router-link class="sidebar__name" to="#">
                        Не обработанные
                    </router-link>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
@import "../styles/components/sidebar.scss";
</style>
