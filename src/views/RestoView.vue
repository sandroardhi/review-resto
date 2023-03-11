<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { useAuthRepository } from '../composables/useAuthRepository';
    import { ref, onMounted } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import BaseCard from '../components/BaseCard.vue';
    import BaseContainer from '../components/BaseContainer.vue';

    const repository = useRestoRepository();
    const repository_auth = useAuthRepository();

    const isLoading = ref(true);
    const restos = ref([]);
    const router = useRouter();
    
    const userData = JSON.parse(localStorage.getItem('user'));

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

    const excerpt = (text, maxLength = 10, indicator = "...") => {
        let textCopy = text;
        
        if (textCopy.length > maxLength) {
            textCopy = textCopy.substring(0, maxLength) + indicator;
        }
        return textCopy
    }
        
    const logout = () => {
        repository_auth.logout();
        router.replace({name: 'login'})
    }

    const dropdown = ref(false)

    const dropdownShow = () => {
        dropdown.value = true
    }
    const dropdownHide = () => {
        dropdown.value = false
    }

    onMounted(() => {
        fetchRestos()

    });
</script>

<template>
    <div v-if="isLoading" class="w-screen h-screen bg-gray-100 flex items-center justify-center flex-col ">
        <img src="../../public/assets/loading-cat-unscreen.gif" alt="">
        <p class=" text-4xl text-[#393d47] font-['Fredoka_One']">Please Wait . . .</p>
    </div>
    <BaseContainer v-else>
        <div class="relative flex justify-between w-full bg-white p-4 mb-8 items-center">
            <div>
                <h1 class="text-3xl font-semibold">Resto</h1>
            </div>
            <div class="flex justify-around items-center">
                <a href="" class="ml-2 px-4">Home</a>
                <router-link to="about" class="ml-2 px-4">About</router-link>
                <button v-if="dropdown" @click="dropdownHide" class="dropdown-toggle bg-blue-400 px-2 py-1 text-white font-semibold rounded-md">
                    Hi, {{ userData.name }}
                    <ul v-if="dropdown" class="dropdown-group absolute mt-2 right-5 rounded-sm w-[15%] bg-white text-black border">
                        <li class="p-1 border border-black">
                            tes
                        </li>
                        <li @click="logout" class="p-1  border-x border-black font-semibold">
                            Logout
                        </li>
                        <li class="p-1 border border-black">
                            <router-link to="create-resto" >Create Your Resto</router-link>
                        </li>
                    </ul>
                </button>
                <button v-else @click="dropdownShow" class="dropdown-toggle bg-blue-400 px-2 py-1 text-white font-semibold rounded-md">
                    Hi, {{ userData.name }}
                    <ul v-if="dropdown" class="dropdown-group absolute mt-2 right-5 rounded-sm w-[15%] bg-white text-black border">
                        <li class="p-1 border border-black">
                            tes
                        </li>
                        <li @click="logout" class="p-1  border-x border-black font-semibold">
                            Logout
                        </li>
                        <li class="p-1 border border-black">
                            <router-link to="create-resto" >Create Your Resto</router-link>
                        </li>
                    </ul>
                </button>
                
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div v-for="resto in restos" :key="resto.id" class="col-span-4">
                <!-- Card -->
                <BaseCard :to="{ name:'restos-show', params: { id:resto.id } }" >
                    <div class="w-full h-[20%]">

                    </div>
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