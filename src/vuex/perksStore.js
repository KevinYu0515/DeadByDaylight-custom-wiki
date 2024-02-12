import { onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";
import { skillsColRef, storage } from "../firebase";
import { ref as r, uploadBytes } from "firebase/storage";

export default{
    namespaced: true,
    state:{
        fbPerks: []
    },
    mutations:{
        SETDATA(state, data){
            state.fbPerks = data;
        }
    },
    actions:{
        GETDATA(context){
            onSnapshot(skillsColRef, (querySnapshot) => {
                let tmpPerks = [];
                querySnapshot.forEach((doc) => {
                  const perk = {
                    id: doc.id,
                    name: doc.data().name,
                    usefulness: doc.data().usefulness,
                    icon: doc.data().icon,
                    illustrate: doc.data().illustrate
                  };
                  tmpPerks.push(perk);
                });
                context.commit("SETDATA", tmpPerks);
              });
        },

        ADDDATA(context, perkData){
            addDoc(skillsColRef, {
                name: perkData.newPerkName,
                usefulness: perkData.newPerkUseful,
                icon: perkData.perkUrl,
                illustrate: perkData.newPerkInfor
            });
        },

        UPDATEDATA(context, {id, options, optionsValue}){
            updateDoc(doc(skillsColRef, id), { [options]: optionsValue });
            console.log("updatePerk");
        },

        UPLOADDATA(context, perk){
            const storageRef = r(storage, `killersSkills/${perk.name}`);
            uploadBytes(storageRef, perk).then((snapshot) => {
                console.log("Uploaded a blob or file!");
                console.log(snapshot);
            });
        }
    }
};