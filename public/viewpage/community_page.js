import * as Elements from './elements.js'
import { routePath } from '../controller/route.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { currentUser } from '../controller/firebase_auth.js';
import { info } from './util.js';
import { addCommentsHistory, getComment, deleteComments, updateComments } from '../controller/firestore_controller.js';
import { editUpdatecom } from '../model/community.js';

export function addEventListeners() {

    Elements.menus.community.addEventListener('click', () => {
        history.pushState(null,null, routePath.COMMUNITY);
        community_page();

    });
}
export  async function community_page() {
    if (!currentUser){
        Elements.root.innerHTML = unauthorizedAccess();
        return;
    }
    

    let html;
    const response = await fetch('/viewpage/templates/community_page.html', { cache: 'no-store' });
    html = await response.text();
    Elements.root.innerHTML = html;
    document.getElementById('button-new-create').addEventListener('click', createButton);
    refreshcomments();
}


async function createButton(event) {
    let html = `
        <div id='form'>
            <div id='txt'>
                <textarea id="form-comment-area" name= "content" required minlength= "3" placeholder= "Enter Message"></textarea>
            </div>
            
            <div id='form-buttons'>
                <button id="form-save"  type = "submit" class= "btn btn-outline-danger">Save</button>
                <button id="form-cancel" type = "submit" class= "btn btn-outline-secondary">Cancel</button>
            </div>        
        </div>
        `;
        
    document.getElementById('create-area').innerHTML = html;
    document.getElementById('form-save').addEventListener('click',addComment);

    
}
   
async function addComment() {
    let comment = document.getElementById('form-comment-area').value;
    if (comment == ""){
        info('invalid data','Please Enter Some text to proceed');
    }else {

        comment = `<smil>
        <body>
           <par>
               <text> `+ comment+` </text>
              
          </par>
          
          
        </body>
      </smil>`;
        const commentData = {
            email: currentUser.email,
            timestamp: Date.now(),
            commentText: comment,
        };
        try {
            addCommentsHistory(commentData);
            community_page();
        } catch (error) {
            info('ERROR',`Failed to add comment ${error}`);
        }
        

    }
}

async function refreshcomments(){
    let history="";
    let button_ids=[];
    try {
        history = await getComment();
        let html = `
        <table style="width:1000px" id="tab-com" class="table table-light table-striped">
            <tr>
                <th>Message</th>
                <th>Action</th>
            </tr>
        `;
        if(history.length==0){
            html += `
            <tr>
            <td>
                No Message Posted!
            </td>
            </tr>
            `;
        }
        for (let i = 0; i < history.length; i++) {
            html += `
            <tr>
            <td>
                <div class='div-1'>
                    By ${history[i].email} {Posted at ${new Date(history[i].timestamp).toLocaleString()}}
                </div>    
                <div id="div-2+${history[i].id}">
                    <div class='div-2'>
                        ${history[i].commentText}
                    </div>
                </div>
            </td>`;
            if(currentUser.email == history[i].email){
                
                html += `
                
                    <td>
                        <button id="edit-text+${history[i].id}"  type = "submit" class= "btn btn-outline-danger">Edit</button>
                        <button id="${history[i].id}"  type = "submit" class= "btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
                
                
                `;
                button_ids.push(history[i].id);
            }
            console.log(history[i].id);
        }
        
        html += '</table>';
        document.getElementById('comments-table').innerHTML = html;
        for (let i = 0; i < button_ids.length; i++) {
            document.getElementById(`${button_ids[i]}`).addEventListener('click',shownn);
            document.getElementById(`edit-text+${button_ids[i]}`).addEventListener('click',editcomments);
        }
    } catch (error) {
        info('ERROR',`Failed to get comments ${error}`);
    }
}

async function shownn(event){
    console.log(this.id);
    try {
        const r = confirm('Press OK to delete');
        if (!r) return;
        await deleteComments(this.id);
        community_page();
    } catch (error) {
        info('ERROR',`Failed to delete comments ${error}`);
    }
    
    
}

async function editcomments(event){
    let tempid=this.id;
    document.getElementById(tempid).disabled  = true;
    tempid = tempid.substring(10,tempid.length);
    console.log(tempid);
    let tempcommentid= "div-2+" + tempid;
    let tempcommentvalue=document.getElementById(tempcommentid).innerText;
    let html = `
        
            <div id='temptxt'>
                <textarea id="form-comment-area" name= "content" required minlength= "3">${tempcommentvalue}</textarea>
            </div>
            <div id='temp-form-buttons'>
                <button id="temp-update+${tempid}"  type = "submit" class= "btn btn-outline-danger">Update</button>
                <button id="temp-cancel" type = "submit" class= "btn btn-outline-secondary">Cancel</button>
            </div>        
        `;
        
    document.getElementById(tempcommentid).innerHTML = html;
    document.getElementById('temp-cancel').addEventListener('click', editcancel);
    document.getElementById(`temp-update+${tempid}`).addEventListener('click', editUpdate);
}

async function editUpdate(){
    let idtosend = this.id;
    idtosend = this.id.substring(12,idtosend.length);
    console.log(idtosend);
    let up_comment= document.getElementById('form-comment-area').value;
    const commentData = {
        email: currentUser.email,
        timestamp: Date.now(),
        commentText: up_comment,
    };
    updateComments(idtosend,commentData);
    community_page();

}

function editcancel(){
    community_page();
}

function checkedit(){
    editUpdatecom();
}