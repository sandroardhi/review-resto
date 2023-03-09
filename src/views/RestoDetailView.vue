<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { useReviewRepository } from '../composables/useReviewRepository'
    import { ref, onMounted, reactive } from 'vue';
    import { useRoute,useRouter, RouterLink } from 'vue-router';
    import BaseCard from "@/components/BaseCard.vue";
    import BaseContainer from '../components/BaseContainer.vue';

    const repository = useRestoRepository();
    const route = useRoute();
    const router = useRouter();

    const isLoading = ref(true);
    const resto = ref({});
    const fetchDetail = async () => {
        isLoading.value = true;

        try{
            const id = route.params.id;
            const {data} = await repository.show(id);
            resto.value = data;
        } catch(e) {
            console.error(e);
        }

        isLoading.value = false;
    };
    onMounted(() => {
        fetchDetail()
    });

    const reviews = ref([]);
    const fetchReviews = async () => {
        isLoading.value = true;
        
        try {
            const id = route.params.id;
            const {data} = await repository.reviews(id);
            reviews.value = data;
        } catch(e) {
            console.error(e);
        }
    }
    
    const id = route.params.id;
    const review_data = reactive({
        rating: '',
        text: '',
        resto_id: id
    })
    const review_repository = useReviewRepository();
    const onSubmit = async () => {
        isLoading.value = true
        try {
            await review_repository.store(review_data);
            window.location.reload()
        } catch (e) {
            console.error(e)
        }   
        isLoading.value = false
    }
    
    onMounted(() => {
        fetchReviews()
    });

</script>

<template>
    <div v-if="isLoading" class="w-screen h-screen bg-gray-100 flex items-center justify-center flex-col ">
        <img src="../../public/assets/loading-cat-unscreen.gif" alt="">
        <p class=" text-4xl text-[#393d47] font-['Fredoka_One']">Please Wait . . .</p>
    </div>
   <BaseContainer v-else>
        <RouterLink
            :to="{ name: 'restos' }"
            class="inline-block p-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
            Back
        </RouterLink>
        <BaseCard class="mt-4 bg-red-600 text-white">
            <template #title>Resto</template>
        </BaseCard>
        <BaseCard class="mt-4">
            <template #title>
                {{ resto.name }}
            </template>
        </BaseCard>
        <BaseCard class="mt-4">
            <div v-if="resto.description">
                {{ resto.description }}
            </div>
            <div v-else>
                No Description Yet
            </div>
        </BaseCard>
        <BaseCard class="mt-4 bg-red-600 text-white">
        <template #title>Reviews</template>
        </BaseCard>

        <BaseCard>
            <div class="my-[3%]">
            <form :action="route.path" class="flex flex-col w-[40%]" @submit.prevent="onSubmit()">
                <label for="name" class="mt-2 mb-3 text-black font-semibold">Rating: </label>
                <input 
                    type="number" 
                    name="rating" 
                    class="border-2 text-black border-[rgb(138,138,138)] p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="review_data.rating"
                    placeholder="1 to 5"
                    min="1"
                    max="5"
                    required
                >
                <label class="mb-3 font-semibold text-black" for="description">Review: </label>
                <textarea 
                    type="text" 
                    rows="4" 
                    name="text" 
                    class="border-2 border-[rgb(138,138,138)] text-black p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="review_data.text"
                />
                <input type="submit"  class="mt-2 text-black border-2 border-black p-1 cursor-pointer font-semibold hover:bg-black hover:text-white transition-all duration-300">
            </form>
        </div>
        </BaseCard>

        <BaseCard v-for="review in reviews" :key="review.id" class="mt-4">
        <template #title>{{ review.user.name }}</template>
        {{ review.text }}
        </BaseCard>
   </BaseContainer>
</template>