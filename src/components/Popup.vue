<script setup>
import { computed, ref, toRaw } from 'vue';
import { useStore } from 'vuex';

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

const cancel = () => {
    popup.closePopup();
    clearFields();
}
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
                <v-btn @click="addNewProfile" :style="{ backgroundColor: 'var(--beltamozh-color-blue)', color: 'var(--beltamozh-color-white)'}">
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
    background: rgba(0, 0, 0, 0.5);
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