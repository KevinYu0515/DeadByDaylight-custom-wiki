import { createStore } from "vuex"

import { killersColRef, storage } from "@/firebase"
import { ref as r, uploadBytes } from "firebase/storage"
import { onSnapshot, addDoc } from "firebase/firestore"

export default createStore({
    state:{
        fbkillers: []
    },
    mutations:{
        SETDATA(state, data){
            state.fbkillers = data
        }
    },
    actions:{
        GETDATA(context){
            onSnapshot(killersColRef, (querySnapshot) => {
                let tmpkillers = []
                querySnapshot.forEach((doc) => {
                  const killer = {
                    id: doc.id,
                    background: doc.data().background,
                    name: doc.data().name,
                    movementSpeed: doc.data().movementSpeed,
                    terrorRadius: doc.data().terrorRadius,
                    alternativeMovementSpeed: doc.data().altnativeMoveSpeed,
                    alternativeTerrorRadius: doc.data().altnativeTerrorRadius,
                    height: doc.data().height,
                    weapon: doc.data().weapon,
                    power: doc.data().power,
                    level: doc.data().level,
                    cover: doc.data().cover,
                    perks: doc.data().perks,
                    recommendPerks: doc.data().recommendPerks,
                    realName: doc.data().realName,
                    backgroundImage: doc.data().backgroundImage,
                    difficulty: doc.data().difficulty,
                    add_ones_images: doc.data().add_ones_images,
                    add_ones_names: doc.data().add_ones_names
                  }
                  tmpkillers.push(killer)
                })
                context.commit("SETDATA", tmpkillers)
            })
        },
        UPLOADIMG(context, img){
            const storageRef = r(storage, `killersCover/${img.name}`)
            uploadBytes(storageRef, img.value).then((snapshot) => {
                console.log("Uploaded a blob or file!")
                console.log(snapshot)
            })
        },
        ADDROLE(context, role){
            addDoc(killersColRef, {
                name: role.newKillerName,
                level: role.newKillerLevel,
                cover: role.imgUrl,
                difficulty: role.newKillerDR,
                perks: [null],
                recommendPerks: [null],
                add_ones_images: [null],
                add_ones_names: [null]
            })
        }
    }
})