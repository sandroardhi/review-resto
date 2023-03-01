<script setup>
import BaseContainer from '../components/BaseContainer.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useRestoRepository } from '../composables/useRestoRepository';

const router = useRouter();
const route = useRoute();
const repository = useRestoRepository();
const resto = reactive({
    name: '',
    address: '',
    description: ''
});

const onSubmit = () => {
    try {
        repository.store(resto);

        router.replace({name: 'restos'})
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <BaseContainer>
        <div class="w-[75%] h-[80vh] bg-white mx-auto my-[3%] flex justify-center">
            <form :action="route.path" class="flex flex-col w-[40%]" @submit.prevent="onSubmit">
                <label for="name" class="mt-16 mb-3 font-semibold">Resto Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    class="border-2 border-[rgb(138,138,138)] p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="resto.name"
                    required
                >
                <label class="mb-3 font-semibold" for="address">Adress: </label>
                <input 
                    type="text" 
                    name="address" 
                    class="border-2 border-[rgb(138,138,138)] p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="resto.address"
                    required
                >
                <label class="mb-3 font-semibold" for="description">Description: </label>
                <textarea 
                    type="text" 
                    rows="4" 
                    name="description" 
                    class="border-2 border-[rgb(138,138,138)] p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="resto.description"
                />
                <input type="submit" class="mt-2 border-2 border-black p-1 cursor-pointer font-semibold hover:bg-black hover:text-white transition-all duration-300">
            </form>
        </div>
    </BaseContainer>
</template>