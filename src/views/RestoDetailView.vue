<script setup>
import { useRestoRepository } from "../composables/useRestoRepository";
import { useReviewRepository } from "../composables/useReviewRepository";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";
import Loading from "../components/Loading.vue";
import BaseContainer from "../components/BaseContainer.vue";
import Navbar from "../components/Navbar.vue";

const repository = useRestoRepository();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const resto = ref({});
const fetchDetail = async () => {
  isLoading.value = true;

  try {
    const id = route.params.id;
    const { data } = await repository.show(id);
    resto.value = data;
  } catch (e) {
    console.error(e);
  }

  isLoading.value = false;
};
onMounted(() => {
  fetchDetail();
});

const reviews = ref([]);
const fetchReviews = async () => {
  isLoading.value = true;

  try {
    const id = route.params.id;
    const { data } = await repository.reviews(id);
    reviews.value = data;
  } catch (e) {
    console.error(e);
  }
};

const id = route.params.id;
const review_data = reactive({
  rating: "",
  text: "",
  resto_id: id,
});
const review_repository = useReviewRepository();
const onSubmit = async () => {
  isLoading.value = true;
  try {
    await review_repository.store(review_data);
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};

onMounted(() => {
  fetchReviews();
});

</script>

<template>
  <Loading v-if="isLoading" />
  <BaseContainer v-else>
    <Navbar/>
    <RouterLink
      :to="{ name: 'restos' }"
      class="inline-block p-1 px-3 border-2 border-black rounded shadow-[1.9px_3px_0px_2px_rgba(173,193,120,1)] hover:scale-[1.05] active:scale-1 duration-200 "
    >
      Back
    </RouterLink>
    <BaseCard class="my-4 text-center">
      <template #title>
        {{ resto.name }}
      </template>
    </BaseCard>
    <img
      class="w-[100%] mx-auto bg-black h-[20rem] object-contain border-2 rounded-lg mb-3"
      v-if="resto.image"
      :src="`http://localhost:8000/storage/${resto.image}`"
    />
    <img
      class="w-[100%] mx-auto bg-black h-[20rem] object-contain border-2 rounded-lg mb-3"
      v-else
      src="../assets/images/no-image.jpg"
      alt="No Image Yet"
    />
    <p class="text-2xl mt-3 font-bold w-[110px]">About this resto'</p>
    <hr class="h-[10px] w-[50px] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
    <BaseCard class="mt-4 ">
        <div v-if="resto.description" class="text-black">
            {{ resto.description }}
        </div>
        <div v-else class="text-black">No Description Yet</div>
    </BaseCard>
    
    <p class="text-2xl mt-3 font-bold ]">Located at'</p>
    <hr class="h-[10px] w-[50px] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
    <BaseCard class="mt-4 ">
        <p class="text-black">
            {{ resto.address }}
        </p>
    </BaseCard>
    <p class="my-4 text-2xl font-bold ]">
        Reviews
    </p>
    <hr class="h-[10px] w-[50px] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
    
    <BaseCard>
        <p class="text-black text-center font-semibold text-xl">Give this restaurant a review</p>
        <hr class="h-[3px] w-[50px] mx-auto mt-2 bg-[#dde5b6] border-0 dark:bg-gray-700" />
      <div class="mb-[3%] flex justify-center items-center">
        <form
          :action="route.path"
          class="flex flex-col w-[40%]"
          @submit.prevent="onSubmit()"
        >
          <label for="name" class="mt-2 mb-3 text-black font-semibold"
            >Rating:
          </label>
          <input
            type="number"
            name="rating"
            class="border-2  text-black border-black p-1 rounded-sm transition-all duration-300 outline-none mb-2"
            v-model="review_data.rating"
            placeholder="1 to 5"
            min="1"
            max="5"
            required
          />
          <label class="mb-3 font-semibold text-black" for="description"
            >Review:
          </label>
          <textarea
            type="text"
            rows="4"
            name="text"
            required
            class="border-2 border-black text-black p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
            v-model="review_data.text"
          />
          <input
            type="submit"
            class="mt-2 text-black border-2 border-black p-1 cursor-pointer font-semibold hover:bg-black hover:text-white transition-all duration-300"
          />
        </form>
      </div>
    </BaseCard>

    <BaseCard v-for="review in reviews" :key="review.id" class="mt-4">
      <template #title>{{ review.user.name }} <span class="text-[#Bcd086]">|</span> {{ review.rating }} <font-awesome-icon icon="fa-solid fa-star" style="color: #ffde00;" alt="Star" /></template>
      {{ review.text }}
    </BaseCard>
    <p v-if="reviews.length === 0" class="text-center text-semibold text-4xl py-[60px]"> There is no review yet</p>
  </BaseContainer>
</template>
