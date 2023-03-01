<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { ref, onMounted } from 'vue';
    import { RouterLink } from 'vue-router';
    import BaseCard from '../components/BaseCard.vue';
    import BaseContainer from '../components/BaseContainer.vue';

    const repository = useRestoRepository();

    const isLoading = ref(true);
    const restos = ref([]);
    const fetchRestos = async () => {
        isLoading.value = true;
        try {
            const { data } = await repository.index();
            restos.value = data; 
        } catch(e) {
            console.error(e);
        }
        isLoading.value = false;
    };

    onMounted(() => fetchRestos());
    const excerpt = (text, maxLength = 10, indicator = "...") => {
        let textCopy = text;

        if (textCopy.length > maxLength) {
            textCopy = textCopy.substring(0, maxLength) + indicator;
        }
        return textCopy;
    }
</script>

<template>
    <BaseContainer>
        <div class="relative flex justify-between w-full bg-white p-4 mb-8">
            <div>
                <h1>Resto</h1>
            </div>
            <div class="flex justify-around">
                <a href="" class="ml-2">Home</a>
                <a href="" class="ml-2">About</a>
                <router-link to="create" class="ml-2">Create Your Resto</router-link>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div v-for="resto in restos" :key="resto.id" class="col-span-4">
                <!-- Card -->
                <BaseCard :to="{ name:'restos-show', params: { id:resto.id } }" >
                    <template #title>
                        {{ resto.name }}
                    </template>
                    <div v-if="resto.description">
                        {{ excerpt(resto.description, 40) }}
                    </div>
                    <div v-else>
                        {{ excerpt('No Description Yet', 40) }}
                    </div>
                </BaseCard>
            </div>
        </div>
    </BaseContainer>
</template>