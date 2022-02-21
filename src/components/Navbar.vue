<template>
    <header :class="{ 'scrolled-nav': scrollNav}">
        <nav>
            <a href='#' class="logo">Logo</a>
            <ul v-show="!mobile" class="navigation">
                <li><router-link to="/">Home</router-link> </li>
                <li><router-link to="/about">About</router-link> </li>
                <li><router-link to="/program">Program</router-link> </li>
                <li><router-link to="/game">Game</router-link> </li>
                <li><router-link to="/creativity">Creativity</router-link> </li>
                <li><router-link to="/outdoors">Outdoors</router-link> </li>
            </ul>
            <div class="navbar_icon">
                <i @click="toggleMobileNav" v-show="mobile" class="fi fi-br-menu-burger" :class="{'icon-active':mobileNav}" ></i>
            </div>
            <transition name='mobile-nav'>
                <ul v-show="mobileNav" class="dropdown-nav">
                    <li><router-link to="/">Home</router-link> </li>
                    <li><router-link to="/about">About</router-link> </li>
                    <li><router-link to="/program">Program</router-link> </li>
                    <li><router-link to="/game">Game</router-link> </li>
                    <li><router-link to="/creativity">Creativity</router-link> </li>
                    <li><router-link to="/outdoors">Outdoors</router-link> </li>
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
          scrollNav: null,
          mobile: null,
          mobileNav: null,
          windowWidth: null,
      };
    },
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    mounted(){
        window.addEventListener('scroll', this.updateSroll);
    },
    methods:{
        toggleMobileNav(){
            this.mobileNav = !this.mobileNav;
        },

        updateSroll(){
            const scrollPosition = window.scrollY;
            if(scrollPosition > 50){
                this.scrollNav = true;
                return;
            }
            this.scrollNav = false;
        },
        checkScreen(){
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 750){
                this.mobile = true;
                return
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
    },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css');

header{
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    width: 100%;
    height: 70px;
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
            margin: 5px 8px 0 0;
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
                    height:50px;
                    line-height: 50px;
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

        .navigation{
            display:flex;
            align-items: center;
            flex:1;
            justify-content: center;
        }

        
        
        .navbar_icon{
            display: flex;
            position: absolute;
            top:7px;
            right:24px;
            height:75%;
            
            i{
                cursor:pointer;
                font-size: 31.35px;
                transition: 0.8s ease all;
            }
        }

        .icon-active{
            transform: rotate(180deg);
        }

       

        .dropdown-nav{
            display:flex;
            flex-direction:column;
            position: fixed;
            height: 100%;
            width:100%;
            max-width: 250px;
            background: #fff;
            top:0;
            left:0;

            li{
                margin-left: 0;
                .link{
                    color:black;
                }   
            }
        }
        .mobile-nav-enter-active,
        .mobile-nav-leave-active{
            transition: 1s ease all;
        }

        .mobile-nav-enter-from,
        .mobile-nav-leave-to{
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to{
            transform: translateX(0);
        }
    }
}

.scrolled-nav{
    background: azure;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06);
    height: 60px;

}
</style>
