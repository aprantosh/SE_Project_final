import * as Elements from './elements.js'
import { routePath } from '../controller/route.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { currentUser } from '../controller/firebase_auth.js';
import * as Util from './util.js';

//import { TicTacToeGame, marking } from '../model/tictactoe_game.js';
//import { info } from './util.js';
//import { addBaseBallHistory, getBaseBallHistory } from '../controller/firestore_controller_baseball.js';
import { DEV } from '../model/constants.js';

export function addEventListeners() {

    Elements.menus.baseball.addEventListener('click', () => {
        history.pushState(null,null, routePath.BASEBALL);
        baseball_page();


    });
}

let x=[];


function rangenrator(){
    return Math.floor(Math.random()*10);
}



function rankeygen(){
    const n1 = rangenrator();
    let n2 = rangenrator();
    while(n1 == n2) n2 = rangenrator();
    let n3 = rangenrator();
    while (n1 == n2 || n2 == n3) n3 = rangenrator();
    
    document.getElementById('key').innerHTML=n1+","+n2+","+n3;
    return [n1,n2,n3];
}


export async function baseball_page() {
    if (!currentUser){
        Elements.root.innerHTML = unauthorizedAccess();
        return;
    }
    //gameModel = new BaseBallGame();

    let html  ;
    const response = await fetch('/viewpage/templates/baseball_page.html',{ cache: 'no-store'});
    html = await response.text();
    Elements.root.innerHTML = html ;
    //Elements.keyfield.innerHTML = 'Hello';
    document.getElementById('key').innerHTML='Hello';
    x=rankeygen();
    console.log(x);


    for (let i = 0; i <= 9; i++) {
        document.getElementById(`button-${i}`).addEventListener('click', buttonPressListener);
        
    }

}

let attempt=0;
let g1=-1,g2=-1,g3=-1;

function buttonPressListener(event){
    let ball=0;
    let strike =0;
    const buttid = event.target.id;
    document.getElementById(buttid).disabled=true;
    if(g1==-1){
        for (let i = 0; i < 10; i++) {
            if(buttid==`button-${i}`){
                g1=i;
                document.getElementById('moves').innerHTML+=g1;
                break;
            }
            
        }
    }else if(g2==-1){
        for (let i = 0; i < 10; i++) {
            if(buttid==`button-${i}`){
                g2=i;
                document.getElementById('moves').innerHTML+=','+g2;
                break;
            }
            
        }
    }else if(g3==-1){
        for (let i = 0; i < 10; i++) {
            if(buttid==`button-${i}`){
                g3=i;
                document.getElementById('moves').innerHTML+=','+g3;
                break;
            }
            
        }
    }

    if(g1==x[0]){
        strike++;
    }else{
        if(g1==x[1]||g1==x[2]){
            ball++;
        }
    }

    if(g2==x[1]){
        strike++;
    }else{
        if(g2==x[0]||g2==x[2]){
            ball++;
        }
    }

    if(g3==x[2]){
        strike++;
    }else{
        if(g3==x[0]||g3==x[1]){
            ball++;
        }
    }

    
    

    

    if(g1!=-1&&g2!=-1&&g3!=-1){
        attempt++;
        console.log('Balls: '+ball+", Strike: "+strike);
        if(g1==x[0]&&g2==x[1]&&g3==x[2]){
            console.log('winner');
            console.log(attempt);
            //updateScreen();
            for (let i = 0; i <= 9; i++) {
                document.getElementById(`button-${i}`).disabled=true;
            }
            attempt=0;
        }else{
            console.log('loser');
            //updateScreen();
            for (let i = 0; i <= 9; i++) {
                document.getElementById(`button-${i}`).disabled=false;
            }
            
        }
        document.getElementById('moves').innerHTML='';
        g1=-1;
        g2=-1;
        g3=-1;
        

    }


}