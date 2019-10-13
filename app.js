class Piece {
    constructor(color, position, containing_element) {
        this.color = color;
        this.position = position;

        this.containing_element = containing_element;

        this.background_color = this.containing_element.style.background;
        this.selected = false;

        // // Make the class abstract
        // if (this.constructor === Piece) {
        //     throw new TypeError('Abstract class "Piece" cannot be instantiated directly.'); 
        // }

        // // No interfaces in javascript so this will have to do
        // if (this.move === undefined || typeof(this.move) !== "function") {
        //     throw new TypeError('Classes extending the piece abstract class need to implement the move function.');
        // }

        // if (this.available_moves === undefined || typeof(this.available_moves) !== "function") {
        //     throw new TypeError('Classes extending the piece abstract class need to implement the available_moves function.');
        // }
    }

    select() {
        if (this.selected) {
            this.unselect();
            return;
        }

        // Unselect all the pieces first
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].unselect();
        }
        
        console.log(
            {
                'piece': this.color + ' ' + this.constructor.name,
                'position': this.position
            });

        this.containing_element.style.background = 'red';
        this.selected = true;
    }

    unselect() {
        if (!this.selected) return;

        this.containing_element.style.background = this.background_color;
        this.selected = false;
    }
}

class Rook extends Piece {
    available_moves() {
        // Get the available moves
    }

    move(position) {
        // Move to a position
    }
}

class Knight extends Piece {
    available_moves() {
        // Get the available moves
    }

    move(position) {
        // Move to a position
    }
}

class Bishop extends Piece {
    available_moves() {
        // Get the available moves
    }

    move(position) {
        // Move to a position
    }
}

class Queen extends Piece {
    available_moves() {
        // Get the available moves
    }

    move(position) {
        // Move to a position
    }
}

class King extends Piece {
    available_moves() {
        // Get the available moves
    }

    move(position) {
        // Move to a position
    }
}

class Pawn extends Piece {
    available_moves() {
        // Get the available moves
    }

    move(position) {
        // Move to a position
    }
}

pieces = []

function setPiece(piece, position) {
    let img = document.createElement('img');
    img.src = "resources/" +  piece + ".png";

    // Easiest way to keep track of positions
    img.alt = piece + " " + position;

    let row = document.getElementsByClassName(position.substring(1,2))[0];
    let col = row.getElementsByClassName(position.substring(0,1))[0];

    col.firstChild.appendChild(img);

    piece = new Piece(piece.split('-')[0], position, col.firstChild);
    pieces.push(piece);

    img.onclick = function() {
        piece.select();
    };
}

// TODO: add input to choose color you want to play
function setInitialState(color) {
    let top = color.toLowerCase() === 'black' ? 'white' : 'black';
    let bot = color.toLowerCase() === 'black' ? 'black' : 'white';

    // Top main pieces
    setPiece(top + '-rook', 'A8');
    setPiece(top + '-knight', 'B8');
    setPiece(top + '-bishop', 'C8');
    setPiece(top + '-queen', 'D8');
    setPiece(top + '-king', 'E8');
    setPiece(top + '-bishop', 'F8');
    setPiece(top + '-knight', 'G8');
    setPiece(top + '-rook', 'H8');

    // Top pawns
    for (let i = 8; i > 0; i--) {
        setPiece(top + '-pawn', String.fromCharCode(64 + i) + '7');
    }

    // Bot main pieces
    setPiece(bot + '-rook', 'A1');
    setPiece(bot + '-knight', 'B1');
    setPiece(bot + '-bishop', 'C1');
    setPiece(bot + '-king', 'D1');
    setPiece(bot + '-queen', 'E1');
    setPiece(bot + '-bishop', 'F1');
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
            position = String.fromCharCode(64 + i) + j;

            let row = document.getElementsByClassName(position.substring(1,2))[0];
            let col = row.getElementsByClassName(position.substring(0,1))[0];
            col.firstChild.innerHTML = '';
        }
    }

    pieces = [];
}

setInitialState('white');

// Controls
document.getElementById('reset-button').onclick = function(){
    clearBoard();

    let c = document.getElementById('color-selector');
    setInitialState(c.options[c.selectedIndex].value);
};
document.getElementById('clear-button').onclick = clearBoard;
