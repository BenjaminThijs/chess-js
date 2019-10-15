class ChessBoard {
    constructor(table) {
        this.table = table;

        this.squares = [];
        this.pieces = [];

        this.primary_color = 'white';

        this.set_squares();
        this.setInitialState();
    }

    unselect_all_pieces() {
        this.pieces.forEach(piece => piece.unselect());
    }

    get_square_by_name(name) {
        // We're assuming this never goes wrong, otherwise we're ducked
        return this.squares.filter(square => square.name === name)[0];
    }

    set_squares() {
        // JS-scopes are bs
        let self = this;

        // Yeh, table.children returns the tbody, but table has no firstChild... JS? more like BS.
        let rows = this.table.children[0].children;

        // Foreach loops are nice, until you get into scopes :/
        Array.from(rows).forEach(function(row) {
            let row_num = row.className;

            // JS-scopes are still bs
            let _this = self;

            Array.from(row.children).forEach(function(col) {
                let col_char = col.className;
                let position = {'x': col_char.charCodeAt(0), 'y': row_num};
                let div = col.firstChild;

                _this.squares.push(new Square(col_char+row_num, position, div));
            });
        });

        // Do we want this? not sure
        // Do we want the other one? idk
        // Hotel? Trivago

        // for (let i = 0; i < rows.length; i++) {
        //     let row_num = rows[i].className;
        //     let cols = rows[i].children;

        //     for (let j = 0; j < cols.length; j++) {
        //         let col_char = cols[j].className;
        //         let position = {'x': col_char.charCodeAt(0), 'y': row_num};
        //         let div = cols[j].firstChild;

        //         this.squares.push(new Square(col_char+row_num, position, div));
        //     }
        // }
    }

    setPiece(piece_name, position, player_number) {
        let img = document.createElement('img');
        img.src = "resources/" +  piece_name + ".png";
        img.alt = piece_name;
    
        let square = this.get_square_by_name(position);

        square.element.appendChild(img);
    
        let piece_color = piece_name.split('-')[0];
        let piece_type = piece_name.split('-')[1];

        let piece;
    
        // Find a better way to do this
        switch (piece_type) {
            case 'rook':
                piece = new Rook(this, piece_color, square, player_number);
                break;
            case 'knight':
                piece = new Knight(this, piece_color, square, player_number);
                break;
            case 'bishop':
                piece = new Bishop(this, piece_color, square, player_number);
                break;
            case 'queen':
                piece = new Queen(this, piece_color, square, player_number);
                break;
            case 'king':
                piece = new King(this, piece_color, square, player_number);
                break;
            case 'pawn':
                piece = new Pawn(this, piece_color, square, player_number);
                break;
            default:
                piece = new Piece(this, piece_color, square, player_number);
                break; 
        }
        
        this.pieces.push(piece);
    }
    
    setInitialState() {
        let top = this.primary_color.toLowerCase() === 'black' ? 'white' : 'black';
        let top_player_number = top === 'white' ? 1 : 2;

        let bot = this.primary_color.toLowerCase() === 'black' ? 'black' : 'white';
        let bot_player_number = bot === 'white' ? 1 : 2;

        // Top main pieces
        this.setPiece(top + '-rook', 'A8', top_player_number);
        this.setPiece(top + '-knight', 'B8', top_player_number);
        this.setPiece(top + '-bishop', 'C8', top_player_number);
        this.setPiece(top + '-queen', 'D8', top_player_number);
        this.setPiece(top + '-king', 'E8', top_player_number);
        this.setPiece(top + '-bishop', 'F8', top_player_number);
        this.setPiece(top + '-knight', 'G8', top_player_number);
        this.setPiece(top + '-rook', 'H8', top_player_number);

        // Top pawns
        for (let i = 8; i > 0; i--) {
            this.setPiece(top + '-pawn', String.fromCharCode(64 + i) + '7', top_player_number);
        }

        // Bot main pieces
        this.setPiece(bot + '-rook', 'A1', bot_player_number);
        this.setPiece(bot + '-knight', 'B1', bot_player_number);
        this.setPiece(bot + '-bishop', 'C1', bot_player_number);
        this.setPiece(bot + '-king', 'D1', bot_player_number);
        this.setPiece(bot + '-queen', 'E1', bot_player_number);
        this.setPiece(bot + '-bishop', 'F1', bot_player_number);
        this.setPiece(bot + '-knight', 'G1', bot_player_number);
        this.setPiece(bot + '-rook', 'H1', bot_player_number);

        // Bot pawns
        for (let i = 8; i > 0; i--) {
            this.setPiece(bot + '-pawn', String.fromCharCode(64 + i) + '2', bot_player_number);
        }
    }
    
    clearBoard() {
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                let position = String.fromCharCode(64 + i) + j;
    
                let row = document.getElementsByClassName(position.substring(1,2))[0];
                let col = row.getElementsByClassName(position.substring(0,1))[0];
                col.firstChild.innerHTML = '';
            }
        }
    
        this.pieces = [];
    }
}

class Square {
    constructor(name, position, element) {
        // Name eg. B4, E2, H6, ...
        this.name = name;

        // Position is a dictionary with values 'x' and 'y', (0,0) is the bottom-left of the grid
        this.position = position;
        this.element = element;
        
        this.base_background = this.element.style.background;
        this.selected_color = 'red';
        this.available_move_color = 'green';

        this.selected = false;
    }

    select() {
        this.show_as_selected();
        this.selected = true;
    }

    show_as_selected() {
        this.element.style.background = this.selected_color;
        this.selected = true;
    }

    show_as_available_move() {
        this.element.style.background = this.available_move_color;
    }

    reset_color() {
        this.element.style.background = this.base_background;
        this.selected = false;
    }
}

class Piece {
    constructor(chessBoard, color, square, player_number) {
        // We need this to have access to the other pieces and squares
        this.chessBoard = chessBoard;

        this.color = color;
        this.square = square;

        // Which player controls the piece (player 1 or player 2)
        this.player_number = player_number;

        this.available_moves = [];

        // Make the class abstract
        if (this.constructor === Piece) {
            throw new TypeError('Abstract class "Piece" cannot be instantiated directly.'); 
        }

        this.square.element.onclick = _ => this.select();
    }

    select() {
        if (this.square.selected) {
            this.square.reset_color();
            return;
        }
        
        this.chessBoard.unselect_all_pieces();
        
        // Select this piece (actually the square)
        this.square.select();

        // DEBUG
        console.log(
            {
                'color': this.color,
                'square': this.square.name,
                'player': this.player_number
            });

        // Show them to the user
        // this.show_available_moves();
    }

    unselect() {
        this.square.reset_color();

        // this.available_moves.forEach(function(square) {
        //     square.reset_color();
        // });
    }

    // It is assumed this will be implemented
    move() {
        this.available_moves = [];
        this.unselect();

        // TODO: do the rest
    }

    // It is assumed this will be implemented
    get_available_moves() {
        throw new TypeError('Classes extending the Piece abstract class need to implement the available_moves function.');
    }

    show_available_moves() {
        // Get the available moves, not needed if we haven't moved since last time we got them
        // So we need to reset it everytime we move
        if (this.available_moves === []) {
            this.available_moves = this.get_available_moves();
        }

        // The actual showing of the available squares
        this.available_moves.forEach(square => square.show_as_available_move());
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

chessBoard = new ChessBoard(document.getElementById('chess-board'));

// Controls
document.getElementById('reset-button').onclick = function(){
    chessBoard.clearBoard();

    let c = document.getElementById('color-selector');

    chessBoard.primary_color = c.options[c.selectedIndex].value;
    chessBoard.setInitialState();
};
document.getElementById('clear-button').onclick = chessBoard.clearBoard;
