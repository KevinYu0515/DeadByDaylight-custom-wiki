<template>
  <template v-if="addones.length === 0">
    <n-skeleton height="300px" width="100%" :sharp="false" />
  </template>
  <template v-else>
    <template v-for="(item, idx) in items" :key="idx">
      <n-data-table
        :columns="item.columns"
        :data="item.data"
      />
      <n-button @click="showNewAddOnesForm(item.rarity)" class="my-2">Add More {{ item.rarity }} Addones</n-button>
    </template>
  </template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="handleValidateAddOnesForm"
    @negative-click="showModal = false"
  >
    <template #header>
      <div class="mx-2">Edit AddOnes</div>
    </template>
      <n-form
        ref="editAddOnesFormRef"
        label-placement="left"
        require-mark-placement="right-hanging"
        size="medium"
        label-width="auto"
        :model="chooseAddOnes"
        :rules="rules"
      >
        <n-form-item label="Name" path="name">
          <n-input v-model:value="chooseAddOnes.name" placeholder="AddOnes Name" />
        </n-form-item>
        <n-form-item label="Description" path="description">
          <n-input 
            v-model:value="chooseAddOnes.description"
            placeholder="AddOnes Description"
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
    @positive-click="addNewAddOnesForm"
    @negative-click="showAddModal = false"
  >
    <template #header>
      <div class="mx-2">Add New AddOnes</div>
    </template>
    <n-form
      ref="addAddOnesFormRef"
      label-placement="left"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      :model="newAddOnes"
      :rules="rules"
    >
      <n-form-item label="Name" path="name">
        <n-input v-model:value="newAddOnes.name" placeholder="AddOnes Name" />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input 
          v-model:value="newAddOnes.description"
          placeholder="AddOnes Description"
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
import store from '@/vuex/store';
import { NDataTable, NButton, NModal, NForm, NFormItem, NUpload, NInput, NSkeleton } from 'naive-ui';
import { computed, ref, h } from "vue";
import { cloneDeep } from 'lodash-es';

const props = defineProps({
  characterID: {
    type: String,
    default: ""
  }
})
const showModal = ref(false);
const showAddModal = ref(false);
const editAddOnesFormRef = ref(null);
const addAddOnesFormRef = ref(null);
const addones = computed(() => store.state.character ? cloneDeep(store.state.character.data.addOnes) : []);
const items = computed(() => {
  const _filter = [];
  for(const [key, value] of Object.entries(addones.value)){
    _filter.push(
      {
        rarity: key,
        columns: [
          {
            title: "Name",
            key: "name"
          },
          {
            title: "Rarity",
            key: "rarity",
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
                  onClick: () => editAddOnes(row)
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
                  onClick: () => deleteAddones(row.id)
                },
                { default: () => "Delete" }
              );
            }
          }
        ],
        data: value.map(item => {
                return {
                  name: item.name,
                  id: item.id,
                  description: item.description,
                  rarity: item.rarity
                }
              })
      }
    )
  }
  return _filter;
})

const chooseAddOnes = ref({
  name: "",
  description: "",
})

const newAddOnes = ref({
  name: "",
  description: "",
  image: "",
  rarity: ""
})

const rules = {
  description: {
    required: true,
    message: "Please input addones description",
    trigger: "blur"
  },
  name: {
    required: true,
    message: "Please input addones name",
    trigger: "blur"
  }
};

const editAddOnes = item => {
  showModal.value = true;
  chooseAddOnes.value = cloneDeep(addones.value[item.rarity].find(addone => addone.id === item.id));
}
const deleteAddones = id => {
  store.dispatch("character/DELETEADDONES", {
    characterID: props.characterID,
    addonesID: id
  });
}

const handleValidateAddOnesForm = () => {
  editAddOnesFormRef.value?.validate((errors) => {
    if (!errors) {
      store.dispatch("character/UPDATEDATA", {
        killerID: props.characterID,
        id: chooseAddOnes.value.id,
        option: "addOnes",
        data: chooseAddOnes.value,
      });
      showModal.value = false;
    } else {
      console.log(errors);
      showModal.value = true;
    }
  });
}

const showNewAddOnesForm = rarity => {
  newAddOnes.value.rarity = rarity;
  showAddModal.value = true;
}

const addNewAddOnesForm = () => {
  addAddOnesFormRef.value?.validate((errors) => {
    if(!errors){
      store.dispatch("character/ADDADDONES", {
        id: props.characterID, 
        data: newAddOnes.value
      });
      showAddModal.value = false;
    }else{
      console.log(errors);
    }
  })
}

const uploadImg = item => {
  const file = item.fileList[0].file;
  const fileReader = new FileReader();
  fileReader.addEventListener("load",() => {
    newAddOnes.value.image = fileReader.result
  });
  fileReader.readAsDataURL(file);
};
</script>