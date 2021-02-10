import { chords } from './../chords.js'
import html from './training.html';

export const createTraining = function() {

    const training = document.createElement('div');
    training.innerHTML = html;

    const startTrainingButton = training.querySelector('#train');
    const stopTrainingButton = training.querySelector('#stop');
    const chordInputField = training.querySelector('.chord-input');
    const validationInfo = training.querySelector('.validation-info');

    function chordsAreValid(chordsToTrain) {
        const validChordNames = chords.map(c => c.name.toLowerCase())
        return chordsToTrain
                .map(chordToCheck => validChordNames.includes(chordToCheck))
                .includes(false) == false;
    }

    function startTraining() {
        const chordInputText = chordInputField.value.trim();
        if (chordInputText === "") {
            return;
        }

        const chordNames = chordInputText.split(',')
            .map(chordName => chordName.toLowerCase());

        if (chordsAreValid(chordNames)) {
            validationInfo.classList.add('hidden');
        }
        else {
            validationInfo.classList.remove('hidden');
        }
    }
    function stopTraining() {

    }
    
    startTrainingButton.addEventListener('click', startTraining);
    stopTrainingButton.addEventListener('click', stopTraining);

    return training;
}
