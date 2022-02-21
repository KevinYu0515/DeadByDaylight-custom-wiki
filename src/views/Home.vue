<template>
  <section id="home">
        <div class="home_firstparagh">
            <div class="photo_bgright"></div>
            <div id="content">
                <h1>Hi I'm<br><span>Kevin LIN</span></h1>
                <p>I wouldn't care success or failure, for I will only struggle ahead as long as I have been destined to the distance. 
                    I wouldn't care the difficulties around, for what I can leave on the earth is only their view of my back since 
                    I have been marching toward the horizontal.</p><br>
                <div @click= "jump('about')" class="btn">Read more</div>
            </div>
            <img src="../assets\Picture1.jpg">
        </div>
        <div class="home_secondparagh">
            <div class="photo_bgleft"></div>
            <img src="../assets\Picture2.png">
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
                <div v-on:click= "jump('game')" class="btn">Read more</div>
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
        <section id="contact">
            <div class="home_forthparagh">
                <div class="photo_bgright"></div>
                <div class="photo_bgleft"></div>
                <div id="content">
                    <h1>Contact Me</h1>
                    <p>If you have intrest to know more about me, you can contact with me. Blew the information is about me. You can communicate
                        with Facebook, email or calling the cellphone. Thanks for you browsing my website. See you in the future.</p>
                    <a href="https://www.facebook.com/profile.php?id=100009946749327">
                        <img class="facebook" src="../assets\icon\facebook1.png">
                    </a>
                    <img class="gmail" src="../assets\icon\email1.png">
                    <img class="cellphone" src="../assets\icon\phone1.png">
                    <a href="https://github.com/">
                        <img class="github" src="../assets\icon\github1.png">
                    </a>
                </div>
                <img src="../assets\Picture3.jpg">
            </div>
        </section>
        <div class="footer"></div>
            
    </section>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
      Navbar
  },

  methods: {
      jump:function(msg){
          this.$router.push({path: msg})
      },
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&family=Space+Grotesk&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rowdies&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand&family=Ubuntu&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    scroll-behavior: smooth;
}

.btn{
    cursor:pointer;
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    text-decoration: none;
    background: #f72585;
    color:#edf2fb;
    font-weight: 500;
    border-radius: 4px;
    margin-top: 20px;
    &:hover{
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        text-decoration: none;
        background: #530de9;
        color:#edf2fb;
        font-weight: 500;
        border-radius: 4px;
        margin-top: 20px;
    }
}
  
.home_firstparagh{
    position: relative;
    background: linear-gradient(90deg,#5CC8F6,#47b1df,#466bee,#5c71f6);
    height: 80vh;
    width: 100%;
    display: flex;
    margin-top: 60px;
    overflow: hidden;

    #content{
        max-width: 550px;
        margin: 100px 50px 100px 100px;
        text-align: left;

        h1{
            font-family: 'Source Sans Pro', sans-serif;
            color:#002984;
            line-height: 2.5em;
            font-weight: bold;
            letter-spacing: 1px;

        span{
            font-weight: 700;
            color:#466bee;
            font-size: 3em;
            }
        }
        p{
            font-family: 'Source Sans Pro', sans-serif;
            color:white;
            font-size: 1.2em;
            line-height: 1.5em;
            word-spacing: 2px;
            margin-bottom: 20px;
        }
    }

    img{
        width:585px;
        height:450px;
        margin: 60px 0px 0px 110px;
        border-color: rgb(251, 253, 255);
        border-style: solid;
        padding: 3px;
    }
}

.home_secondparagh{
    position: relative;
    background-color: #5CE1E6;
    height: 80vh;
    width: 100%;
    display: flex;
    margin: 0px;
    overflow: hidden;

    img{
        width:614px;
        height:436px;
        display: flex;
        margin:80px 0 50px 80px;
        border-color: rgb(255, 255, 255);
        border-style: solid;
        padding: 3px;
    }

    #content{
        max-width: 650px;
        margin: 80px 0px 50px 100px;
        text-align: left;

        #container{
            width: 650px;
            display: flex;
            flex-direction: row;
            height: 60px;
            margin-bottom: 30px;
        }

        h1{
            font-family:'Fredoka One', cursive;
            color:#002984;
            letter-spacing: 1px;
            font-size: 3.5em;
            line-height: 1.5em;
            font-weight: 700;
            margin-right: 25px;
        }

        p{
            font-family: 'Source Sans Pro', sans-serif;
            color:white;
            font-size: 18px;
            word-spacing: 1px;
            line-height: 1.5em;
        }
    }

    .box_container{
        margin-top: 40px;
        display: flex;
        background: #5CE1E6;
        flex-direction: row;

        .box{
            position: relative;
            width: 200px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: #5CE1E6;
            margin:50px 30px 50px 30px;

            .percent{
                position:relative;
                width: 130px;
                height: 130px;

                svg{
                    position: relative;
                    width:130px;
                    height:130px;

                    circle{
                        width:130px;
                        height:130px;
                        fill:none;
                        stroke-width: 10;
                        stroke:#000;
                        transform: translate(5px,5px);
                        stroke-dasharray: 380;
                        stroke-dashoffset: 380;
                        stroke-linecap: round;
                    }

                    circle:nth-child(1){
                        stroke-dashoffset: 0;
                        stroke:#e2fdff;
                    }
                }

                #circle1 circle:nth-child(2){
                    stroke-dashoffset: calc(380 - (380 * 33)/100);
                    stroke:#788bff;
                }

                #circle2 circle:nth-child(2){
                    stroke-dashoffset: calc(380 - (380 * 20)/100);
                    stroke:#788bff;
                }
                #circle3 circle:nth-child(2){
                    stroke-dashoffset: calc(380 - (380 * 47)/100);
                    stroke:#788bff;
                }
            }

            .number{
                position:absolute;
                font-family:'Fredoka One', cursive;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color:#e2fdff;
                cursor: pointer;
                &:hover{
                    color:#c60af0;
                }

                h2{
                    font-size: 50px;
                    span{
                        font-size: 13px;
                    }
                }
            }
            
            .text{
                font-family:'Fredoka One', cursive;
                padding: 10px 0 0;
                color:#5465ff;
                font-weight: 700;
                letter-spacing: 1px;
            }
        }
    }
}

.home_thirdparagh{
    position: relative;
    background-color: #ffffff;
    height: 80vh;
    width: 100%;
    display: flex;
    justify-content: center;

    .card{
        position: relative;
        width:300px;
        padding: 20px;
        margin:70px 60px 70px 60px;
        background-color: #edf2fb;

        .icon{
            margin-bottom: 10px;
            color: #4361ee;
            img{
                max-width: 50px;
            }
        }

        .content{
            position: relative;
            height: 215px;
            overflow: hidden;

            &::before{//ˋ這個用法其實我不確定
                content: "";
                position:absolute;
                bottom:0;
                left:0;
                width:100%;
                height:100px;
                background: linear-gradient(transparent,#edf2fb);
            }
            
            h3{
                color:black;
                font-family:'Ubuntu', sans-serif;
                font-size: 2em;
                font-weight: 600;
                margin-bottom: 10px;
            }
            p{
                font-family: 'Quicksand', sans-serif;
                font-weight: 300;
                color:#4361ee;
            }
        }
    }
}

.home_forthparagh{
    position: relative;
    background:linear-gradient(180deg,#466bee,#5c71f6,#47b1df,#5CC8F6);
    height: 80vh;
    width: 100%;
    display: flex;
    margin: 0;
    overflow: hidden;
    
    #content{
        max-width: 550px;
        margin: 100px 50px 100px 100px;
        text-align: left;

        h1{
            font-family: 'Rowdies', cursive;
            position: relative;
            color:#002984;
            font-size: 3em;
            line-height: 2em;
            letter-spacing: 1px;
        }
        p{
            font-family: 'Source Sans Pro', sans-serif;
            color:white;
            position: relative;
            font-size: 1.2em;
            line-height: 1.5em;
            word-spacing: 2px;
            margin-bottom: 20px;
        }
        .gmail{
            position: relative;
            margin:0px 30px 0px 0px;
            width: 50px;
            height: 50px;
            border: none;
        }
        .cellphone{
            position: relative;
            margin:0px 30px 0px 0px;
            width: 50px;
            height: 50px;
            border: none;
        }
        .github{
            position: relative;
            margin:0px 30px 0px 0px;
            width: 50px;
            height: 50px;
            border: none;
        }
        .facebook{
            position: relative;
            margin:0px 30px 0px 0px;
            width: 50px;
            height: 50px;
            border: none;
        }
    }

    img{
        width: 614px;
        height: 436px;
        margin: 80px 0 50px 110px;
        border-color: rgb(251, 253, 255);
        border-style: solid;
        padding: 3px;
    }
}

.photo_bgleft{
    position: absolute;
    top:0%;
    right:80%;
    width:100%;
    height:80vh;
    transform:skewX(-5deg);
    background-color: #edf8fd;
    opacity: 0.2;
}

.photo_bgright{
    position: absolute;
    top:0%;
    Left:80%;
    width:100%;
    height:80vh;
    transform:skewX(-5deg);
    background-color: #5CC8F6;
    opacity: 0.2;
}

.footer{
    position: relative;
    height: 50px;
    width:100%;
    background: #002984;
}

</style>
