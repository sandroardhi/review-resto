<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { useAuthRepository } from '@/composables';

  const route = useRoute();
  const router = useRouter();
  const repository = useAuthRepository();

  const credentials = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    device_name: 'browser'
  })

  const isLoggingIn = ref(false)
  const onSubmit = () => {
    isLoggingIn.value = true;
    try {
      repository.register(credentials);

      router.replace({name: 'login'})
    } 
    catch (e) {
        console.error(e)
    }
    isLoggingIn.value = false;
  }
</script>

<template>
    <div v-if="isLoggingIn" class="w-screen h-screen bg-gray-100 flex items-center justify-center flex-col ">
        <img src="../../public/assets/loading-cat-unscreen.gif" alt="">
        <p class=" text-4xl text-[#393d47] font-['Fredoka_One']">Please Wait Congok . . .</p>
    </div>

  <main class="grid grid-cols-12 gap-4" v-else>
    <section class="col-span-6 bg-white min-h-screen shadow-lg">
        <form :action="route.path" method="post" class="p-40" @submit.prevent="onSubmit">
            <div class="mb-4">
              <label for="name" class="block mb-2">Name</label>
              <input 
              type="text" 
              class="border p-2 w-full bg-gray-50 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="Sandro Ardhi Saputra"
              v-model="credentials.name" 
              required>
            </div>
            <div class="mb-4">
              <label for="email" class="block mb-2">Email</label>
              <input 
              type="email" 
              class="border p-2 w-full bg-gray-50 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="someone@example.com"
              v-model="credentials.email" 
              required>
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2">Password</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              v-model="credentials.password" 
              required>
            </div>
            <div class="mb-4">
              <label for="password_confirmation" class="block mb-2">Confirm Password</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              v-model="credentials.password_confirmation" 
              required>
            </div>
            <button type="submit" class="border p-3 text-white active:bg-blue-600 hover:bg-blue-500 w-full rounded bg-blue-400 transition-colors">Masuk</button>
        </form>
    </section>
  </main>
</template>
