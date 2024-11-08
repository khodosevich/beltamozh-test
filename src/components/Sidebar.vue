<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ProfileEnum } from '@/store/index.js';

const isContentVisible = ref(false);
const toggleContentVisibility = () => {
    isContentVisible.value = !isContentVisible.value;
};

const store = useStore();
const burgerIsOpen = computed(() => store.getters.BURGER_STATE);
const currentProfile = computed(() => store.getters.CURRENT_PROFILE);

const setProfile = (profile) => {
    store.dispatch('SET_CURRENT_PROFILE', profile);
}
</script>

<template>
    <aside class="sidebar" :class="{'active': burgerIsOpen}">
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
                    <router-link class="sidebar__name"
                                 :class="{ active: currentProfile === ProfileEnum.ALL }"
                                 @click="setProfile(ProfileEnum.ALL)"
                                 to="#">
                        Все
                    </router-link>
                </div>
                <div class="sidebar__profile">
                    <div class="sidebar__checkbox">
                        <img src="../assets/check-mark.svg" width="15" height="15" alt=""/>
                    </div>
                    <router-link class="sidebar__name"
                                 :class="{ active: currentProfile === ProfileEnum.PROCESSED }"
                                 @click="setProfile(ProfileEnum.PROCESSED)"
                                 to="#">
                        Обработанные
                    </router-link>
                </div>
                <div class="sidebar__profile">
                    <div class="sidebar__checkbox">
                        <img src="../assets/exclamation-mark.svg" width="15" height="15" alt=""/>
                    </div>
                    <router-link class="sidebar__name"
                                 :class="{ active: currentProfile === ProfileEnum.UNPROCESSED }"
                                 @click="setProfile(ProfileEnum.UNPROCESSED)"
                                 to="#">
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
