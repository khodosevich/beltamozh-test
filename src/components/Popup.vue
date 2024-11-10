<script setup>
import { computed, ref, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import { ProfileActionTypeEnum } from '@/store/index.js';

const popup = defineProps({
    closePopup: {
        type: Function,
        required: true
    },
    isPopupVisible: {
        type: Boolean,
        required: true
    }
});

const firstName = ref('');
const lastName = ref('');
const company = ref('');
const jobTitle = ref('');
const phone = ref('');
const email = ref('');
const interests = ref('');

const store = useStore();
const actionType = computed(() => store.getters.PROFILE_ACTION_TYPE);
const activeProfileId = computed(() => store.getters.ACTIVE_PROFILE_ID);

const clearFields = () => {
    firstName.value = '';
    lastName.value = '';
    company.value = '';
    jobTitle.value = '';
    phone.value = '';
    email.value = '';
    interests.value = '';
}

const addNewProfile = async () => {
    await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', true);

    const newProfile = toRaw({
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        jobTitle: jobTitle.value,
        phone: phone.value,
        email: email.value,
        interests: interests.value
    });

    try {
        await store.dispatch("ADD_NEW_PROFILE_ACTION", newProfile);
        popup.closePopup();
        clearFields();
    } catch (error) {
        console.error("Ошибка при добавлении профиля:", error);
    } finally {
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', false);
    }
};

const editProfile = async () => {
    const updatedProfile = {
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        jobTitle: jobTitle.value,
        phone: phone.value,
        email: email.value,
        interests: interests.value,
    };

    const updatedParams = Object.fromEntries(
        Object.entries(updatedProfile).filter(([key, value]) => value !== '')
    );

    if (Object.keys(updatedParams).length === 0) {
        return;
    }

    try {
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', true);
        await store.dispatch('UPDATE_PROFILE_ACTION', updatedParams);
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', false);
    } catch (error) {
        console.error('Ошибка при изменении профиля:', error);
    }
};

const setProfileToEdit = async () => {
    if (activeProfileId.value === -1) {
        alert('Выберите пользователя для изменений, кликнув по нему в таблице.');
        popup.closePopup();
        await store.dispatch('UPDATE_PROFILE_ACTION_TYPE_ACTION', -1);
        return;
    }

    try {
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', true);
        const profile = await store.dispatch('GET_PROFILE_BY_ID_ACTION', activeProfileId.value);
        firstName.value = profile.firstName;
        lastName.value = profile.lastName;
        company.value = profile.company;
        jobTitle.value = profile.jobTitle;
        phone.value = profile.phone;
        email.value = profile.email;
        interests.value = profile.interests;
    } catch (error) {
        console.error("Ошибка при получении профиля:", error);
    } finally {
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', false);
    }
}

const searchProfile = async () => {
    const query = {
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        jobTitle: jobTitle.value,
        phone: phone.value,
        email: email.value,
        interests: interests.value,
    };

    const searchParams = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => value !== '')
    );

    if (Object.keys(searchParams).length === 0) {
        return;
    }

    try {
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', true);
        await store.dispatch('GET_PROFILES_BY_SEARCH_ACTION', searchParams);
        await store.dispatch('UPDATE_FETCH_REQUEST_ACTION', false);
    } catch (error) {
        console.error('Ошибка при поиске профилей:', error);
    }
};

const cancel = () => {
    store.dispatch('UPDATE_PROFILE_ACTION_TYPE_ACTION', -1);
    popup.closePopup();
    clearFields();
}

const popupHandler = () => {
    switch (actionType.value) {
        case ProfileActionTypeEnum.ADD: {
            addNewProfile();
            break;
        }
        case ProfileActionTypeEnum.EDIT: {
            editProfile();
            break;
        }
        case ProfileActionTypeEnum.SEARCH: {
            searchProfile();
            break;
        }
        default:
            break;
    }
}

watch(() => actionType.value, (newValue) => {
    if (actionType.value === ProfileActionTypeEnum.EDIT) {
        setProfileToEdit();
    }
});
</script>

<template>
    <div v-if="isPopupVisible" class="popup">
        <div class="popup__content">
            <div class="popup__inputs">
                <v-text-field
                    v-model="firstName"
                    color="primary"
                    label="Имя"
                    variant="underlined"
                />
                <v-text-field
                    v-model="lastName"
                    color="primary"
                    label="Фамилия"
                    variant="underlined"
                />
                <v-text-field
                    v-model="company"
                    color="primary"
                    label="Компания"
                    variant="underlined"
                />
                <v-text-field
                    v-model="jobTitle"
                    color="primary"
                    label="Специальность"
                    variant="underlined"
                />
                <v-text-field
                    v-model="phone"
                    color="primary"
                    label="Телефон"
                    variant="underlined"
                />
                <v-text-field
                    v-model="email"
                    color="primary"
                    label="E-mail"
                    variant="underlined"
                />
                <v-text-field
                    v-model="interests"
                    color="primary"
                    label="Интересы"
                    variant="underlined"
                />
            </div>
            <div class="popup__btns">
                <v-btn @click="cancel">
                    Закрыть
                </v-btn>
                <v-btn @click="popupHandler" :style="{ backgroundColor: 'var(--beltamozh-color-blue)', color: 'var(--beltamozh-color-white)'}">
                    Применить
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--beltamozh-overlay);
    display: flex;
    align-items: center;
    justify-content: end;
    z-index: 1000;

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: var(--beltamozh-color-white);
        margin-right: 20px;
        padding: 20px;
        border-radius: 5px;
        max-width: 400px;
        width: 100%;
        height: calc(100% - 64px);
        box-shadow: var(--beltamozh-box-shadow);
    }

    &__btns {
        display: flex;
        gap: 10px;
        justify-content: end;
    }
}
</style>