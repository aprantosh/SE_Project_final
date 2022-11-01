export class cardgame{
    getRandomInt() {
        return Math.floor(Math.random() * 3);
     // expected output: 0, 1 or 2
    }
}
export const marking = {
    BACK: 'BACK',
    EMPTY: 'EMPTY',
    LOGO: 'LOGO',
};

export function clickplus(event) {
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

export function checkplaystatus() {
    if (parseInt(document.getElementById('card1').value) > 0 || parseInt(document.getElementById('card2').value) > 0 || parseInt(document.getElementById('card3').value) > 0) {
        document.getElementById('button-play').disabled = false;
    } else {
        document.getElementById('button-play').disabled = true;

    }


}

export function balanceupdate() {
    document.getElementById('cbet').innerHTML = "Current Bets: " + currentbet;
    document.getElementById('cdebt').innerHTML = "(Debts: " + debt + " )";

}

export function clickminus(event) {
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