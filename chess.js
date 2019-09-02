// Game mechanics
function selectPiece(piece) {
    console.log(piece.alt);
}

for (let img of document.getElementsByTagName('img')){
    img.onclick = function() {selectPiece(img)};
}


