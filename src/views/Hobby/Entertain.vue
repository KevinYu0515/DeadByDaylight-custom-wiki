<template>
  <div class="entertain">
    <div class="container">
      <select type="text" class="selectStyle" v-model="input.style">
        <option v-for="style in 5" :key="style">
          {{ styleOptions[style - 1] }}
        </option>
      </select>
      <input
        type="text"
        class="inputKiller"
        placeholder="殺手名稱"
        v-model.trim="input.name"
        @keyup.enter="inputHandler"
      />
      <button
        v-for="button in 2"
        :key="button"
        type="button"
        class="btn btn-outline-warning"
        style="margin-left: 10px"
        @click="button == 1 ? submitHandler() : cancelHandler()"
      >
        {{ buttons[button - 1] }}
      </button>
      <div class="row">
        <div class="col-sm-6" v-for="(item, index) in nameGroup" :key="index">
          <div class="DBD-card">
            <div class="main">
              <img
                class="killer"
                :src="require(`@/assets/picture/killer/${item.killer}.png`)"
              />
            </div>
            <div class="name">{{ item.name }}</div>
            <button
              type="button"
              class="btn btn-outline-danger delete"
              @click="deleteHandler(item)"
            >
              {{buttons[2]}}
            </button>
            <div class="skills">
              <img
                v-for="(skill, index) in item.skills"
                :key="index"
                class="skills-icon"
                :src="require(`@/assets/icon/skills/${skill}.png`)"
                :title="`${item.skills[index]}`"
              />
            </div>
            <div class="weapon">{{ item.weapon }}</div>
            <div class="power">{{ item.power }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Entertain",
  data() {
    return {
      input: {
        style: "全部",
        name: "",
        killer: "001",
        sub_name: ["無"],
        skills: ["未知", "未知", "未知"],
        weapon: "未知",
        power: "未知",
      },
      killerGroup: [],
      buttons: ["Add", "Cancel", "Delete"],
      styleOptions: ["全部", "追獵型", "守屍型", "暗殺型", "控場型"],
    };
  },
  computed: {
    styleGroup() {
      if (this.input.style !== "全部") {
        return this.killerGroup.filter((item) => {
          return item.style == this.input.style;
        });
      } else {
        return this.killerGroup;
      }
    },
    nameGroup() {
      if (this.input.name) {
        return this.killerGroup.filter((item) => {
          let name = item.name.toLowerCase();
          let keyword = this.input.name.toLowerCase();
          return name.indexOf(keyword) !== -1;
        });
      } else {
        return this.styleGroup;
      }
    },
  },
  mounted() {
    this.axios
      .get("http://localhost:1020/killerGroup")
      .then((res) => {
        this.killerGroup = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    submitHandler() {
      let { style, name } = this.input;
      if (!style || !name) return;
      this.axios
        .post("http://localhost:1020/killerGroup", this.input)
        .then((res) => {
          this.killerGroup.push(res.data);
          this.cancelHandler();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelHandler() {
      this.input.name = "";
    },
    deleteHandler(item) {
      let target = item;
      if (confirm(`Do you want to remove ${target.name} ?`)) {
        this.axios
          .delete("http://localhost:1020/killerGroup/" + target.id)
          .then((res) => {
            this.killerGroup.splice(target.id - 1, 1);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/hobby/entertain.scss";
</style>
