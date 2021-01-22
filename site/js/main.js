import { chords } from './modules/chords.js'

require('../css/main.css')

function main() {
    const chordsDiv = document.getElementsByClassName('chords')[0];
    chords.forEach(chord => chordsDiv.innerHTML += renderChordDiv(chord));
}

function renderChordDiv(chord) {
    return `<div class=\"chord pure-u-1 pure-u-sm-1-2 pure-u-md-1-3\">
        <img src=\"${chord.file}\" alt=\"Chord ${chord.name}\">
    </div>`;
}

window.addEventListener('load', main);
