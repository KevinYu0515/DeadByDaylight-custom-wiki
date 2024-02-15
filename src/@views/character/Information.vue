<template>
    <div class="information-container relative">
        <p class="overview flex align-items-start">Overview<br/>{{ overview }}</p>
        <div class="table-container mt-2 relative">
            <p class="table-box">
                <table>
                    <tr v-for="(item, idx) in info_data" :key="idx">
                        <td class="type">{{ item.type }}</td>
                        <td class="value">{{ item.value }}</td>
                    </tr>
                </table>
            </p>
        </div>
        <img id="img1" class="absolute w-4 h-auto right-0" src="@/assets/picture/Test_Cover.png" alt=""/>
    </div>
</template>

<script setup>
import "@/assets/scss/character/information.scss";
import { onBeforeMount, ref } from "vue";
const props = defineProps(["character_data"]);
const info_data = ref([]);
const overview = ref(null);
const formatKey = key => {
    if(key.toUpperCase() === "DLC") return key.toUpperCase();
    key = key.replace(/([A-Z])/g, " $1").trim();
    return key.charAt(0).toUpperCase() + key.slice(1);
};

onBeforeMount(() => {
    for(const [root_key, root_value] of Object.entries(props.character_data.info)){
        if(typeof(root_value) === "object"){
            Object.entries(root_value).forEach(([key, value]) => {
                info_data.value.push({ type: `${formatKey(root_key)}(${key})`, value });
            });
        }
        else if(root_key.toLowerCase() === "overview") overview.value = root_value.toString();
        else if(!["cover", "lore", "difficulty"].includes(root_key)){
            info_data.value.push({type: formatKey(root_key), value: root_value.toString()});
        }
    }
});
</script>