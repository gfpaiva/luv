import Phaser from 'phaser';

import { config } from './config';
import { Main } from './scenes';

import { writeScore, readScores } from './services';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('Main', Main);

    this.scene.start('Main');
  }
}

declare global {
  interface Window {
    game: Game,
  }
}

const onLoad = async () => {
  const play = document.getElementById('play');
  const instructions = document.getElementById('instructions');
  const gameContainer = document.getElementById('game-container');
  const form = document.getElementById('form');
  const leaderboardContainer = document.getElementById('leaderboard-container');
  const leaderboardData = document.getElementById('leaderboard-data');

  play?.addEventListener('click', () => {
    instructions?.classList.add('hide');
    gameContainer?.classList.remove('hide');

    window.game = new Game();
  });

  form?.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const btnSubmit: HTMLButtonElement | null = document.querySelector('.btn[type="submit"]');

    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = '💘 Enviando! 💘';
    }

    const nameInput: HTMLInputElement | null = document.querySelector('.name-input');
    const playerName = nameInput?.value || '';

    const MainScene = window?.game?.scene?.scenes[0] as Main;
    const playerScore = MainScene?.score || 0;

    await writeScore({
      playerName,
      playerScore,
    });

    // I'm cheating 😁
    await writeScore({
      playerName: 'Guilherme',
      playerScore: playerScore + 1,
    });

    form.classList.add('hide');
    leaderboardContainer?.classList.remove('hide');

    const leaderboardScores = await readScores();
    if (leaderboardScores) {
      const tableData = leaderboardScores.map((leaderboardScore) => `
          <tr>
            <td>${leaderboardScore.playerName}</td>
            <td>${leaderboardScore.playerScore}</td>
          </tr>
        `).join('');

      if (leaderboardData) {
        leaderboardData.innerHTML = tableData;
      }
    }
  });
};

window.onload = onLoad;
