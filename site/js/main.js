import { menu } from './modules/menu.js'
import { createOverview } from './modules/overview/overview.js'
import { createTraining } from './modules/training/training.js'

require('../css/menu.css')
require('../css/main.css')

const content = document.querySelector('.content');
const trainingMenuItem = document.querySelector('#trainingMenuItem');
const overviewMenuItem = document.querySelector('#overviewMenuItem');

function main() {
    
    const overview = createOverview();
    const training = createTraining();

    overviewMenuItem.addEventListener('click', (e)=> {
        e.preventDefault();
        removeContentComponent(training);
        setContentComponent(overview);
    });
    trainingMenuItem.addEventListener('click', (e)=> {
        e.preventDefault();
        removeContentComponent(overview);
        setContentComponent(training);
    });
    setContentComponent(overview);
}

function setContentComponent(component) {
    content.appendChild(component);
}
function removeContentComponent(component) {
    if (content.contains(component)) {
        content.removeChild(component);
    }
}

menu(this, window.document);
window.addEventListener('load', main);
