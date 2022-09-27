import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"

const db = getFirestore();

const BaseBallCollection = 'baseball_game';

export async function addBaseBallHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, BaseBallCollection), gamePlay);
}

export async function getBaseBasllHistory(email) {
    let history= [];
    const q = query(
        collection(db, BaseBallCollection),
        where('email','==', email),
        orderBy('timestamp','desc'),
    );
const snapShot = await getDocs(q);
snapShot.forEach( doc => {
    const {email, winner, moves, timestamp } = doc.data();
    history.push({email, winner, moves, timestamp});
});
return history;
}