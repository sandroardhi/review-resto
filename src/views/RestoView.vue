<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { ref, onMounted } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import BaseCard from '../components/BaseCard.vue';
    import BaseContainer from '../components/BaseContainer.vue';

    const repository = useRestoRepository();

    const isLoading = ref(true);
    const restos = ref([]);
    const router = useRouter();
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
    const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.replace({name: 'login'})
    }
</script>

<template>
    <div v-if="isLoading" class="w-screen h-screen bg-gray-100 flex items-center justify-center flex-col ">
        <img src="../../public/assets/loading-cat-unscreen.gif" alt="">
        <p class=" text-4xl text-[#393d47] font-['Fredoka_One']">Please Wait Congok . . .</p>
    </div>
    <BaseContainer v-else>
        <div class="relative flex justify-between w-full bg-white p-4 mb-8 items-center">
            <div>
                <h1 class="text-3xl font-semibold">Resto</h1>
            </div>
            <div class="flex justify-around items-center">
                <a href="" class="ml-2 px-4">Home</a>
                <a href="" class="ml-2 px-4">About</a>
                <router-link to="create-resto" class="ml-2 px-4">Create Your Resto</router-link>
                <button @click="logout" class="bg-blue-400 px-2 py-1 text-white font-semibold rounded-md">
                     Logout
                </button>
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
                    <div v-if="resto.address">
                        {{ excerpt(resto.address, 40) }}
                    </div>
                   
                </BaseCard>
            </div>
        </div>
    </BaseContainer>
</template>