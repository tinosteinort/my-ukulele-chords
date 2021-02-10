import html from './training.html';

export const createTraining = function() {

    const training = document.createElement('div');
    training.innerHTML = html;

    const trainButton = training.querySelector('#train');
    
    trainButton.addEventListener('click',()=> console.log('train'));

    return training;
}
