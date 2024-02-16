<template>
  <template v-if="perks[0] === null">
    <n-skeleton height="300px" width="100%" :sharp="false" />
  </template>
  <template v-else>
    <n-divider title-placement="left">
      Unique Perks
    </n-divider>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="false"
      :bordered="false"
    />
    <n-button size="large" class="mt-2" v-if="isAddPerks" @click="showAddModal = true;">
      Add New Self Perk
    </n-button>
    <n-divider title-placement="left">
      Perk Build
    </n-divider>
    <n-data-table
      :columns="buildcolumns"
      :data="builddata"
      :pagination="false"
      :bordered="false"
      class="mt-2"
    />
    <n-button size="large" class="mt-2" @click="showAddNewPerkBuildModal = true">
      Add New Perk Build
    </n-button>
  </template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="handleValidatePerkForm"
    @negative-click="showModal = false;"
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
    @negative-click="showModal = false;"
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
  <n-modal
    v-model:show="showAddNewPerkBuildModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="addNewPerkBuildForm"
    @negative-click="showAddNewPerkBuildModal = false"
  >
    <template #header>
      <div class="mx-2">Add New Perk Build</div>
    </template>
    <n-form
      ref="addPerkBuildFormRef"
      label-placement="top"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      :model="newPerkBuild"
      :rules="buildrules"
    >
      <n-grid :span="24" :x-gap="10">
        <n-form-item-gi :span="24" label="Build Name" path="buildName">
          <n-input v-model:value="newPerkBuild.buildName" placeholder="Perk Build Name" />
        </n-form-item-gi>
        <template v-for="idx in 4" :key="idx">
          <n-form-item-gi :span="24" :label="`[ Need Alternative Perk ${idx} ]`" path="switchValue">
            <n-switch v-model:value="switchValue[idx]" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" :label="`Perk ${idx}`" :path="`perks[${idx - 1}].perkname`">
            <n-input v-model:value="newPerkBuild.perks[idx - 1].perkname" :placeholder="`Perk ${idx} Name`" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" :label="`Perk ${idx} Image`" :path="`perks[${idx - 1}].perkImage`">
            <n-upload
              list-type="image-card"
              @finish="uploadBuildImg"
              @change="uploadBuildType(0, idx - 1)"
            >
              Upload Image
            </n-upload>
          </n-form-item-gi>
          <n-form-item-gi :span="12" v-if="switchValue[idx]" :label="`Alternative Perk ${idx}`" :path="`perks[${idx - 1}].altperkname`">
            <n-input v-model:value="newPerkBuild.perks[idx - 1].altperkname" :placeholder="`Perk ${idx} Name`" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" v-if="switchValue[idx]" :label="`Alternative Perk ${idx} Image`" :path="`perks[${idx - 1}].altperkImage`">
            <n-upload
              list-type="image-card"
              @finish="uploadBuildImg"
              @change="uploadBuildType(1, idx - 1)"
            >
              Upload Image
            </n-upload>
          </n-form-item-gi>
        </template>
      </n-grid>
    </n-form>
  </n-modal>
  <n-modal
    v-model:show="showEditPerkBuildModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="editPerkBuildForm"
    @negative-click="showEditPerkBuildModal = false"
  >
    <template #header>
      <div class="mx-2">Edit Perk Build</div>
    </template>
    <n-form
      ref="editPerkBuildFormRef"
      label-placement="top"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      :model="choosePerkBuild"
      :rules="buildrules"
    >
      <n-grid :span="24" :x-gap="10">
        <n-form-item-gi :span="24" label="Build Name" path="buildName">
          <n-input v-model:value="choosePerkBuild.buildName" placeholder="Perk Build Name" />
        </n-form-item-gi>
        <template v-for="idx in 4" :key="idx">
          <n-form-item-gi :span="24" :label="`[ Need Alternative Perk ${idx} ]`" path="switchValue">
            <n-switch v-model:value="switchValue[idx]" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" :label="`Perk ${idx}`" :path="`perks[${idx - 1}].perkname`">
            <n-input v-model:value="choosePerkBuild.perks[idx - 1].perkname" :placeholder="`Perk ${idx} Name`" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" :label="`Perk ${idx} Image`" :path="`perks[${idx - 1}].perkImage`">
            <n-upload
              :default-file-list="fileList[idx - 1]"
              list-type="image-card"
              @finish="uploadBuildImg"
              @change="uploadBuildType(0, idx - 1)"
            >
              Upload Image
            </n-upload>
          </n-form-item-gi>
          <n-form-item-gi :span="12" v-if="switchValue[idx]" :label="`Alternative Perk ${idx}`" :path="`perks[${idx - 1}].altperkname`">
            <n-input v-model:value="choosePerkBuild.perks[idx - 1].altperkname" :placeholder="`Perk ${idx} Name`" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" v-if="switchValue[idx]" :label="`Alternative Perk ${idx} Image`" :path="`perks[${idx - 1}].altperkImage`">
            <n-upload
              :default-file-list="altfileList[idx - 1]"
              list-type="image-card"
              @finish="uploadBuildImg"
              @change="uploadBuildType(1, idx - 1)"
            >
              Upload Image
            </n-upload>
          </n-form-item-gi>
        </template>
      </n-grid>
    </n-form>
  </n-modal>
</template>

<script setup>
import { NDivider, NDataTable, NButton, NModal, NInput, NForm, NFormItem, NUpload, NSkeleton, NSwitch, NGrid, NFormItemGi, useNotification } from "naive-ui";
import { h, computed, ref, onUpdated } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash-es";
const props = defineProps({
  characterID: {
    type: String,
    default: ""
  }
})
const notification = useNotification();
const store = useStore();
const perkFormRef = ref(null);
const addPerkFormRef = ref(null);
const addPerkBuildFormRef = ref(null);
const showModal = ref(false);
const showAddModal = ref(false);
const showAddNewPerkBuildModal = ref(false);
const showEditPerkBuildModal = ref(false);
const editPerkBuildFormRef = ref(null);
const switchValue = ref([false, false, false, false]);
const choosePerk = ref({
  "name": "",
  "description": "",
});
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

const buildcolumns = [
  {
    title: "Build Name",
    key: "buildname",
    rowSpan: (rowData, rowIndex) => (rowIndex % 4 === 0 ? 4 : 1)
  },
  {
    title: "Perk Name",
    key: "perkname"
  },
  {
    title: "Alternative Perk Name",
    key: "altperkname"
  },
  {
    title: "Edit",
    key: "edit",
    rowSpan: (rowData, rowIndex) => (rowIndex % 4 === 0 ? 4 : 1),
    render(row) {
      return h(
        NButton,
        {
          type: "warning",
          strong: true,
          size: "small",
          onClick: () => editPerkBuild(row)
        },
        { default: () => "Edit" }
      );
    }
  },
  {
    title: "Delete",
    key: "delete",
    rowSpan: (rowData, rowIndex) => (rowIndex % 4 === 0 ? 4 : 1),
    render(row) {
      return h(
        NButton,
        {
          type: "error",
          strong: true,
          size: "small",
          onClick: () => deletePerkBuild(row)
        },
        { default: () => "Delete" }
      );
    }
  }
]

const fileList = ref([])
const altfileList = ref([])

const editPerkBuild = item => {
  fileList.value = [];
  altfileList.value = [];
  choosePerkBuild.value = cloneDeep(store.state.character.data.perkBuild.find(perkBuild => perkBuild.buildName === item.buildname));
  choosePerkBuild.value.perks.forEach((perk, index) => {
    if(perk.perkImage.length){
      fileList.value.push([{
        id: `${index}-a`,
        status: "finished",
        url: perk.perkImage
      }])
    }else fileList.value.push([])
    if(perk.altperkImage.length){
      altfileList.value.push([{
        id: `${index}-b`,
        status: "finished",
        url: perk.altperkImage
      }])
    }else altfileList.value.push([])
  })
  showEditPerkBuildModal.value = true;
}

const addNewPerkBuildForm = () => {
  addPerkBuildFormRef.value?.validate((errors) => {
    if(!errors){
      store.dispatch("character/ADDPERKBUILD", {
        id: props.characterID, 
        data: newPerkBuild.value
      });
      showAddNewPerkBuildModal.value = false;
      notify("success", "Build Success", `Perk Build ${newPerkBuild.value.buildName} has builded success.`);
    }else{
      console.log(errors);
      showAddNewPerkBuildModal.value = true;
    }
  })
}

const builddata = computed(() => {
  const newData = [];
  store.state.character.data.perkBuild.forEach((items, idx1) => {
    items.perks.forEach((item, idx2) => {
      newData.push({
        key: `${idx1}-${idx2}`,
        id: items.id,
        buildname: items.buildName,
        perkname: item.perkname,
        altperkname: item.altperkname || "null"
      })
    })
  })
  return newData;
})

const newPerkBuild = ref({
  buildName: "",
  perks: [
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    },
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    },
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    },
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    }
  ]
})

const choosePerkBuild = ref({
  buildName: "",
  perks: [
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    },
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    },
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    },
    {
      perkname: "",
      perkImage: "",
      altperkname: "",
      altperkImage: "" 
    }
  ]
})

const buildrules = ref({
  buildName: {
    required: true,
    message: "Please input perk build name",
    trigger: "blur"
  },
  perks: [
    {
      perkname: {
        required: true,
        message: "Please input first perk name",
        trigger: "blur"
      }, 
    },
    {
      perkname: {
        required: true,
        message: "Please input second perk name",
        trigger: "blur"
      }, 
    },
    {
      perkname: {
        required: true,
        message: "Please input third perk name",
        trigger: "blur"
      }, 
    },
    {
      perkname: {
        required: true,
        message: "Please input forth perk name",
        trigger: "blur"
      }, 
    }
  ]
})

const perks = computed(() => {
  return store.state.character ? store.state.character.data.perks : [null]
});
const isAddPerks = computed(() => !perks.value || perks.value.length !== 3);
const data = computed(() => {
  return perks.value.map(item => {
    return {
      name: item.name,
      id: item.id
    }
  });
});

onUpdated(() => {
  console.log("perk Updated");
})

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

const uploadImg = item => {
  const file = item.fileList[0].file;
  const fileReader = new FileReader();
  fileReader.addEventListener("load",() => {
    newPerk.value.image = fileReader.result
  });
  fileReader.readAsDataURL(file);
  store.dispatch("perks/UPLOADDATA", file);
};

const perkBuild_type = ref(0);
const perkBuild_idx = ref(0);
const uploadBuildType = (type, idx) => {
  perkBuild_type.value = type;
  perkBuild_idx.value = idx;
}

const uploadBuildImg = item => {
  const file = item.fileList[0].file;
  const fileReader = new FileReader();
  fileReader.addEventListener("load",() => {
    if(perkBuild_type.value == 0) newPerkBuild.value.perks[perkBuild_idx.value].perkImage = fileReader.result;
    if(perkBuild_type.value == 1) newPerkBuild.value.perks[perkBuild_idx.value].altperkImage = fileReader.result;
  });
  fileReader.readAsDataURL(file);
};

const addNewPerkForm = () => {
  addPerkFormRef.value?.validate((errors) => {
    if(!errors){
      store.dispatch("character/ADDPERK", {
        id: props.characterID, 
        data: newPerk.value
      });
      showAddModal.value = false;
      notify("success", "Build Success", `Perk ${newPerk.value.name} has builded success.`);
    }else{
      console.log(errors);
    }
  })
};

const editPerk = id => {
  showModal.value = true;
  choosePerk.value = cloneDeep(perks.value.find(item => item.id === id));
}
const deletePerk = id => {
  store.dispatch("character/DELETEPERK", {
    characterID: props.characterID,
    perkID: id
  });
  notify("success", "Delete Success", `Perk ${choosePerk.value.name} has delete success.`);
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
      notify("success", "Update Success", `Perk ${choosePerk.value.name} has updated success.`);
    } else {
      console.log(errors);
    }
  });
}

const notify = (type, title, text) => {
  notification[type]({
    content: title,
    meta: text,
    duration: 2500,
    keepAliveOnHover: true
  });
}

const editPerkBuildForm = () => {
  console.log(choosePerkBuild.value);
  editPerkBuildFormRef.value?.validate((errors) => {
    if(!errors){
      store.dispatch("character/UPDATEDATA", {
        killerID: props.characterID,
        id: choosePerkBuild.value.id,
        option: "perkBuild", 
        data: choosePerkBuild.value
      });
      showEditPerkBuildModal.value = false;
      notify("success", "Build Success", `Perk Build ${choosePerkBuild.value.buildName} has builded success.`);
    }else{
      console.log(errors);
      showEditPerkBuildModal.value = true;
    }
  })
}

const deletePerkBuild = item => {
  store.dispatch("character/DELETEPERKBUILD", {
    characterID: props.characterID,
    perkBuildID: item.id
  })
  notify("success", "Delete Success", `Perk Build ${item.buildname} has deleted success.`);
}
</script>