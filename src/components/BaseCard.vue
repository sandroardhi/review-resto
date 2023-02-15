<script setup>
    import { defineProps } from 'vue';
    import { RouterLink } from 'vue-router';
    import BaseCardTitle from './BaseCardTitle.vue';
    import BaseCardBody from './BaseCardBody.vue';

    defineProps({
        to: {
            type: Object,
            default: undefined,
        }
    })
</script>

<template>
    <router-link 
    v-if="to"
    :to="to"
    class="block bg-white shadow p-4 rounded select-none"
    >
        <BaseCardTitle v-if="!!$slots.title">
            <slot name="title"/>
        </BaseCardTitle>
        <BaseCardBody>
            <slot/>
        </BaseCardBody>
    </router-link>
    
    <div v-else class="block bg-white shadow p-4 rounded select-none">
        <BaseCardTitle v-if="!!$slots.title">
          <slot name="title" />
        </BaseCardTitle>
    
        <BaseCardBody>
          <slot />
        </BaseCardBody>
    </div>
</template>

