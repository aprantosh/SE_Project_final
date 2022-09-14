import * as Elements from './elements.js';
import { routePath } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { TicTacToeGame } from '../model/tictactoe_game.js';


export function addEventListeners() {

        Elements.menus.tictactoe.addEventListener('click', () => {
            history.pushState(null, null, routePath.TICTACTOE);
            tictactoe_page();
        });


}

let gameModel;
let screen = { 
    turn: null,
    moves:null,
    buttons: null,
    images: null,
}

export async function tictactoe_page() {
    if(!currentUser){
        Elements.root.innerHTML = unauthorizedAccess();
        return;
    }
    gameModel = TicTacToeGame();

    let html ;
    const response = await fetch('/viewpage/templates/tictactoe_page.html', {cache: 'no-store'});
    html = await response.text();
    Elements.root.innerHTML = html;

    getScreenElements();

}
function getScreenElements() {
    screen.turn = document.getElementById('turn');
    screen.moves = document.getElementById('moves');
    screen.buttons = [];
    screen.images = [];
    for (let i=0; i<9; i++) {
        screen.buttons.push();
    }
}