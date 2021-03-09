import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBa4jn_WFwfBkYrEDNTFT_zK-WoatrWxUU',
  authDomain: 'luv-game-9474c.firebaseapp.com',
  projectId: 'luv-game-9474c',
  storageBucket: 'luv-game-9474c.appspot.com',
  messagingSenderId: '925086142444',
  appId: '1:925086142444:web:5636f66f99212a7638bac9',
  databaseURL: 'https://luv-game-9474c-default-rtdb.firebaseio.com',
};

firebase.initializeApp(firebaseConfig);

export const databaseRef = firebase.database().ref('/leaderboard');

type writeParameters = {
  playerName: string
  playerScore: number
}

type score = {
    playerName: string
    playerScore: number
}

export const writeScore = (
  { playerName, playerScore }: writeParameters,
): Promise<void> => {
  const newLeaderboard = databaseRef.push();

  return newLeaderboard.set({
    playerName,
    playerScore,
  });
};

export const readScores = async (): Promise<score[] | null> => {
  try {
    const snapshot = await databaseRef.get();

    if (snapshot.exists()) {
      const finalData: score[] = [];

      snapshot.forEach((childSnapshot) => {
        finalData.push(childSnapshot.val());
      });

      return finalData.sort((scoreA, scoreB) => scoreB.playerScore - scoreA.playerScore);
    }

    return null;
  } catch {
    return null;
  }
};
