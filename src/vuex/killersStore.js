import { db, killersColRef, storage } from "@/firebase"
import { ref as r, uploadBytes } from "firebase/storage"
import { doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore"

export default{
    namespaced: true,
    state:{
        data: {
            killersInfo: [],
            perks: [],
            addOnes: []
        },
        levelOptions: [{level:"ALL"}, {level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}],
        drOptions: [{dr:"Easy"}, {dr:"Moderate"}, {dr:"Hard"}, {dr:"Very Hard"}],
        difficultyColor: {
            "Easy": "rgba(64,176,64)",
            "Moderate": "yellow",
            "Hard": "rgba(229,132,48)",
            "Very Hard": "rgba(246,89,89)"
        }
    },
    mutations:{
        SETDATA(state, data){
            state.data.killersInfo = data
        },
        SETPERK(state, data){
            state.data.perks = data
        },
        SETADDONES(state, data){
            state.data.addOnes = data
        }
    },
    actions:{

        // 從 firebase 獲取資料
        GETDATA(context){
            onSnapshot(killersColRef, (querySnapshot) => {
                const killers = []
                querySnapshot.forEach((doc) => {
                  killers.push({
                    id: doc.id,
                    build: doc.data().build,
                    info: doc.data().info
                  })
                })
                context.commit("SETDATA", killers)
            })
        },

        GETPERK(context, id){
            onSnapshot(collection(db, `killers/${id}/perk`), (querySnapshot) => {
                const perks = []
                querySnapshot.forEach((doc) => {
                  perks.push({
                    id: doc.id,
                    name: doc.data().name,
                    type: doc.data().type,
                    description: doc.data().description,
                    image: doc.data().image
                  })
                })
                context.commit("SETPERK", perks)
            })
        },

        GETADDONES(context, id){
            onSnapshot(collection(db, `killers/${id}/addOnes`), (querySnapshot) => {
                const AddOnes = []
                querySnapshot.forEach((doc) => {
                  AddOnes.push({
                    id: doc.id,
                    name: doc.data().name,
                    rarity: doc.data().rarity,
                    description: doc.data().description,
                    image: doc.data().image
                  })
                })
                context.commit("SETADDONES", AddOnes)
            })
        },

        // 上傳圖片至 firebase 儲存庫
        UPLOADIMG(context, img){
            const storageRef = r(storage, `${img.file}/${img.name}`)
            uploadBytes(storageRef, img.value).then(() => {
                console.log("Uploaded a blob or file!")
            })
        },

        ADDROLE(context, data){
            data.info.name = [data.info.name]
            addDoc(killersColRef, data)
        },

        ADDPERK(context, {id, data}){
            addDoc(collection(killersColRef, id, "perk"), data)
        },

        ADDADDONES(context, {id, data}){
            addDoc(collection(killersColRef, id, "addOnes"), data)
        },

        // 更新資料
        UPDATEDATA(context, {killerID, data, option = "info", id}){
            if(option !== "info") updateDoc(doc(killersColRef, killerID, option, id), data)
            else updateDoc(doc(killersColRef, killerID), data)
        },

        // 刪除資料
        DELETEROLE(context, id){
            deleteDoc(doc(killersColRef, id))
        }
    }
}