<template>
  <template v-if="Object.keys(info).length === 0">
    <n-skeleton height="300px" width="100%" :sharp="false" />
  </template>
  <template v-else>
    <n-divider title-placement="left">
      Lore
    </n-divider>
    <n-input 
      v-model:value="overview"
      placeholder="Here to type character overview"
      type="textarea"
      @change="disabled = false"
      :autosize="{
        minRows: 5,
        maxRows: 10
      }"
    />
    <n-button
      type="primary"
      class="my-2"
      :disabled="disabled"
      @click="updateOverview()"
    >Save</n-button>
    <n-divider title-placement="left">
      Information Details
    </n-divider>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
    <n-button type="primary" size="large" class="my-2" @click="showAddModal = true">
      Add New Information
    </n-button>
  </template>
  <n-modal
    v-model:show="showAddModal"
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="addNewInfo"
    @negative-click="showAddModal = false"
  >
    <template #header>
      <div class="mx-2">Add New Information</div>
    </template>
      <n-form
        ref="infoFormRef"
        label-placement="left"
        require-mark-placement="right-hanging"
        size="medium"
        label-width="auto"
        :model="newInfo"
        :rules="rules"
      >
        <n-form-item label="Name" path="name">
          <n-input v-model:value="newInfo.name" placeholder="Information Name" />
        </n-form-item>
        <n-form-item label="Description" path="description">
          <n-input 
            v-model:value="newInfo.description"
            placeholder="Information Description"
            type="textarea"
            :autosize="{
              minRows: 15,
              maxRows: 20
            }"
          />
        </n-form-item>
      </n-form>
  </n-modal>
</template>

<script setup>
import { NDivider, NDataTable, NButton, NModal, NForm, NFormItem, NInput, NSkeleton, useNotification } from "naive-ui";
import { computed, h, reactive, ref } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash-es";
const store = useStore();
const props = defineProps({
  characterID: {
    type: String,
    default: ""
  }
})
const info = computed(() => {
  if(store.state.character) { 
    return cloneDeep(store.state.character.data.killersInfo.find(item => item.id === props.characterID).info)
  }
  return {};
});
const disabled = ref(true);
const overview = ref(info.value.overview);
const showAddModal = ref(false);
const infoFormRef = ref(null);
const newInfo = reactive({
  name: "",
  description: ""
})

const rules = {
  name: {
    required: true,
    message: "Please input information name",
    trigger: "blur"
  },
  description: {
    required: true,
    message: "Please input information description",
    trigger: "blur"
  }
}

const updateOverview = () => {
  info.value["overview"] = overview.value;
  store.dispatch("character/UPDATEDATA", {
    killerID: props.characterID,
    data: {"info": info.value}
  });
  disabled.value = true;
  notify("success", "Updated Success", `Overview has updated success.`);
}

const columns = [
  {
    title: "Name",
    key: "name"
  },
  {
    title: "Value",
    key: "value",
    render (row) {
      return h(NInput, {
        value: row.value,
        onUpdateValue (v) {
          info.value[row.data_key] = v;
          store.dispatch("character/UPDATEDATA", {
            killerID: props.characterID,
            data: {"info": info.value}
          });
          notify("success", "Updated Success", `Information: ${row.data_key} has updated success.`);
        }
      })
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
          onClick: () => deleteInfo(row)
        },
        { default: () => "Delete" }
      );
    }
  }
];

const formatKey = key => {
    if(key.toUpperCase() === "DLC") return key.toUpperCase();
    key = key.replace(/([A-Z])/g, " $1").trim();
    return key.charAt(0).toUpperCase() + key.slice(1);
};

const data = computed(() => {
  const _filter = [];
  for(const [root_key, root_value] of Object.entries(info.value)){
    if(typeof(root_value) === "object"){
        Object.entries(root_value).forEach(([key, value]) => {
          _filter.push({
            name: `${formatKey(root_key)}(${key})`,
            value: value.toString(),
            data_key: root_key
          });
        });
    }
    else if(!["cover", "lore", "difficulty"].includes(root_key)){
      _filter.push({
        name: formatKey(root_key),
        value: root_value.toString(),
        data_key: root_key
      });
    }
  }
  return _filter;
});

const pagination = reactive({
  page: 1,
  pageSize: 7,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

const deleteInfo = item => { 
  delete info.value[item.data_key];
  console.log(info.value);
  store.dispatch("character/UPDATEDATA", {
    killerID: props.characterID,
    data: {"info": info.value}
  });
  notify("success", "Delete Success", `Information: ${item.data_key} has deleted success.`);
}

const addNewInfo = () => {
  infoFormRef.value?.validate((errors) => {
    if(!errors){
      info.value[newInfo.name] = newInfo.description;
      store.dispatch("character/UPDATEDATA", {
        killerID: props.characterID,
        data: {"info": info.value}
      });
      showAddModal.value = false;
      notify("success", "Build Success", `New Information: ${newInfo.name} has builded success.`);
      newInfo.name = "";
      newInfo.description = "";
    }else{
      console.log(errors);
    }
  })
}

const notification = useNotification();
const notify = (type, title, text) => {
  notification[type]({
    content: title,
    meta: text,
    duration: 2500,
    keepAliveOnHover: true
  });
}
</script>