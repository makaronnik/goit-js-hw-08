import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const throttledUpdateTimeInLocalStorage = throttle(
  updateTimeInLocalStorage,
  1000
);

function setTimeFromLocalStorage() {
  player.setCurrentTime(localStorage.getItem(LOCAL_STORAGE_KEY) || 0);
}

function updateTimeInLocalStorage(seconds) {
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}

function onTimeUpdate({ seconds }) {
  throttledUpdateTimeInLocalStorage(seconds);
}

player.on('timeupdate', onTimeUpdate);

setTimeFromLocalStorage();
