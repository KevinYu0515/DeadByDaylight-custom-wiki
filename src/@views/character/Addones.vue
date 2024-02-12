<template>
    <div class="addones-container" v-if="addones">
        <div class="addones-group" v-for="(items, key) in addones" :key="key">
            <h3 class="addones-rarity-title">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</h3>
            <hr />
            <span class="cursor-pointer" @click="showDetails(item)" v-for="(item, idx) in items" :key="idx">
                <img class="w-1 h-auto" :src="item.image" :alt="item.name">
            </span>
        </div>
    </div>
    <Modal :open="open" @close="open = !open" v-if="chooseItem">
        <div class="addones-popup-container">
            <div class="flex align-items-center">
                <div class="img-box">
                    <img class="marker h-auto absolute" src="@/assets/picture/addones/addones-marker.png" alt="">
                    <img class="icon h-auto absolute" :src="addonesBg" alt="" />
                    <img class="icon h-auto absolute" :src="chooseItem.image" alt="">
                </div>
                <h1 :class="chooseItem.rarity.replace(' ', '')">{{ chooseItem.name }}</h1>
            </div>
            <p>{{ chooseItem.description }}</p>
        </div>
    </Modal>
</template>

<script setup>
import Modal from "@/@components/Tools/Modal.vue";
import "@/assets/scss/character/addones.scss";
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["character_data"]);
const addones = computed(() => store.state.character.data.addOnes || {});
const open = ref(false);
const chooseItem = ref(null);
const addonesBg = computed(() => {
    return new URL(`/src/assets/picture/addones/${chooseItem.value.rarity.replace(' ', '')}bg.png`, import.meta.url)
});

const showDetails = item => {
    chooseItem.value = item;
    open.value = !open.value;
};

onBeforeMount(() => {
    store.dispatch("character/GETADDONES", props.character_data.id);
});
</script>