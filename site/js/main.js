import { chords } from './modules/chords.js'
import { menu } from './modules/menu.js'

require('../css/menu.css')
require('../css/main.css')

function chordFilterInput() {
    return document.getElementsByClassName('chord-filter')[0];
}

function chordsDiv() {
    return document.getElementsByClassName('chords')[0];
}

function onFilterChange(e) {
    renderChords(e.target.value);
}
function onFocusSelectText() {
    chordFilterInput().select();
}

function renderChords(filterValue) {
    const div = chordsDiv();
    div.innerHTML = '';
    chords
        .filter(chord => filterValue == undefined || chord.name.toLowerCase().startsWith(filterValue.toLowerCase()))
        .forEach(chord => div.innerHTML += renderChordDiv(chord));
}

function renderChordDiv(chord) {
    return `<div class=\"chord pure-u-1 pure-u-sm-1-2 pure-u-md-1-3\">
        <img src=\"${chord.file}\" alt=\"Chord ${chord.name}\">
    </div>`;
}


function main() {
    chordFilterInput().addEventListener('input', onFilterChange)
    chordFilterInput().addEventListener('focus', onFocusSelectText)
    renderChords()
}

menu(this, window.document);
window.addEventListener('load', main);
