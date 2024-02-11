<template>
    <div class="information-container relative">
        <p class="overview flex align-items-center">A relentless specimen from a distant planet, The Xenomorph is vicious, agile, and cunning.</p>
        <div class="table-container mt-5 relative">
            <p class="table-box">
                <table>
                    <tr v-for="(item, idx) in infor_data" :key="idx">
                        <td class="type">{{ item.type }}</td>
                        <td class="value">{{ item.value }}</td>
                    </tr>
                </table>
            </p>
        </div>
        <img id="img1" class="absolute w-4 h-auto right-0" :src="require('@/assets/picture/Test_Cover.png')" alt=""/>
    </div>
</template>

<script setup>
import "@/assets/scss/character/information.scss";
import { onBeforeMount, defineProps, ref } from "vue";
const props = defineProps(["character_data"]);
const character_data = ref(null);
const infor_data = ref([]);
const formatKey = key => {
    if(key.toUpperCase() === "DLC") return key.toUpperCase();
    key = key.replace(/([A-Z])/g, " $1").trim();
    return key.charAt(0).toUpperCase() + key.slice(1);
};

onBeforeMount(() => {
    character_data.value = props.character_data;
    for(const [root_key, root_value] of Object.entries(character_data.value.info)){
        if(typeof(root_value) === "object"){
            Object.entries(root_value).forEach(([key, value]) => {
                infor_data.value.push({ type: `${formatKey(root_key)}(${key})`, value });
            });
        }
        else if(!["cover", "lore", "difficulty"].includes(root_key)){
            infor_data.value.push({type: formatKey(root_key), value: root_value.toString()});
        }
    }
});
</script>