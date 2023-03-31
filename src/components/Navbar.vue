<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useAuthRepository } from '../composables/useAuthRepository';

    const userData = JSON.parse(localStorage.getItem('user'));
    
    const repository_auth = useAuthRepository();
    const router = useRouter()
    
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        repository_auth.logout();
        router.replace({name: 'login'})
    }
    const dropdown = ref(false)

    const dropdownShow = () => {
        dropdown.value = true
    }
    const dropdownHide = () => {
        dropdown.value = false
    }
    const excerpt = (text, maxLength = 10, indicator = "...") => {
        let textCopy = text;
        
        if (textCopy.length > maxLength) {
            textCopy = textCopy.substring(0, maxLength) + indicator;
        }
        return textCopy
    }
</script>




<template>    
        <div class="relative flex justify-between w-full bg-white p-4 mb-8 items-center border-b-[4px] border-[#1f1e1c]">
            <div>
                <h1 class="text-3xl font-semibold">Resto</h1>
            </div>
            <div class="flex justify-between items-center min-w-[18rem]" v-if="userData">
                <router-link to="/restos" class="text-[17px] hover:-translate-y-1 hover:shadow-[0px_3px_1px_rgba(0,0,0,.3)] hover:shad duration-150 px-2 py-1 ">Home</router-link>
                <router-link to="/about" class="text-[17px] hover:-translate-y-1 hover:shadow-[0px_3px_1px_rgba(0,0,0,.3)] hover:shad duration-150 px-2 py-1 ">About</router-link>
                    <button v-if="dropdown" @click="dropdownHide" class="dropdown-toggle bg-white border-2 border-black shadow-[0px_0px_1px_3px_rgba(221,229,182,1)] scale-105 transition-all duration-300 px-2 py-1 active:scale-95 text-black font-semibold rounded-md flex justify-center translate-z-0 backface-hidden">
                        Hi, {{ excerpt(userData.name, 10) }}
                        <ul v-if="dropdown" class="dropdown-group absolute rounded-sm min-w-[15%] bg-white text-black border mt-10">
                            <li class="p-1 border border-black">
                                <router-link to="/profile">Profile</router-link>
                            </li>
                            <li @click="logout" class="p-1  border-x border-black font-semibold">
                                Logout
                            </li>
                            <li class="p-1 border border-black">
                                <router-link to="/create-resto" >Create Your Resto</router-link>
                            </li>
                        </ul>
                    </button>
                    <button v-else @click="dropdownShow" class="dropdown-toggle bg-white border-2 border-black shadow-[1.9px_3px_0px_2px_rgba(221,229,182,1)] hover:shadow-[0px_0px_1px_3px_rgba(221,229,182,1)] hover:scale-105 transition-all duration-300 px-2 py-1 text-black font-semibold rounded-md flex justify-center translate-z-0 backface-hidden">
                        Hi, {{ excerpt(userData.name, 10) }}
                    </button>
                </div>
            <div class="flex justify-between items-center min-w-[17rem]" v-else>
                <router-link to="/restos" class="text-[17px] hover:-translate-y-1 hover:shadow-[0px_3px_1px_rgba(0,0,0,.3)] hover:shad duration-150 px-2 py-1 ">Home</router-link>
                <router-link to="/about" class="text-[17px] hover:-translate-y-1 hover:shadow-[0px_3px_1px_rgba(0,0,0,.3)] hover:shad duration-150 px-2 py-1 ">About</router-link>
                <router-link to="/" >Sign In</router-link>
                <router-link to="/register" >Sign Up</router-link>
            </div>
        </div>

</template>