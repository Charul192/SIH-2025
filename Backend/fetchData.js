import db from "./connectDB.js"
import {ref, get} from "firebase/database"
// import {getFirestore, collection, query, where, getDocs} from "firebase/firestore"


async function getLiveLocation(bus_num){
    const busRef = ref(db, `Buses/${bus_num}`);
    get(busRef)
        .then((busRef)=>{
            if(busRef.exists()){
                const {lat, lng} = busRef.val().Location;
                return {lat, lng};
            }
        })
        .catch((err)=>{
            console.log(err);
        })

}
async function getStops(bus_num){
    const busRef = ref(db, `Buses/${bus_num}`);
    get(busRef)
        .then((busRef)=>{
            if(busRef.exists()) {
                // console.log(busRef.val());
                return (busRef.val());
            }
        })
        .catch((err)=>{
            console.log(err);
        })
}
getStops("23231")
export {getStops};


