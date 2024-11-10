<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ProfileEnum } from '@/store/modules/UserModule.store.js';
import { ProfileActionTypeEnum } from '@/store/modules/ProfileModule.store.js';

const popup = defineProps({
    openPopup: {
        type: Function,
        required: true
    }
});

const store = useStore();
const users = computed(() => store.getters['UserModule/FILTERED_USERS']);
const currentProfile = computed(() => store.getters['UserModule/CURRENT_PROFILE']);
const activeUserId = computed(() => store.getters['UserModule/ACTIVE_USER_ID']);

const fetchData = async () => {
    await store.dispatch('LoaderModule/UPDATE_FETCH_REQUEST_ACTION', true);
    await store.dispatch('UserModule/SET_USERS_ACTION');
    await store.dispatch('LoaderModule/UPDATE_FETCH_REQUEST_ACTION', false);
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
    { title: 'Статус', align: 'left', value: 'status' },
    { title: 'Имя', align: 'left', value: 'firstName' },
    { title: 'Фамилия', align: 'right', value: 'lastName' },
    { title: 'Компания', align: 'right', value: 'company' },
    { title: 'Специальность', align: 'right', value: 'jobTitle' },
    { title: 'Телефон', align: 'right', value: 'phone' },
    { title: 'Е-mail', align: 'right', value: 'email' },
    { title: 'Интересы', align: 'right', value: 'interests' },
];

const addHandler = () => {
    store.dispatch('ProfileModule/UPDATE_PROFILE_ACTION_TYPE_ACTION', ProfileActionTypeEnum.ADD);
    popup.openPopup();
}

const editHandler = () => {
    store.dispatch('ProfileModule/UPDATE_PROFILE_ACTION_TYPE_ACTION', ProfileActionTypeEnum.EDIT);
    popup.openPopup();
}

const deleteHandler = async () => {
    if (activeUserId.value === -1) {
        alert('Выберите пользователя для удаления, кликнув по нему в таблице.');
        await store.dispatch('ProfileModule/UPDATE_PROFILE_ACTION_TYPE_ACTION', -1);
        return;
    }

    await store.dispatch('LoaderModule/UPDATE_FETCH_REQUEST_ACTION', true);
    await store.dispatch('UserModule/DELETE_USERS_ACTION', activeUserId.value);
    await store.dispatch('LoaderModule/UPDATE_FETCH_REQUEST_ACTION', false);
}

const activeUserHandler = (id) => {
    store.dispatch('UserModule/SET_ACTIVE_USER_ID_ACTION', id);
}

onMounted(() => {
    fetchData();
});
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
                    <div class="table__actions-type" @click="addHandler">
                        Добавить
                    </div>
                    <div class="table__actions-type" @click="editHandler">
                        Изменить
                    </div>
                    <div class="table__actions-type" @click="deleteHandler">
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
                :items-per-page="13"
            >
                <template v-slot:item="props">
                    <tr
                        :class="{ 'selected-row': props.item.id === activeUserId }"
                        @click="activeUserHandler(props.item.id)"
                    >
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

.selected-row {
    background-color: var(--beltamozh-color-grey);
}
</style>
