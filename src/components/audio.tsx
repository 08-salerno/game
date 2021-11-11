/* eslint-disable no-console */

const click = new Audio('https://freesound.org/people/joedeshon/sounds/119415/download/119415__joedeshon__rocker-switch.wav');

export function clickSound(): void {
  click.play()
    .catch(console.log);
}

const remove = new Audio('https://freesound.org/people/jalastram/sounds/346338/download/346338__jalastram__fx305.wav');

export function removeSound(): void {
  remove.play()
    .catch(console.log);
}

const shuffle = new Audio('https://freesound.org/people/Breviceps/sounds/447918/download/447918__breviceps__shuffle-cards.wav');

export function shuffleSound(): void {
  //shuffle.loop = true;
  shuffle.play()
    .catch(console.log);
}