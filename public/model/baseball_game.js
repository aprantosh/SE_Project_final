
let x=[];


export function rangenrator(){
    return Math.floor(Math.random()*10);
}



export function rankeygen(){
    const n1 = rangenrator();
    let n2 = rangenrator();
    while(n1 == n2) n2 = rangenrator();
    let n3 = rangenrator();
    while (n1 == n3 || n2 == n3) n3 = rangenrator();
    
    document.getElementById('key').innerHTML=n1+","+n2+","+n3;
    return [n1,n2,n3];
}

let attempt=0;
let g1=-1,g2=-1,g3=-1;

 async function buttonPressListener(event){
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
}
    