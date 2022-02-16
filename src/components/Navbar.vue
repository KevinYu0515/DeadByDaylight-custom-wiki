<template>
    <header :class="{ 'scrolled-nav': scrollPosition}">
        <nav>
            <a href='#' class="logo">Logo</a>
            <ul v-show="!mobile">
                <li><router-link to="/">Home</router-link> </li>
                <li><router-link to="/about">About</router-link> </li>
                <li><router-link to="/program">Program</router-link> </li>
                <li><router-link to="/hobby">Hobby</router-link> </li>
                <li><router-link to="/">Contact</router-link> </li>
            </ul>
            <div class="list_icon">
                <img @click="toggleMobileNav" v-show="mobile" class="align-justify" :class="{'icon-active':mobileNav}" src="../assets\icon\align-justify.png">
            </div>
            <transition name='mobile-nav'>
                <ul v-show="mobileNav" class="dropndown-nav">
                    <li><router-link to="/">Home</router-link> </li>
                    <li><router-link to="/about">About</router-link> </li>
                    <li><router-link to="/program">Program</router-link> </li>
                    <li><router-link to="/hobby">Hobby</router-link> </li>
                    <li><router-link to="/">Contact</router-link> </li>
                </ul>
            </transition>
        </nav>
      </header>
  <router-view/>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
      return{
          scrollPosition: null,
          mobile: null,
          mobileNav: null,
          windowWidth: null,
      };
    },
    methods:{
        toggleMobileNav(){
            this.mobileNav = !this.mobileNav;
        },
        checkScreen(){
            this.windowWidth=window.innerWidth;
            if(this.windowWidth<=750){
                this.mobile = true;
                return
            }
        }
    },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

header{
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0px 60px 0 50px;
    background-color:azure;
    box-shadow: 0 5px 30px rgba(0,0,0,0.05);
    z-index: 1000;
    transition: 0.5s ease all;

     nav{
        display: flex;
        position: relative;
        flex-direction: row;
        transition: 0.5s ease all;
        width:90%;
        flex:1;
        margin: 0 auto;
        @media (min-width: 1140px){
            max-widt:1140px;
        }

        .logo{
            color:midnightblue;
            font-weight: 700;
            font-size: 2em;
            text-decoration: none;
            text-transform: uppercase;
            margin: 10px 8px 0 0;
            transition: 0.5s ease all;
        }

        ul  {
            position: relative;
            display: flex;
            flex-direction: row;

            li {
                List-style:none;

                a{
                    color:rgb(27, 138, 179);
                    height:60px;
                    line-height: 60px;
                    display: inline-block;
                    text-decoration: none;
                    font-size: 1.2em;
                    padding: 0 15px;
                    letter-spacing: 1px;
                    &:hover{
                        color:aliceblue;
                        background-color: rgb(7, 101, 101);
                    }
                }
                a.router-link-exact-active{
                    color: #e73727;
                }
            }
        }

        
        
        .list_icon{
            display: flex;
            position:absolute;
            align-items: center;
            top:5px;
            right:0;

            .align-justify{
                cursor:pointer;
                height:50px;
                width: 40px;
                transition: 0.8s ease all;
                transform: rotate(180deg);
            }
        }

        .dropdown-nav{
            display:flex;
            flex-direction:column;
            position: fixed;
            width:100%;
            background: #fff;
            top:0;
            left:0;

            li{
            margin-left: 0;
            color:black;
            }   
        }
    }
}

</style>
