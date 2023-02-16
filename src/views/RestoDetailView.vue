<script setup>
    import { useRestoRepository } from '../composables/useRestoRepository';
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import BaseCard from "@/components/BaseCard.vue";
    import BaseContainer from '../components/BaseContainer.vue';

    const repository = useRestoRepository();
    const route = useRoute();

    const isLoading = ref(true);
    const detail = ref({});
    const fetchDetail = async () => {
        isLoading.value = true;

        try{
            const id = route.params.id;
            const {data} = await repository.show(id);
            detail.value = data;
        } catch(e) {
            console.error(e);
        }

        isLoading.value = false;
    };
    onMounted(() => fetchDetail());

</script>

<template>
   <BaseContainer>
        <BaseCard>
            Sedang Menampilkan resto dengan ID: {{ route.params.id }}
        </BaseCard>
   </BaseContainer>
</template>