<script setup>
import BaseContainer from '../components/BaseContainer.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { useRestoRepository } from '../composables/useRestoRepository';
import Loading from '../components/Loading.vue';
import Navbar from '../components/Navbar.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const repository = useRestoRepository();
const resto = ref({});

const onFileChange = (e) => {
    console.log(e.target.files[0])
      resto.image = e.target.files[0];
};

const isLoading =  ref(false)
const onSubmit = (id) => {
    isLoading.value = true;
    try {
        repository.update(id, resto);

        router.replace({name: 'restos'})
    } catch (e) {
        console.error(e);
    }
    isLoading.value = false;
}

const id = route.params.id
const fetchResto = async (id) => {
    const {data} = await repository.show(id)
    resto.value = data
    
}
onMounted(() => {
    console.log(id)
    fetchResto(id)
    console.log(resto)
})
</script>

<template>
    <Loading v-if="isLoading"/>
    <BaseContainer v-else>
        <Navbar/>
        <div class="ml-60 absolute">
            <p class="text-6xl">Edit</p>
            <hr class="h-[10px] w-[50px] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
        </div>
        <div class="w-[75%] min-h-[80vh] bg-white mx-auto my-[3%] flex justify-center">
            <form :action="route.path" class="flex flex-col w-[40%]" @submit.prevent="onSubmit(id)">
                <label for="name" class="mt-3 mb-3 font-semibold">Resto Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    class="border-2 border-[#adc178] p-1 focus:border-[#6c794a] rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="resto.name"
                    required
                >
                <label class="mb-3 font-semibold" for="address">Adress: </label>
                <input 
                    type="text" 
                    name="address" 
                    class="border-2 border-[#adc178] p-1 focus:border-[#6c794a] rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="resto.address"
                    required
                >
                <label for="Image" class="mb-3 font-semibold">Your Restaurant Photo: </label>
                <input
                    type="file"
                    name="image"
                    @change="onFileChange"
                    class="block w-full text-sm border-2 rounded-sm border-[#adc178] p-2 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-[#bbd185] file:text-black hover:file:bg-[#6c794a] hover:file:text-[#eaffbb] transition-all duration-300"
                />
                <label class="mb-3 font-semibold" for="description">Description: </label>
                <textarea 
                    type="text" 
                    rows="4" 
                    name="description" 
                    class="border-2 border-[#adc178] p-1 focus:border-[#6c794a] rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="resto.description"
                />
                <input type="submit" class="mt-2 border-2 border-[#adc178]  p-1 cursor-pointer font-semibold hover:border-[#6c794a] hover:bg-[#6c794a] hover:text-white transition-all duration-300">
            </form>
        </div>
    </BaseContainer>
</template>