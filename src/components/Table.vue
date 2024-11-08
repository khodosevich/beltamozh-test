<script setup>
import { ref, onMounted } from 'vue';

const tableData = ref([]);

const fetchData = async () => {
    try {
        const response = await fetch('https://retoolapi.dev/wHFLgA/data');
        const data = await response.json();
        tableData.value = data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
});

const headers = [
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
                Обработанные
                <v-btn>
                    <img src="../assets/refresh.svg" width="25" height="25" alt="">
                </v-btn>
            </div>

            <div class="table__actions">
                <v-btn class="table__action">
                    Действия
                    <img src="../assets/dropdown-arrow.svg" width="9" height="5" alt="">
                </v-btn>

                <div class="table__actions-types">
                    <div class="table__actions-type">
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
                :items="tableData"
                item-key="id"
                class="elevation-1"
            >
                <template v-slot:item="props">
                    <tr>
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
