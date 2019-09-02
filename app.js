function setPiece(piece, position) {
    let img = document.createElement('img');
    img.src = "resources/" +  piece + ".png";

    // Easiest way to keep track of positions
    img.alt = piece + " " + position;

    let row = document.getElementsByClassName(position.substring(1,2))[0];
    let col = row.getElementsByClassName(position.substring(0,1))[0];

    col.firstChild.appendChild(img);
}

function clearSquare(position) {
    let row = document.getElementsByClassName(position.substring(1,2))[0];
    let col = row.getElementsByClassName(position.substring(0,1))[0];
    col.firstChild.innerHTML = '';
}

// TODO: add input to choose color you want to play
function setInitialState(color) {
    let top = color.toLowerCase() === 'black' ? 'white' : 'black';
    let bot = color.toLowerCase() === 'black' ? 'black' : 'white';

    // Top main pieces
    setPiece(top + '-rook', 'A8');
    setPiece(top + '-knight', 'B8');
    setPiece(top + '-rook', 'C8');
    setPiece(top + '-queen', 'D8');
    setPiece(top + '-king', 'E8');
    setPiece(top + '-rook', 'F8');
    setPiece(top + '-knight', 'G8');
    setPiece(top + '-rook', 'H8');

    // Top pawns
    for (let i = 8; i > 0; i--) {
        setPiece(top + '-pawn', String.fromCharCode(64 + i) + '7');
    }

    // Bot main pieces
    setPiece(bot + '-rook', 'A1');
    setPiece(bot + '-knight', 'B1');
    setPiece(bot + '-rook', 'C1');
    setPiece(bot + '-king', 'D1');
    setPiece(bot + '-queen', 'E1');
    setPiece(bot + '-rook', 'F1');
    setPiece(bot + '-knight', 'G1');
    setPiece(bot + '-rook', 'H1');

    // Bot pawns
    for (let i = 8; i > 0; i--) {
        setPiece(bot + '-pawn', String.fromCharCode(64 + i) + '2');
    }
}

function clearBoard() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            clearSquare(String.fromCharCode(64 + i) + j);
        }
    }
}

setInitialState('white');

// Controls
document.getElementById('reset-button').onclick = function(){
    clearBoard();

    let c = document.getElementById('color-selector');
    setInitialState(c.options[c.selectedIndex].value);
};
document.getElementById('clear-button').onclick = clearBoard;
