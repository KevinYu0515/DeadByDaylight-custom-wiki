<template>
    <div class="perks-container">
        <div class="self-perks-group" v-if="perks">
            <div class="self-perk-box" :class="{'self-perk-click': chooseItem === item}" v-for="(item, idx) in perks" :key="idx" @click="showDetails(item)">
                <img :src="item.image" alt="">
            </div>
            <button :class="{'click': chooseItem === 'perksBuild'}" @click="showDetails('perksBuild')">Perks Build</button>
        </div>
        <div class="perks-content">
            <template v-if="chooseItem !== 'perksBuild'">
                <div class="flex justify-content-start align-items-center mx-5">
                    <h1 class="self-perk-title">{{ chooseItem.name }}</h1>
                    <span class="ml-auto more-perks-link-box">
                        <img src="@/assets/icon/IconHelp.png" alt="">
                        <router-link to="/perks">More Perks</router-link>
                    </span>
                </div>
                <p class="self-perk-content mx-5">{{ chooseItem.description }}</p>
            </template>
            <template v-else>
                <div class="swiper-area">
                    <swiper
                        :observer="true"
                        :observeParents="true"
                        :slidesPerView="1"
                        :spaceBetween="30"
                        :centered-slides="true"
                        :loop="false"
                    >
                        <swiper-slide v-for="(builds, idx) in perks_builds" :key="idx">
                            <div class="build-container" v-for="(build, idx) in builds" :key="idx">
                                <div class="build-decorate">
                                    <div class="build-name-box">
                                        <p class="build-name">{{ build.name }}</p>
                                    </div>
                                </div>
                                <span class="build-box" v-for="(item, idx) in build.perks" :key="idx">
                                    <img class="w-full h-full" :src="item.image" alt="" :title="item.name">
                                    <div v-if="item.altperkname" class="alternative-perk">
                                        <img class="w-full h-full" :src="item.altperkImage" alt="" :title="item.altperkname" />
                                    </div>
                                </span>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import "@/assets/scss/character/perks.scss";
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["character_data"]);
const chooseItem = ref("perksBuild");
const perks = computed(() => store.state.character ? store.state.character.data.perks : []);
const perks_builds = computed(() => {
    const perks_builds_data = [];
    if(store.state.character){
        const tmp_build = [];
        store.state.character.data.perkBuild.forEach((build, idx) => {
            if(idx % 3 == 0){
                perks_builds_data.push(tmp_build);
                tmp_build.splice(0, tmp_build.length);
            }
            tmp_build.push({
                name: build.buildName,
                perks: build.perks.map(item => {
                    return {
                        name: item.perkname,
                        image: item.perkImage,
                        altperkname: item.altperkname,
                        altperkImage: item.altperkImage
                    }
                })
            })
        })
    }
    return perks_builds_data;
});

const showDetails = item => {
    chooseItem.value = item;
};

onBeforeMount(() => {
    store.dispatch("character/GETPERK", props.character_data.id);
    store.dispatch("character/GETPERKBUILD", props.character_data.id);
});

</script>