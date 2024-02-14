<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="false"
    :bordered="false"
  />
  <n-button size="large" class="my-2" v-if="isAddPerks" @click="appendNewPerk">
    Add New Self Perk
  </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="handleValidatePerkForm"
    @negative-click="onNegativeClick"
  >
    <template #header>
      <div class="mx-2">Edit Perk</div>
    </template>
      <n-form
        ref="perkFormRef"
        label-placement="left"
        require-mark-placement="right-hanging"
        size="medium"
        label-width="auto"
        :model="choosePerk"
        :rules="rules"
      >
        <n-form-item label="Name" path="name">
          <n-input v-model:value="choosePerk.name" placeholder="Perk Name" />
        </n-form-item>
        <n-form-item label="Description" path="description">
          <n-input 
            v-model:value="choosePerk.description"
            placeholder="Perk Description"
            type="textarea"
            :autosize="{
              minRows: 15,
              maxRows: 20
            }"
          />
        </n-form-item>
      </n-form>
  </n-modal>
  <n-modal
    v-model:show="showAddModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="addNewPerkForm"
    @negative-click="onNegativeClick"
  >
    <template #header>
      <div class="mx-2">Add New Perk</div>
    </template>
    <n-form
      ref="addPerkFormRef"
      label-placement="left"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      :model="newPerk"
      :rules="rules"
    >
      <n-form-item label="Name" path="name">
        <n-input v-model:value="newPerk.name" placeholder="Perk Name" />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input 
          v-model:value="newPerk.description"
          placeholder="Perk Description"
          type="textarea"
          :autosize="{
            minRows: 15,
            maxRows: 20
          }"
        />
      </n-form-item>
      <n-form-item label="Image" path="image">
        <n-upload
          list-type="image-card"
          @change="uploadImg"
        >
          Upload Image
        </n-upload>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup>
import { NDataTable, NButton, NModal, NInput, NForm, NFormItem, NUpload } from "naive-ui";
import { h, computed, ref } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash-es";
const props = defineProps({
  characterID: {
    type: String,
    default: ""
  }
})
const store = useStore();
const perkFormRef = ref(null);
const addPerkFormRef = ref(null);
const showModal = ref(false);
const showAddModal = ref(false);
const choosePerk = ref({
  "name": "",
  "description": "",
});
const editPerk = id => {
  showModal.value = true;
  choosePerk.value = cloneDeep(perks.value.find(item => item.id === id));
}
const deletePerk = id => {
  store.dispatch("character/DELETEPERK", {
    characterID: props.characterID,
    perkID: id
  });
}
const handleValidatePerkForm = () => {
  perkFormRef.value?.validate((errors) => {
    if (!errors) {
      store.dispatch("character/UPDATEDATA", {
        killerID: props.characterID,
        id: choosePerk.value.id,
        option: "perk",
        data: choosePerk.value,
      });
      showModal.value = false;
    } else {
      console.log(errors);
    }
  });
}
const onNegativeClick = () => {
  console.log("Cancel");
  showModal.value = false;
}

const columns = [
  {
    title: "Name",
    key: "name"
  },
  {
    title: "Id",
    key: "id"
  },
  {
    title: "Edit",
    key: "edit",
    render(row) {
      return h(
        NButton,
        {
          type: "warning",
          strong: true,
          size: "small",
          onClick: () => editPerk(row.id)
        },
        { default: () => "Edit" }
      );
    }
  },
  {
    title: "Delete",
    key: "delete",
    render(row) {
      return h(
        NButton,
        {
          type: "error",
          strong: true,
          size: "small",
          onClick: () => deletePerk(row.id)
        },
        { default: () => "Delete" }
      );
    }
  }
];

const perks = computed(() => store.state.character ? store.state.character.data.perks : []);
const isAddPerks = computed(() => !perks.value || perks.value.length !== 3);
const data = computed(() => {
  return perks.value.map(item => {
    return {
      name: item.name,
      id: item.id
    }
  });
});

const rules = {
  description: {
    required: true,
    message: "Please input perk description",
    trigger: "blur"
  },
  name: {
    required: true,
    message: "Please input perk name",
    trigger: "blur"
  }
};

const newPerk = ref({
  name: "",
  description: "",
  type: "self",
  image: ""
})

const appendNewPerk = () => {
  showAddModal.value = true;
}

const uploadImg = item => {
  const file = item.fileList[0].file;
  const fileReader = new FileReader();
  fileReader.addEventListener("load",() => {
    newPerk.value.image = fileReader.result
  });
  fileReader.readAsDataURL(file);
  store.dispatch("perks/UPLOADDATA", file);
};

const addNewPerkForm = () => {
  addPerkFormRef.value?.validate((errors) => {
    if(!errors){
      store.dispatch("character/ADDPERK", {
        id: props.characterID, 
        data: newPerk.value
      });
      showAddModal.value = false;
    }else{
      console.log(errors);
    }
  })
};
</script>