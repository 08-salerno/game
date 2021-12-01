/* eslint-disable no-console */
import clickSoundFile from '../static/assets/audio/click.wav';
import removeSoundFile from '../static/assets/audio/remove.wav';
import shuffleSoundFile from '../static/assets/audio/shuffle.wav';

const click = document.createElement('audio');
click.src = clickSoundFile;

export function clickSound(): void {
  click.play()
    .catch(console.log);
}

const remove = document.createElement('audio');
remove.src = removeSoundFile;

export function removeSound(): void {
  remove.play()
    .catch(console.log);
}

const shuffle = document.createElement('audio');
shuffle.src = shuffleSoundFile;

export function shuffleSound(): void {
  //shuffle.loop = true;
  shuffle.play()
    .catch(console.log);
}
