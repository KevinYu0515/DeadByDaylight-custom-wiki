<template>
    <div class="lore-container relative">
        <i v-show="isScrollToBottom" class="more-icon">▼</i>
        <img class="w-6 h-auto" src="@/assets/picture/default_record_background.png" alt="character-lore-poster" align="right"/>
        <p class="lore-main-content">
            {{ lore }}
        </p>
    </div>
</template>

<script setup>
import "@/assets/scss/character/lore.scss";
import { ref, onBeforeMount, onMounted } from "vue";
const props = defineProps(["character_data"]);
const lore = ref(""); 
const isScrollToBottom = ref(false);

onBeforeMount(() => {
    lore.value = props.character_data.info.lore;
});

onMounted(() => {
    const container = document.querySelector(".lore-container");
    const top = container.offsetHeight - 100;
    const side = container.offsetWidth / 2;
    const moreicon = document.querySelector(".more-icon");
    isScrollToBottom.value = parseInt(container.scrollTop + container.clientHeight) !== container.scrollHeight;
    container.addEventListener("scroll", () => {
        isScrollToBottom.value = parseInt(container.scrollTop + container.clientHeight) !== container.scrollHeight;
    });
    moreicon.style.setProperty("margin", `${top}px ${side}px 0 ${side}px`);
});
</script>