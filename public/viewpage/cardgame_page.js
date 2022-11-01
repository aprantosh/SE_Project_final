import * as Elements from './elements.js'
import { routePath } from '../controller/route.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { currentUser } from '../controller/firebase_auth.js';
import { info } from './util.js';
import { cardgame } from '../model/card_game.js';
import { addCardGameHistory, CardGameHistory } from '../controller/firestore_controller.js';
import { DEV } from '../model/constants.js';


export function addEventListeners() {

    Elements.menus.card.addEventListener('click', () => {
        history.pushState(null, null, routePath.CARD);
        card_page();

    });
}

const imageSource = {
    BACK: '/images/back.png',
    EMPTY: '/images/empty.png',
    LOGO: '/images/logo.png',
};

function changeimage(){
    if(key==0){
        document.getElementById('image-0').src = '/images/logo.png';
        document.getElementById('image-1').src = '/images/empty.png';
        document.getElementById('image-2').src = '/images/empty.png';
        
    }
    else if (key==1){
        document.getElementById('image-0').src = '/images/empty.png';
        document.getElementById('image-1').src = '/images/logo.png';
        document.getElementById('image-2').src = '/images/empty.png';
        
    }else if (key==2){
        
        document.getElementById('image-0').src = '/images/empty.png';
        document.getElementById('image-1').src = '/images/empty.png';
        document.getElementById('image-2').src = '/images/logo.png';
        
    }
}

let balance = 8;
let debt = 0;
let currentbet = 0;
let key = 0;
let cardmodel;
let loanstatus = false;
export async function card_page() {
    if (!currentUser) {
        Elements.root.innerHTML = unauthorizedAccess();
        return;
    }
    let html;
    const response = await fetch('/viewpage/templates/cardgame_page.html', { cache: 'no-store' });
    html = await response.text();
    Elements.root.innerHTML = html;

    document.getElementById('card1').disabled = true;
    document.getElementById('card2').disabled = true;
    document.getElementById('card3').disabled = true;
    document.getElementById('1+').addEventListener('click', clickplus);
    document.getElementById('2+').addEventListener('click', clickplus);
    document.getElementById('3+').addEventListener('click', clickplus);
    document.getElementById('1-').addEventListener('click', clickminus);
    document.getElementById('2-').addEventListener('click', clickminus);
    document.getElementById('3-').addEventListener('click', clickminus);
    document.getElementById('button-loan').addEventListener('click', loan);
    document.getElementById('button-play').addEventListener('click', playlogic);
    document.getElementById('button-new-game').addEventListener('click', newgame);
    document.getElementById('button-history').addEventListener('click', historyButtonEvent);


    balanceupdate();
    initbalance();
}

async function initbalance() {
    
    cardmodel = new cardgame();
    key = cardmodel.getRandomInt();
    document.getElementById('key').innerHTML = "SECRET : Firebase Card Location : " + key;
    document.getElementById('button-new-game').disabled = true;
    document.getElementById('button-play').disabled = true;


    let history;
    try {
        history = await CardGameHistory(currentUser.email);
        console.log(history.length);
        if (history.length > 0 ) {
            balance = history[0].balance;
            console.log(balance);
            debt = history[0].debts;
        }else {
            balance = 8;
            debt = 0;
        }
       
    } catch (e) {
       if (DEV) console.log('ERROR; history button', e);
       info('Failed to get game history', JSON.stringify(e));
    }
    document.getElementById('bal').innerHTML = "Balance: " + balance;


}

async function loan(event) {
    if (balance == 0) {
        balance += 8;
        debt += 8;
        balanceupdate();
        loanstatus= true;

        document.getElementById('bal').innerHTML = "Balance: " + balance;



        info('Loan Complete', 'You borrowed 8 coins');
        const gamePlay = {
            balance: balance,
            //bets: currentbet,
            debts:debt,
            email: currentUser.email,
            loan: loanstatus,
            
            
            timestamp: Date.now(),
           // won: won,
        };
        loanstatus=false;
        try {
            await addCardGameHistory(gamePlay);
            
        } catch (e) {
            info('Game Over', `Failed to save the game play history: ${e} `);
            if (DEV) console.log('Game Over: failed to save:', e);
        }


    } else {
        info('Not Available', 'Loan available when your balance is 0');

    }

   


}



function clickplus(event) {
    let idb = '';
    if (event.target.id == "1+") {
        idb = 'card1';
    } else if (event.target.id == "2+") {
        idb = 'card2';
    } else if (event.target.id == "3+") {
        idb = 'card3';
    }
    if (balance > currentbet) {
        let x = parseInt(document.getElementById(idb).value);

        x = x + 1;
        document.getElementById(idb).value = x;
        console.log(x);
        currentbet++;
        balanceupdate();

    }
    checkplaystatus();


}

function checkplaystatus() {
    if (parseInt(document.getElementById('card1').value) > 0 || parseInt(document.getElementById('card2').value) > 0 || parseInt(document.getElementById('card3').value) > 0) {
        document.getElementById('button-play').disabled = false;
    } else {
        document.getElementById('button-play').disabled = true;

    }


}

function balanceupdate() {
    document.getElementById('cbet').innerHTML = "Current Bets: " + currentbet;
    document.getElementById('cdebt').innerHTML = "(Debts: " + debt + " )";

}

function clickminus(event) {
    let idb = '';
    if (event.target.id == "1-") {
        idb = 'card1';
    } else if (event.target.id == "2-") {
        idb = 'card2';
    } else if (event.target.id == "3-") {
        idb = 'card3';
    }
    let x = parseInt(document.getElementById(idb).value);
    if (x > 0) {
        x = x - 1;
        document.getElementById(idb).value = x;
        console.log(x);
        currentbet--;
        balanceupdate();
    }
    checkplaystatus();
}

function newgame(event){
    card_page();
    currentbet = 0;
}

async function playlogic(event) {
    let won=0;
    if (key == 0) {
        won = parseInt(document.getElementById('card1').value);
        won = won * 3;
        document.getElementById('history').innerHTML=`You won ${won} coins by betting ${currentbet} coins <br> Game results stored in Firebase`;
        balance+=won;
        balance=balance-currentbet;
        document.getElementById('button-play').disabled=true;
        document.getElementById('button-new-game').disabled=false;
        currentbet=0;

    }else if (key == 1) {
        won = parseInt(document.getElementById('card2').value);
        won = won * 3;
        document.getElementById('history').innerHTML=`You won ${won} coins by betting ${currentbet} coins <br> Game results stored in Firebase`;
        balance+=won;
        balance=balance-currentbet;
        document.getElementById('button-play').disabled=true;
        document.getElementById('button-new-game').disabled=false;
        currentbet=0;

    }else if (key == 2) {
        won = parseInt(document.getElementById('card3').value);
        won = won * 3;
        document.getElementById('history').innerHTML=`You won ${won} coins by betting ${currentbet} coins <br> Game results stored in Firebase`;
        balance+=won;
        balance=balance-currentbet;
        document.getElementById('button-play').disabled=true;
        document.getElementById('button-new-game').disabled=false;
        

    }
    changeimage();
    
    const gamePlay = {
        balance: balance,
        bets: currentbet,
        debts:debt,
        email: currentUser.email,
        loan: loanstatus,
        
        
        timestamp: Date.now(),
        won: won,
    };
    try {
        await addCardGameHistory(gamePlay);
        
    } catch (e) {
        info('Game Over', `Failed to save the game play history: ${e} `);
        if (DEV) console.log('Game Over: failed to save:', e);
    }

    
}



async function historyButtonEvent(event) {
    let history;
    try {
        history = await CardGameHistory(currentUser.email);
        let html = `
            <table class="table table-success table-striped">
            
            <body>
        `;
        let itr=0;
        if(history.length>10){
            itr=10;
        }else{
            itr=history.length;
        }
        for (let i = 0; i < itr; i++) {
            console.log(history[i].loan);
            if(history[i].loan==false){
                html += `
                <tr>
                <td>
               ( ${new Date(history[i].timestamp).toLocaleString()} )
                <br>
                Balance = ${history[i].balance} Debts = ${history[i].debts}: BET= ${history[i].bets} WON= ${history[i].won} coins 

                </td>

                </tr>
                
                `;
            }else{
                html += `
                <tr>
                <td>
                ${new Date(history[i].timestamp).toLocaleString()}
                <br>
                Balance = ${history[i].balance} Debts = ${history[i].debts}:  Borrowed : 8 Coins

                </td>

                </tr>
                
                `;
            }
            
        }
        html += '</body></table>';
        document.getElementById('history').innerHTML = html;
        

    } catch (e) {
       if (DEV) console.log('ERROR; history button', e);
       info('Failed to get game history', JSON.stringify(e));
    }

}