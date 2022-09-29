import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"

const db = getFirestore();

const TicTacToeGameCollection = 'tictactoe_game';
const BaseballGameCollection = 'baseball_game';


export async function addTicTacToeGameHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, TicTacToeGameCollection), gamePlay);
}

export async function getTicTacToeGameHistory(email) {
    let history= [];
    const q = query(
        collection(db, TicTacToeGameCollection),
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

export async function addBaseballGameHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, BaseballGameCollection), gamePlay);
}

export async function BaseballGameHistory(email) {
    let history= [];
    const q = query(
        collection(db, BaseballGameCollection),
        where('email','==', email),
        orderBy('timestamp','desc'),
    );
const snapShot = await getDocs(q);
snapShot.forEach( doc => {
    const {email, attempts,  timestamp} = doc.data();
    history.push({email, attempts,  timestamp});
});
return history;
}