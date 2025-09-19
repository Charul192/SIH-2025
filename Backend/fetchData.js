import {db} from "./firebase.js"
// import {ref, get} from "firebase/database"
// import {getFirestore, collection, query, where, getDocs} from "firebase/firestore"

async function getLiveLocation(bus_num){
    try {
        const busRef = await db.collection("buses").where('busId', '==', bus_num).get();
        return busRef.docs[0].data();
    } catch(error){
        console.log(error);
    }

    // const busRef = ref(db, `Buses/${bus_num}`);
    // get(busRef)
    //     .then((busRef)=>{
    //         if(busRef.exists()){
    //             const {lat, lng} = busRef.val().Location;
    //             return {lat, lng};
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })

}
getLiveLocation(14);
// getLiveLocation()
// async function getStops(bus_num){
//     const busRef = ref(db, `Buses/${bus_num}`);
//     get(busRef)
//         .then((busRef)=>{
//             if(busRef.exists()) {
//                 // console.log(busRef.val());
//                 return (busRef.val());
//             }
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// }
// getStops("23231")
// export {getStops};


