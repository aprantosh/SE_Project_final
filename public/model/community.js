export async function editUpdatecom(){
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
    

}

export class Community {
    constructor(data) {
        this.uid = data.uid;
        this.email = data.email;
        this.title = data.title;
        this.timestamp = data.timestamp;
        this.content = data.content;
        this.keywordsArray = data.keywordsArray;


    }

    set_docId(id) {
        this.docId = id;

    }
    //serialization
    toFirestore() {
        return{
            uid: this.uid,
            email: this.email,
            title: this.title,
            timestamp: this.timestamp,
            content: this.content,
            keywordsArray: this.keywordsArray,
        };
    }
}


export async function shownn(event){
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
