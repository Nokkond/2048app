import React from "react";

import styles from "./Header.module.scss";
import { useGameDataContext } from "../../service/contexts";

export const Header = () => {
  const { gameOver, resetGame } = useGameDataContext();

  return (
    <div className={styles.header}>
      <span className={styles.nameTitle}>2048</span>
      {gameOver && <span className={styles.gameOver}>Game Over</span>}
      <span className={styles.newGame} onClick={resetGame}>
        {gameOver ? "Try Again" : "New Game"}
      </span>
    </div>
  );
};
