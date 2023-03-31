<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import Loading from '../components/Loading.vue';
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

  const isLoading = ref(false)
  const onSubmit = () => {
    isLoading.value = true;
    try {
      repository.register(credentials);

      router.replace({name: 'login'})
    } 
    catch (e) {
        console.error(e)
    }
    isLoading.value = false;
  }
</script>

<template>
  <Loading v-if="isLoading"/>
  <main class="grid grid-cols-12 gap-4 overflow-hidden" v-else>
    <section class="col-span-6 bg-white min-h-screen shadow-lg">
        <form :action="route.path" method="post" class="w-[50%] mx-auto mt-20" @submit.prevent="onSubmit">
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
              placeholder="*******"
              required>
            </div>
            <div class="mb-4">
              <label for="password_confirmation" class="block mb-2">Confirm Password</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              v-model="credentials.password_confirmation" 
              placeholder="*******"
              required>
            </div>
            <button type="submit" class="border p-3 text-white active:bg-blue-600 hover:bg-blue-500 w-full rounded bg-blue-400 transition-colors">Masuk</button>
            <p class="text-center mt-5 font-semibold">Already Have an Account ? <router-link class="text-blue-600 hover:text-blue-700 hover:text-xl duration-300" to="/" >Login</router-link></p>
          </form>
    </section>
  </main>
</template>
