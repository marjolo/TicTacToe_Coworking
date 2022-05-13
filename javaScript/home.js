'use strict';

(function() {
    const btnSingleplayer = document.querySelector('#singleplayer');
    const btnMultiplayer = document.querySelector('#multiplayer');
    const btnSpelregels = document.querySelector('#spelregels');

    btnSingleplayer.addEventListener('click', () => location.href = './game/');
    btnMultiplayer.addEventListener('click', () => location.href='./game/');
})();