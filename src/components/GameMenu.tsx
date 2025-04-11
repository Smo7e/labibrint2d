import React from "react";
import { EPAGES } from "../App";

interface GameMenuProps {
    setEpages: Function;
}

const GameMenu: React.FC<GameMenuProps> = ({ setEpages }) => {
    return (
        <nav className="game-menu">
            <button
                className="game-menu__button glow-on-hover"
                onClick={() => setEpages(EPAGES.GAME)}
                type="button"
                aria-label="Начать игру"
            >
                Играть
            </button>
            <button
                className="game-menu__button glow-on-hover"
                onClick={() => setEpages(EPAGES.TABLES)}
                type="button"
                aria-label="Просмотреть таблицы лидеров"
            >
                Таблицы
            </button>
        </nav>
    );
};

export default GameMenu;
