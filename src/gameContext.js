import React, {useContext, useState} from "react";

export const GameContext = React.createContext({});

export const GameProvider = ({children}) => {
    const [data,setData] = useState([
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
    );

    const [gameOver, setGameOver] = useState(false);

    
    const value = {data, setData, gameOver, setGameOver}

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)
