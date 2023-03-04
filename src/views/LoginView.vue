<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { useAuthRepository } from '@/composables';

  const route = useRoute();
  const router = useRouter();
  const repository = useAuthRepository();

  const credentials = reactive({
    email: '',
    password: '',
    device_name: 'browser'
  })

  const isLoggingIn = ref(false)
  const onSubmit = async () => {
    isLoggingIn.value = true;
    try {
      const {data} = await repository.login(credentials);
      if (data) {
        // kalo ada data langsung di store di localStorage
        // iki kyke parameter pertama e setItem iku key ne, parameter kedua iku value ne
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        router.replace({name: 'restos'})
      } 
    } 
    catch (e) {
        console.error(e)
    }
    isLoggingIn.value = false;
  }
</script>

<template>
  <main class="grid grid-cols-12 gap-4">
    <section class="col-span-6 bg-white min-h-screen shadow-lg">
        <form :action="route.path" method="post" class="p-40" @submit.prevent="onSubmit">
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
              placeholder="password"
              required>
            </div>
            <button type="submit" class="border p-3 text-white active:bg-blue-600 hover:bg-blue-500 w-full rounded bg-blue-400 transition-colors">Masuk</button>
        </form>
    </section>
  </main>
</template>
