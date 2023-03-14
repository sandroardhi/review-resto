<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';

    const userData = JSON.parse(localStorage.getItem('user'));
    const dropdown = ref(false)

    const dropdownShow = () => {
        dropdown.value = true
    }
    const dropdownHide = () => {
        dropdown.value = false
    }
</script>




<template>    
        <div class="relative flex justify-between w-full bg-white p-4 mb-8 items-center">
            <div>
                <h1 class="text-3xl font-semibold">Resto</h1>
            </div>
            <div class="flex justify-around items-center">
                <router-link to="restos" class="ml-2 px-4">Home</router-link>
                <router-link to="about" class="ml-2 px-4">About</router-link>
                <div v-if="userData">
                    <button v-if="dropdown" @click="dropdownHide" class="dropdown-toggle bg-blue-400 px-2 py-1 text-white font-semibold rounded-md">
                        Hi, {{ userData.name }}
                        <ul v-if="dropdown" class="dropdown-group absolute mt-2 right-5 rounded-sm w-[15%] bg-white text-black border">
                            <li class="p-1 border border-black">
                                <router-link to="profile">Profile</router-link>
                            </li>
                            <li @click="logout" class="p-1  border-x border-black font-semibold">
                                Logout
                            </li>
                            <li class="p-1 border border-black">
                                <router-link to="create-resto" >Create Your Resto</router-link>
                            </li>
                        </ul>
                    </button>
                    <button v-else @click="dropdownShow" class="dropdown-toggle bg-blue-400 px-2 py-1 text-white font-semibold rounded-md">
                        Hi, {{ userData.name }}
                        <ul v-if="dropdown" class="dropdown-group absolute mt-2 right-5 rounded-sm w-[15%] bg-white text-black border">
                            <li class="p-1 border border-black">
                                <router-link to="profile">Profile</router-link> 
                            </li>
                            <li @click="logout" class="p-1  border-x border-black font-semibold">
                                Logout
                            </li>
                            <li class="p-1 border border-black">
                                <router-link to="create-resto" >Create Your Resto</router-link>
                            </li>
                        </ul>
                    </button>
                </div>
                <div v-else>
                    <router-link to="/" >Login</router-link>
                </div>
            </div>
        </div>

</template>