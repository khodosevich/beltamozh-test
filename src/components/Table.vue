<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ProfileEnum } from '@/store/index.js';

defineProps({
    openPopup: {
        type: Function,
        required: true
    }
});

const store = useStore();
const users = computed(() => store.getters.FILTERED_USERS);
const currentProfile = computed(() => store.getters.CURRENT_PROFILE);

onMounted(() => {
    fetchData();
});

const fetchData = async () => {
    await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', true);
    await store.dispatch('SET_USERS_ACTION');
    await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', false);
};

const profileTitle = computed(() => {
    switch (currentProfile.value) {
        case ProfileEnum.ALL:
            return 'Все';
        case ProfileEnum.PROCESSED:
            return 'Обработанные';
        case ProfileEnum.UNPROCESSED:
            return 'Не обработанные';
    }
});

const headers = [
    { text: 'Статус', align: 'left', value: 'status' },
    { text: 'Имя', align: 'left', value: 'firstName' },
    { text: 'Фамилия', align: 'right', value: 'lastName' },
    { text: 'Компания', align: 'right', value: 'company' },
    { text: 'Специальность', align: 'right', value: 'jobTitle' },
    { text: 'Телефон', align: 'right', value: 'phone' },
    { text: 'Е-mail', align: 'right', value: 'email' },
    { text: 'Интересы', align: 'right', value: 'interests' },
];
</script>

<template>
    <div class="table">
        <div class="table__top">
            <div class="table__refresh">
                <h5>
                    {{ profileTitle }}
                </h5>
                <v-btn @click="fetchData">
                    <img src="../assets/refresh.svg" width="25" height="25" alt="">
                </v-btn>
            </div>

            <div class="table__actions">
                <v-btn class="table__action">
                    Действия
                    <img src="../assets/dropdown-arrow.svg" width="9" height="5" alt="">
                </v-btn>

                <div class="table__actions-types">
                    <div class="table__actions-type" @click="openPopup">
                        Добавить
                    </div>
                    <div class="table__actions-type">
                        Изменить
                    </div>
                    <div class="table__actions-type">
                        Удалить
                    </div>
                </div>
            </div>
        </div>
        <div class="table__content">
            <v-data-table
                :headers="headers"
                :items="users"
                item-key="id"
                class="elevation-1"
            >
                <template v-slot:item="props">
                    <tr>
                        <td v-show="currentProfile === ProfileEnum.ALL">
                            <img v-if="props.item.status" src="../assets/cloud-done.svg"
                                 width="32" height="32" alt="">
                            <img v-else src="../assets/cloud-error.svg"
                                 width="32" height="32" alt="">
                        </td>
                        <td>{{ props.item.firstName }}</td>
                        <td>{{ props.item.lastName }}</td>
                        <td>{{ props.item.company }}</td>
                        <td>{{ props.item.jobTitle }}</td>
                        <td>{{ props.item.phone }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.interests }}</td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<style scoped>
@import "../styles/components/table.scss";
</style>
