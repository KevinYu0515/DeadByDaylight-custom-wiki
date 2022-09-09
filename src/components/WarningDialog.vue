<template>
  <Dialog 
    header="Warning" 
    v-model:visible="display" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '30vw'}" :modal="true"
  >
    <p>你所作的紀錄將不會儲存，確定要退出? {{text}}</p>
    <template #footer>
    <Button label="Yes" icon="pi pi-check" @click="isdisplayStatue" class="p-button-text"/>
    <Button label="No" icon="pi pi-times" @click="isdisplayStatue" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script>
export default {
    props:["isdisplay","text"],
    data(){
        return{
            display: this.isdisplay
        }
    },
    methods:{
        isdisplayStatue(){
            this.display = !this.display
            console.log(this.display)
        }
    }
}
</script>