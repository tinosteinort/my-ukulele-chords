import { chords } from './../chords.js'
import html from './training.html';

export const createTraining = function() {

    const training = document.createElement('div');
    training.innerHTML = html;

    const startTrainingButton = training.querySelector('#train');
    const stopTrainingButton = training.querySelector('#stop');
    const chordInputField = training.querySelector('.chord-input');
    const validationInfo = training.querySelector('.validation-info');
    const durationRange = training.querySelector('.duration-range');
    const chordToTrainDiv = training.querySelector('.chord-to-train');
    var timer = null;

    var trainingRunning = false;

    function chordsAreValid(chordsToTrain) {
        const validChordNames = chords.map(c => c.name.toLowerCase())
        return chordsToTrain
                .map(chordToCheck => validChordNames.includes(chordToCheck))
                .includes(false) == false;
    }
    function duration() {
        return durationRange.value;
    }
    function chordByName(chordName) {
        return chords.filter(chord => chord.name.toLowerCase() === chordName.toLowerCase())[0];
    }
    function startTraining(chordNames) {
        startTrainingButton.disabled = true;
        startTrainingButton.classList.remove('pure-button-primary');
        stopTrainingButton.disabled = false;
        stopTrainingButton.classList.add('pure-button-primary');

        trainingRunning = true;
        timer = setTimeout(nextChord, duration(), chordNames, 0);
    }
    function stopTraining() {
        startTrainingButton.disabled = false;
        startTrainingButton.classList.add('pure-button-primary');
        stopTrainingButton.disabled = true;
        stopTrainingButton.classList.remove('pure-button-primary');

        clearTimeout(timer);
        trainingRunning = false;
    }
    function nextChord(chordNames, index) {
        const currentChordName = chordNames[index];
        const currentChord = chordByName(currentChordName);
        console.log('name:', currentChordName, 'chord', currentChord);
        chordToTrainDiv.innerHTML = renderChordDiv(currentChord);
        if (trainingRunning) {
            if (index + 1 === chordNames.length) {
                index = 0;
            }
            else {
                index++;
            }
            setTimeout(nextChord, duration(), chordNames, index);
        }
    }
    function renderChordDiv(chord) {
        return `<div class=\"chord pure-u-1 pure-u-sm-1-2 pure-u-md-1-3\">
            <img src=\"${chord.file}\" alt=\"Chord ${chord.name}\">
        </div>`;
    }

    function onStartTrainingPushed() {
        const chordInputText = chordInputField.value.trim();
        if (chordInputText === "") {
            return;
        }

        const chordNames = chordInputText.split(',')
            .map(chordName => chordName.trim().toLowerCase());

        if (chordsAreValid(chordNames)) {
            validationInfo.classList.add('hidden');
            startTraining(chordNames);
        }
        else {
            validationInfo.classList.remove('hidden');
        }
    }
    function onStopTrainingPushed() {
        stopTraining();
    }
    
    startTrainingButton.addEventListener('click', onStartTrainingPushed);
    stopTrainingButton.addEventListener('click', onStopTrainingPushed);

    return training;
}
