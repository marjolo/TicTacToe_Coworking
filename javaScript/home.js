'use strict';

(function() {
    const btnSingleplayer = document.querySelector('#singleplayer');
    const btnMultiplayer = document.querySelector('#multiplayer');
    const btnSpelregels = document.querySelector('#spelregels');

    btnSingleplayer.addEventListener('click', () => location.href = './gameSinglePlayer/');
    btnMultiplayer.addEventListener('click', () => location.href='./gameMultiplayer/');
    btnSpelregels.addEventListener('click', () => location.href='./spelregels/');
})();