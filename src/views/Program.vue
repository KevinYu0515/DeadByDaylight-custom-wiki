<template>
  <div class="program">
    <button @click="isOpen = true">Show Modal</button>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
      <img :src="require('@/assets/picture/bg-1.jpg')" />
    </Modal>

    <div class="comment">
      <label>用戶名：</label><br />
      <input type="text" placeholder="用戶名" v-model.trim="uname" /><br />
      <label>吐槽內容：</label><br />
      <textarea
        rows="2"
        cols="23"
        placeholder="吐槽內容"
        v-model.trim="tarea"
      ></textarea
      ><br />
      <button class="send" @click="sendCont()">發表</button>
      <hr />
      <h3>吐槽回復：</h3>
      <div class="cont" v-for="val in list" :key="val.name">
        <div>
          <p>{{ val.name }}</p>
          <span>說:</span>
          <p>{{ val.item }}</p>
          <p class="del" @click="delCont(val)">刪除</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import { ref } from "vue";
export default {
  components: {
    Modal,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
  data() {
    return {
      list: [
        { name: "beibei", item: "媽媽,我想吃烤紅薯" },
        { name: "dian", item: "吃,吃大塊的" },
      ],
      uname: "",
      tarea: "",
    };
  },
  methods: {
    sendCont() {
      var item = { name: this.uname, item: this.tarea };
      this.list.unshift(item);
      this.uname = "";
      this.tarea = "";
    },
    delCont(val) {
      alert("確定刪除？");
      var ind = this.list.findIndex((value) => value.item === val.item);
      this.list.splice(ind, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/program/program.scss";
</style>
