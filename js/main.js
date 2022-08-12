import { TURN } from "./constants.js";
import { getCellElementList, getCurrentTurnElement, getGameStatusElement } from "./selectors.js";
import {checkGameStatus} from "./utils.js";
/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let isGameEnded = false;
let cellValues = new Array(9).fill("");
/* console.log(checkGameStatus(["X", "O", "X", "O", "O", "X", "O", "O", "X"]))
console.log(checkGameStatus(["X", "O", "X", "", "", "X", "O", "", ""]))
console.log(checkGameStatus(["X", "O", "X", "X", "", "O", "X", "", ""])) */
/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */
function toggleTurn(){
    currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;
    const currentTurnPlaying = getCurrentTurnElement();
    currentTurnPlaying.classList.remove(TURN.CROSS, TURN.CIRCLE);
    currentTurnPlaying.classList.add(currentTurn);

}

function handleEventClick(cell, index){
    
    const isFinish = cell.classList.contains(TURN.CROSS) || cell.classList.contains(TURN.CIRCLE);
    if(isFinish) return ;
    
    
    cell.classList.add(currentTurn)
    
    //toggle turn
    toggleTurn();
}
function checkPlayingDone(){
    const getListCell = getCellElementList();
    for (const cell of getListCell) {
        const isFinish = cell.classList.contains(TURN.CROSS) || cell.classList.contains(TURN.CIRCLE);
        if(isFinish) console.log(123) ;
    } 
}

(() => {
    const getListCell = getCellElementList();
    getListCell.forEach((cell, index) => {
        cell.addEventListener('click', () => handleEventClick(cell, index));
    });
    checkPlayingDone();
})();