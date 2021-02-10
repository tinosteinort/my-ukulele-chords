import { chords } from './../chords.js'
import html from './overview.html';

export const createOverview = function() {

    const overview = document.createElement('div');
    overview.innerHTML = html;

    const chordInput = overview.querySelector('.chord-input');
    const chordsDiv = overview.querySelector('.chords');

    function onFilterChange(e) {
        renderChords(e.target.value);
    }
    function onFocusSelectText() {
        chordInput.select();
    }

    function renderChords(filterValue) {
        chordsDiv.innerHTML = '';
        chords
            .filter(chord => filterValue == undefined || chord.name.toLowerCase().startsWith(filterValue.toLowerCase()))
            .forEach(chord => chordsDiv.innerHTML += renderChordDiv(chord));
    }
    function renderChordDiv(chord) {
        return `<div class=\"chord pure-u-1 pure-u-sm-1-2 pure-u-md-1-3\">
            <img src=\"${chord.file}\" alt=\"Chord ${chord.name}\">
        </div>`;
    }

    chordInput.addEventListener('input', onFilterChange)
    chordInput.addEventListener('focus', onFocusSelectText)

    renderChords();

    return overview;
}
