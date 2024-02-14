<template>
  <div>
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="state"
      :rules="rules"
      :size="size"
    >
      <n-form-item label="Rank" path="info.rank">
        <n-dropdown
          trigger="click"
          :options="newLevelOptions"
          @select="handleSelect_level"
        >
          <n-button type="tertiary">{{ selectedLevel }}</n-button>
        </n-dropdown>
      </n-form-item>
      <n-form-item label="Difficulty" path="info.difficulty">
        <n-dropdown
          trigger="click"
          :options="newDrOptions"
          @select="handleSelect_difficulty"
        >
          <n-button type="tertiary">{{ selectedDifficulty }}</n-button>
        </n-dropdown>
      </n-form-item>
      <n-form-item label="Name" path="info.name">
        <n-input placeholder="Character Name" v-model:value="state.info.name"/>
      </n-form-item>
      <n-form-item label="cover" path="info.cover">
        <n-upload
          list-type="image-card"
          @change="uploadCover"
        >
          Upload Cover
        </n-upload>
      </n-form-item>
      <n-form-item>
        <n-button type="tertiary" @click="handleValidateClick">Submit</n-button>
      </n-form-item>
    </n-form>
    <n-button type="tertiary" @click="backToKiller">Back</n-button>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NButton, NInput, NDropdown, NUpload } from "naive-ui";
import { ref, reactive, computed } from "vue";
import { Timestamp } from "@firebase/firestore";
import { useStore } from "vuex";

defineProps(["drOptions", "levelOptions"]);
const emit = defineEmits(["addKiller", "onUpload", "backToKiller"]);
const store = useStore();
const formRef = ref(null);
const size = ref("medium");
const submitted = ref(false);
const selectedLevel = ref("ALL");
const selectedDifficulty = ref("Easy");
const newLevelOptions = computed(() => {
  return store.state.character.levelOptions.map(item => ({
    "label": item.level,
    "key": item.level
  }));
});

const newDrOptions = computed(() => {
  return store.state.character.drOptions.map(item => ({
    "label": item.dr,
    "key": item.dr
  }));
});

const state = reactive({
  build: "",
  info: {
    name: "",
    rank: "",
    difficulty: "",
    cover: "",
    lore: "",
    height: "",
    movementSpeed: {
      normal: ""
    },
    terrorRadius: {
      normal: ""
    },
    power: "",
    weapon: ""
  }
});
const rules = {
  info: {
    rank: {
      required: true,
      message: "Please choose the rank",
      trigger: "blur"
    },
    name: {
      required: true,
      message: "Please input your name",
      trigger: "blur"
    },
    difficulty: {
      required: true,
      message: "Please choose the difficulty",
      trigger: "blur"
    }
  }
};

const handleSelect_level = key => {
  selectedLevel.value = key;
  state.info.rank = key;
};

const handleSelect_difficulty = key => {
  selectedDifficulty.value = key;
  state.info.difficulty = key;
};

const handleValidateClick = e => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      submitted.value = true;
      state.build = Timestamp.fromDate(new Date());
      console.log(state.build);
      emit("addKiller", state);
      clearData();
      console.log("success");
    } else {
      console.log("error", errors);
    }
  });
}

const uploadCover = item => {
  console.log(item);
  const file = item.fileList[0].file;
  const fileReader = new FileReader();
  fileReader.addEventListener("load",() => {
    state.info.cover = fileReader.result
  });
  fileReader.readAsDataURL(file);
  emit("onUpload", file);
};

const clearData = () => {
  state.name = "";
  state.difficulty = "";
  state.cover = "";
  state.rank = "";
};

const backToKiller = () => {
  emit("backToKiller", false);
};
</script>