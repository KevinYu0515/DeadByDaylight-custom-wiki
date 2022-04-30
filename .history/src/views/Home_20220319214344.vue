<template>
  <section id="home">
        <div class="home_firstparagh">
            <div class="photo_bgright"></div>
            <div id="content">
                <h1>Hi I'm<br><span>Kevin LIN</span></h1>
                <p>I wouldn't care success or failure, for I will only struggle ahead as long as I have been destined to the distance. 
                    I wouldn't care the difficulties around, for what I can leave on the earth is only their view of my back since 
                    I have been marching toward the horizontal.</p>
                <div @click= "jump('about')" class="btn">Read more</div>
            </div>
            <img class="picture" src="../assets\picture\bg-1.jpg">
        </div>
        <div class="home_secondparagh">
            <div class="photo_bgleft"></div>
            <img class="picture" src="../assets\picture\bg-2.jpg">
            <div id="content">
                <div id ="container">
                    <h1>My Coding Travel</h1>
                    <div v-on:click= "jump('program')" class="btn">Read more</div>
                </div>
                    <p>Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.
                        Why do we never have time to do it right, but always have time to do it over?</p>
                <div class="box_container">
                    <div class="box">
                        <div class="percent">
                            <svg id="circle1">
                                <circle cx="60" cy="60" r="60"></circle>
                                <circle cx="60" cy="60" r="60"></circle>
                            </svg>
                            <div class="number">
                                <h2>33<span>%</span></h2>
                            </div>
                        </div>
                        <h2 class="text">Algorithm</h2>
                    </div>
                    <div class="box">
                        <div class="percent">
                            <svg id="circle2">
                                <circle cx="60" cy="60" r="60"></circle>
                                <circle cx="60" cy="60" r="60"></circle>
                            </svg>
                            <div class="number">
                                <h2>20<span>%</span></h2>
                            </div>
                        </div>
                        <h2 class="text">APP & Web</h2>
                    </div>
                    <div class="box">
                        <div class="percent">
                            <svg id="circle3">
                                <circle cx="60" cy="60" r="60"></circle>
                                <circle cx="60" cy="60" r="60"></circle>
                            </svg>
                            <div class="number">
                                <h2>47<span>%</span></h2>
                            </div>
                        </div>
                        <h2 class="text">Robot</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="home_thirdparagh">
            <div class="card">
                <div class="icon">
                    <img src="../assets\icon\icon1.png">
                </div>
                <div class="content">
                    <h3>Game Codex</h3>
                    <p>Playing the gmae is one of my recreation,especially playing on PC. PC gmae can give me more exciting and surprised than mobile game during the playing time.
                        In many kinds of video games, what my favorite is the one that makes me scary and nervous, 
                        such like DBD and Dark Deception, and arouse my curiosity to explore the mystery </p>
                </div>
                <div v-on:click= "jump('entertain')" class="btn">Read more</div>
            </div>
            <div class="card">
                <div class="icon">
                    <img src="../assets\icon\icon2.png">
                </div>
                <div class="content">
                    <h3>Virtual Art Development</h3>
                    <p >:D </p>
                </div>
                <div v-on:click= "jump('creativity')" class="btn">Read more</div>
            </div>
            <div class="card">
                <div class="icon">
                    <img src="../assets\icon\icon3.png">
                </div>
                <div class="content">
                    <h3>Outdoor Exercise</h3>
                    <p>:D </p>
                </div>
                <div v-on:click= "jump('outdoors')" class="btn">Read more</div>
            </div>
        </div>
        <div class="home_forthparagh">
            <div class="photo_bgright"></div>
            <div class="photo_bgleft"></div>
            <div id="content">
                <h1>Contact Me</h1>
                <p>If you have intrest to know more about me, you can contact with me. Blew the information is about me. You can communicate
                    with Facebook, email or calling the cellphone. Thanks for you browsing my website. See you in the future.</p>
                <v-col cols=4 v-for="(media_icon, index) in media_icons" :key="index">
                    <a :href="media_icon.path">
                        <img :src="media_icon.icon" class="media_icon">
                    </a>
                </v-col>
            </div>
            <img class="picture" src="@/assets\picture\bg-3.jpg">
        </div>
    </section>
</template>

<script>
// @ is an alias to /src

export default {
  data:()=>({
      media_icons:[{
          icon: require("@/assets/icon/facebook1.png"),
          path: "https://www.facebook.com/profile.php?id=100009946749327",
      },
      {
          icon: require("@/assets/icon/email1.png"),
          path: "",
      },
      {
          icon: require("@/assets/icon/phone1.png"),
          path: "",
      },
      {
          icon: require("@/assets/icon/github1.png"),
          path: "https://github.com/",
      }
      ]
  }),
  methods: {
      jump:function(msg){
          this.$router.push({path: msg})
      },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/home/firstparagh.scss';
@import '@/assets/scss/home/secondparagh.scss';
@import '@/assets/scss/home/thirdparagh.scss';
@import '@/assets/scss/home/forthparagh.scss';
@import '@/assets/scss/element/btn.scss';
@import '@/assets/scss/element/decoration.scss';
</style>

