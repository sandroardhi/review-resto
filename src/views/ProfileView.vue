<script setup>
import { useAuthRepository } from "../composables/useAuthRepository";
import { useRestoRepository } from "../composables/useRestoRepository";
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Loading from "../components/Loading.vue";
import BaseContainer from "../components/BaseContainer.vue";
import { RouterLink } from "vue-router";

const repository = useAuthRepository();
const resto_repository = useRestoRepository();
const isLoading = ref(false);
const profileData = ref({});

const fetchUserProfile = async () => {
  isLoading.value = true;
  try {
    const { data } = await repository.profile();
    id.value = data.id;
    profileData.value = data;
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};

const resto_tumpal = ref(false);
const id = ref("");

const restos = ref([]);
const fetchResto = async (id) => {
  //   isLoading.value = true;
  try {
    const { data } = await resto_repository.index_resto_profile(id);
    restos.value = data;
  } catch (e) {
    console.error(e);
  }
  //   isLoading.value = false;
};

const isFetching = ref(false)
const restoShow = async (id) => {
  isFetching.value = true
  try{
    await fetchResto(id);
    
    resto_tumpal.value = true;
  } catch(e) {
    console.error(e)
  }
  isFetching.value = false
};

const destroy = async (id) => {
      isLoading.value = true;
    try {
      await resto_repository.destroy(id);
      window.location.reload()

    } catch (e) {
      console.error(e);
    }
      isLoading.value = false;
};


onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
  <Loading v-if="isLoading" />
  <BaseContainer v-else>
    <!-- {{ profileData }}
    {{ id }}
    <p v-if="resto_tumpal">
        {{ restos }}
    </p> -->
    <Navbar />
    <div class="bg-white min-h-screen flex flex-col items-center p-2">
      <div class="flex flex-col items-center">
        <div v-if="profileData.profile_picture" class="w-[120px] relative mt-6">
          <img :src="profileData" alt="" class="rounded-full" />
        </div>
        <div v-else class="w-[120px] relative mt-6">
          <img
            src="../assets/images/blank-pp.png"
            class="rounded-full"
            alt=""
          />
        </div>

        <div class="relative mt-6 border-b text-xl">
          {{ profileData.name }}
        </div>
        <div class="text-2xl mt-2">
          <p v-if="profileData.description">{{ profileData.description }}</p>
          <p v-else>No Description Yet</p>
        </div>
      </div>
      <hr class="h-[2px] w-[40%] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
      <div class="flex flex-col px-[22rem] py-1 text-xl w-full">
        <p class="mb-2">
          <span class="font-bold">Email: </span> {{ profileData.email }}
        </p>
        <p class="mb-2" v-if="profileData.phone_number">
          <span class="font-bold">Phone Number: </span>
          {{ profileData.phone_number }}
        </p>
        <p class="mb-2" v-else>
          <span class="font-bold">Phone Number: </span> -
        </p>
      </div>
      <hr class="h-[2px] w-[40%] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
      <button class="px-2 py-1 border-2 border-black rounded shadow-[1.9px_3px_0px_2px_rgba(173,193,120,1)] hover:scale-[1.05] active:scale-1 duration-200 mb-4" @click="restoShow(id)">Your Resto</button>
      <div v-if="resto_tumpal" class="flex flex-col w-[80%]">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table
                class="min-w-full text-center text-sm font-light mb-10"
              >
                <thead
                  class="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900"
                >
                  <tr>
                    <th scope="col" class="px-6 py-4">Name</th>
                    <th scope="col" class="px-6 py-4">Description</th>
                    <th scope="col" class="px-6 py-4">Adress</th>
                    <th scope="col" class="px-6 py-4">Image</th>
                    <th scope="col" class="px-6 py-4">Action</th>
                  </tr>
                </thead>
                  <tbody v-if="isFetching">
                      <tr class="border-b dark:border-neutral-500">
                          <td colspan="5" class="whitespace-nowrap px-6 py-4"> Loading... </td>
                      </tr>
                  </tbody>
                    <tbody v-for="resto in restos" :key="resto.id" v-else>
                      <tr class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap px-6 py-4">
                          {{ resto.name }}
                        </td>
                        <td
                          class="whitespace-nowrap px-6 py-4"
                          v-if="resto.description"
                        >
                          {{ resto.description }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4" v-else>
                          No Description Yet
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {{ resto.address }}
                        </td>
                        <td
                          class="whitespace-nowrap px-6 py-4 w-[200px] h-[100px]"
                          v-if="resto.image"
                        >
                          <img
                            :src="`http://localhost:8000/storage/${resto.image}`"
                            class="object-cover"
                            alt=""
                          />
                        </td>
                        <td class="whitespace-nowrap px-6 py-4" v-else>No Image</td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <router-link :to="`/edit/${resto.id}`" class="ml-2 text-lg">
                            <font-awesome-icon icon="fa-pen-to-square" />
                          </router-link>
                          <router-link :to="`/restos/${resto.id}`" class="ml-2 text-lg">
                            <font-awesome-icon icon="fa-solid fa-eye" />
                          </router-link>
                          <button class="ml-2 text-lg" @click="destroy(resto.id)">
                            <font-awesome-icon
                              icon="trash"
                              style="color: #ff0e0e"
                            />
                          </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="restos.length === 0">
                    <tr class=" dark:border-neutral-500">
                        <td colspan="5" class="whitespace-nowrap px-6 py-4 font-semibold text-2xl"> No Restos Yet </td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                        <td colspan="5" class="whitespace-nowrap px-6 py-4 text-[#Bcd086] hover:text-[rgba(178,193,125,1)] duration-150 font-semibold text-2xl"><router-link to="/create-resto" > Create your resto now </router-link></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>
