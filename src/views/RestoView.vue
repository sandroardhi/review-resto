<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { useAuthRepository } from '../composables/useAuthRepository';
    import { ref, onMounted } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import BaseCard from '../components/BaseCard.vue';
    import BaseContainer from '../components/BaseContainer.vue';
    import Navbar from '../components/Navbar.vue';
    import Loading from '../components/Loading.vue';
    import { TailwindPagination } from 'laravel-vue-pagination';

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
        


    const laravelData = ref({});


    onMounted(() => {
        fetchRestos()
    });
</script>

<template>
    <loading v-if="isLoading"/>
    <BaseContainer v-else class="mb-5">
        <Navbar/>
        <p class="text-4xl font-semibold mb-4">Today's Pick</p>
        <img class="w-[90%] mx-auto bg-black h-[20rem] object-contain border-2 rounded-lg mb-3" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" >
        <div class="grid grid-cols-12 gap-4">
            <div v-for="resto in restos" :key="resto.id" class="col-span-6">
                <!-- Card -->
                <BaseCard :to="{ name:'restos-show', params: { id:resto.id } }" class=" p-0 rounded-lg h-28 active:scale-100 overflow-hidden shadow-[3.5px_3.4px_0px_3px_rgba(173,193,120,1)] m-2 hover:scale-[1.05] transition-all duration-200">
                    <div class="flex flex-row">
                        <div class="w-full h-full p-2 rounded-lg">
                            <p class="font-bold capitalize text-lg text-black ">
                            {{ resto.name }}
                        </p>
                        <div v-if="resto.description">
                            {{ excerpt(resto.description, 120) }}
                        </div> 
                        <div v-else>
                            {{ excerpt('No Description Yet', 40) }}
                        </div>
                        </div>
                        <div class=" w-[40%] h-28 border-l-[1px] ">
                            <img v-if="resto.image" class="object-cover w-full h-full rounded-r-lg" :src="`http://localhost:8000/storage/${resto.image}`"/>
                            <img src="../assets/images/no-image.jpg" alt="" v-else class="object-scale-down w-full h-full">
                        </div>
                    </div>
                </BaseCard>
            </div>
        </div>
    </BaseContainer>
</template>