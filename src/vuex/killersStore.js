import { db, killersColRef, storage } from "@/firebase"
import { ref as r, uploadBytes } from "firebase/storage"
import { doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore"

export default{
    namespaced: true,
    state:{
        fbkillers: [],
        fbAdd_ones: []
    },
    mutations:{
        SETDATA(state, data){
            state.fbkillers = data
        },
        SETADDONES(state, data){
            state.fbAdd_ones = data
        }
    },
    actions:{

        // 從 firebase 獲取資料
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

        GETADDONES(context, id){
            onSnapshot(collection(db, `killers/${id}/add-ones`), (querySnapshot) => {
                let tmpAdd_ones = []
                querySnapshot.forEach((doc) => {
                  const add_ones = {
                    id: doc.id,
                    names: doc.data().names,
                    descriptions: doc.data().descriptions
                  }
                  tmpAdd_ones.push(add_ones)
                })
                context.commit("SETADDONES", tmpAdd_ones)
            })
        },

        // 上傳圖片至 firebase 儲存庫
        UPLOADIMG(context, {file, img}){
            const storageRef = r(storage, `${file}/${img.name}`)
            uploadBytes(storageRef, img.value).then((snapshot) => {
                console.log("Uploaded a blob or file!")
                console.log(snapshot)
            })
        },

        // 增加資料至 firebase
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
        },

        // 更新資料
        UPDATEDATA(context, {id, options, optionsValue}){
            updateDoc(doc(killersColRef, id),{ [options]: optionsValue })
            console.log("updateSettings")
        },

        // 刪除資料
        DELETEROLE(context, id){
            deleteDoc(doc(killersColRef, id))
        }
    }
}