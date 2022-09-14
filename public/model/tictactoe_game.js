
export const marking = {
    X: 'X',
    O: 'O',
    U: 'U',
};
export class TicTacToeGame { 
    constructor() {
        this.turn = marking.X;  // X plays first
        this.moves = 0;
        this.winner = null; //null (playing), marking. O/X U:draw
        this.board= [];
        for( let i=0; i<9 ; i++) {
            this.board.push(marking.U);
        }
        this.status = 'Ready to Play';
        }
        toggleTurns() {
            this.turn = this.turn == marking.X? marking.O : marking.X ;
        }
}