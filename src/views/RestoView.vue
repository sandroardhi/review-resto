<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { useAuthRepository } from '../composables/useAuthRepository';
    import { ref, onMounted } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import BaseCard from '../components/BaseCard.vue';
    import BaseContainer from '../components/BaseContainer.vue';
    import Navbar from '../components/Navbar.vue';

    const repository = useRestoRepository();
    const repository_auth = useAuthRepository();

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

    const excerpt = (text, maxLength = 10, indicator = "...") => {
        let textCopy = text;
        
        if (textCopy.length > maxLength) {
            textCopy = textCopy.substring(0, maxLength) + indicator;
        }
        return textCopy
    }
        
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        repository_auth.logout();
        router.replace({name: 'login'})
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
        <Navbar/>
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