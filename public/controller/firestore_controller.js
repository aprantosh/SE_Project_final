import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"


const db = getFirestore();

const TicTacToeGameCollection = 'tictactoe_game';
const BaseballGameCollection = 'baseball_game';
const CardGameCollection = 'card_game';
const CommunityFeedCollection = 'smil_database';

export async function addCardGameHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, CardGameCollection), gamePlay);
}



export async function CardGameHistory(email) {
    let history = [];
    const q = query(
        collection(db, CardGameCollection),
        where('email', '==', email),
        orderBy('timestamp', 'desc'),
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const { email, balance, debts, bets, loan, won, timestamp } = doc.data();
        history.push({ email, balance, debts, bets, loan, won, timestamp });
    });
    return history;
}

export async function addCommentsHistory(commentData) {
    await addDoc(collection(db, CommunityFeedCollection), commentData);
}

export async function deleteComments(doc_id) {
    await deleteDoc(doc(db, CommunityFeedCollection, doc_id));
}

export async function updateComments(doc_id, commentData) {
    const Ref = doc(db, CommunityFeedCollection, doc_id);
    await updateDoc(Ref, {
        "commentText": commentData.commentText,
        "email": commentData.email,
        "timestamp": commentData.timestamp, 
      });
}



export async function addTicTacToeGameHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, TicTacToeGameCollection), gamePlay);
}

export async function getTicTacToeGameHistory(email) {
    let history = [];
    const q = query(
        collection(db, TicTacToeGameCollection),
        where('email', '==', email),
        orderBy('timestamp', 'desc'),
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const { email, winner, moves, timestamp } = doc.data();
        history.push({ email, winner, moves, timestamp });
    });
    return history;
}

export async function getComment() {
    let history = [];
    const q = query(
        collection(db, CommunityFeedCollection),
        orderBy('timestamp', 'desc'),
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        let id = doc.id;
        const { email, commentText ,timestamp } = doc.data();
        history.push({ email, commentText , timestamp, id });
    });
    return history;
}


export async function addBaseballGameHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, BaseballGameCollection), gamePlay);
}

export async function BaseballGameHistory(email) {
    let history = [];
    const q = query(
        collection(db, BaseballGameCollection),
        where('email', '==', email),
        orderBy('timestamp', 'desc'),
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const { email, attempts, timestamp } = doc.data();
        history.push({ email, attempts, timestamp });
    });
    return history;
}