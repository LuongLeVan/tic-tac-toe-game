import { CELL_VALUE, GAME_STATUS, TURN } from "./constants.js";
import { getCellElementList, getCurrentTurnElement, getGameStatusPosition, getButtonReplace, getCellElementAtIdx } from "./selectors.js";
import {checkGameStatus} from "./utils.js";
/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let isGameEnded = false;
let gameStatuses = GAME_STATUS.PLAYING;
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

function updateGameStatus(gameStatus){
    const getGameStatusElement = getGameStatusPosition()
    if(getGameStatusElement) getGameStatusElement.textContent = gameStatus

}

function showButtonReplay(){
    const getButton = getButtonReplace()
    getButton.classList.add('show')
}

function highlightElementWin(winPositions) {

    for (const positon of winPositions) {
        const cell = getCellElementAtIdx(positon)
        if(cell) cell.classList.add('win')
    }
}



function handleEventClick(cell, index){
    //update values 
   /*  cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;

    console.log(cellValues) */
    //check game status 
    const games = checkGameStatus(cellValues)

    const isFinish = cell.classList.contains(TURN.CROSS) || cell.classList.contains(TURN.CIRCLE);
    const isEndGame =  gameStatuses !== games.status;
    
    if(isFinish || isEndGame) return ;
    
    
    cell.classList.add(currentTurn)


    //update values 
    cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;


    //check game status 
    const game = checkGameStatus(cellValues)

    switch (game.status) {
        case GAME_STATUS.ENDED: {
            updateGameStatus(game.status)
            showButtonReplay()
            break;
        }
        case GAME_STATUS.X_WIN:
        case GAME_STATUS.O_WIN: {
            updateGameStatus(game.status)
            showButtonReplay()
            highlightElementWin(game.winPositions)
            break;
        }
            
    
        default:
            break;
    }

    //toggle turn
    toggleTurn();
}
function checkPlayingDone(){
    const getListCell = getCellElementList();
    for (const cell of getListCell) {
        const isFinish = cell.classList.contains(TURN.CROSS) || cell.classList.contains(TURN.CIRCLE);
        if(isFinish) return  ;
    } 
}

function handleClickButton(){
    const button = getButtonReplace()
    button.addEventListener('click', () => {
        window.location.href = '';
    })
}
(() => {
    const getListCell = getCellElementList();
    getListCell.forEach((cell, index) => {
        cell.addEventListener('click', () => handleEventClick(cell, index));
    });
    checkPlayingDone();
    handleClickButton();
})();