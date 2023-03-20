<script setup>
    import { useAuthRepository } from '../composables/useAuthRepository';
    import { ref, onMounted } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import Loading from '../components/Loading.vue';
    import BaseContainer from '../components/BaseContainer.vue';

    const repository = useAuthRepository();
    const isLoading = ref(false);
    const profileData = ref()

    const fetchUserProfile = async () => {
        isLoading.value = true;
        try{
            const {data} = await repository.profile();
            profileData.value = data;
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }



    onMounted(() => {
        fetchUserProfile() 
    })
</script>


<template>
    <Loading v-if="isLoading"/>
    <BaseContainer v-else>
    <Navbar/>
    <div class="bg-white min-h-screen">
        {{ profileData }}
    </div>
</BaseContainer>
</template>