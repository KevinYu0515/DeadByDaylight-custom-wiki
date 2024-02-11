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
                        <img :src="require('@/assets/icon/IconHelp.png')" alt="">
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
                        :loop="true"
                    >
                        <swiper-slide v-for="(builds, idx) in perks_builds" :key="idx">
                            <div class="build-container" v-for="(build, idx) in builds" :key="idx">
                                <div class="build-decorate">
                                    <div class="build-name-box">
                                        <p class="build-name">{{ build.name }}</p>
                                    </div>
                                </div>
                                <span class="build-box" v-for="(item, idx) in build.perks" :key="idx">
                                    <img :src="require('@/assets/icon/IconHelp.png')" alt="" :title="item.name">
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
import { ref, computed, defineProps, onBeforeMount } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["character_data"]);
const chooseItem = ref("perksBuild");
const character_data = ref(null);
const perks = computed(() => store.state.killers ? store.state.killers.data.perks : []);
const perks_builds = [[
    {
        "name": "Generic Build",
        "perks": [
            {
                "image": "",
                "name": "Discordance"
            },
            {
                "image": "",
                "name": "Tinkerer"
            },
            {
                "image": "",
                "name": "Eruption"
            },
            {
                "image": "",
                "name": "Pop Goes The Weasel"
            }
        ]
    },
    {
        "name": "Passive Slowdown Build",
        "perks": [
            {
                "image": "",
                "name": "Discordance"
            },
            {
                "image": "",
                "name": "Tinkerer"
            },
            {
                "image": "",
                "name": "Eruption"
            },
            {
                "image": "",
                "name": "Pop Goes The Weasel"
            }
        ]
    },
    {
        "name": "Hex Build",
        "perks": [
            {
                "image": "",
                "name": "Discordance"
            },
            {
                "image": "",
                "name": "Tinkerer"
            },
            {
                "image": "",
                "name": "Eruption"
            },
            {
                "image": "",
                "name": "Pop Goes The Weasel"
            }
        ]
    }],[
    {
        "name": "Build with Basic Perks",
        "perks": [
            {
                "image": "",
                "name": "Discordance"
            },
            {
                "image": "",
                "name": "Tinkerer"
            },
            {
                "image": "",
                "name": "Eruption"
            },
            {
                "image": "",
                "name": "Pop Goes The Weasel"
            }
        ]
    }]
];

const showDetails = item => {
    chooseItem.value = item;
};

onBeforeMount(() => {
    character_data.value = props.character_data;
    store.dispatch("killers/GETPERK", character_data.value.id);
});

</script>