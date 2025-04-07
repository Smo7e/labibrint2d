import React, { useState, useEffect } from "react";
import "./Win.css";
import { saveToLeaderboard } from "./Leaderbord";
import { EPAGES } from "../App";

interface IWinProps {
    setEpages: Function;
    gameStats: { time: number };
}

const Win: React.FC<IWinProps> = ({ gameStats, setEpages }) => {
    const [name, setName] = useState(""); // Состояние для имени игрока
    const [isNameEntered, setIsNameEntered] = useState(false); // Проверка, введено ли имя
    useEffect(() => {
        if (isNameEntered) {
            saveToLeaderboard(gameStats.time, name);
        }
    }, [isNameEntered, gameStats, name]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleNameSubmit = () => {
        if (name.trim() === "") {
            alert("Пожалуйста, введите ваше имя!");
        } else {
            setIsNameEntered(true); // Устанавливаем, что имя введено
        }
    };

    return (
        <div className="win-container">
            <h1 className="win-title">Победа!</h1>
            {!isNameEntered ? (
                <div className="name-input-container">
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Введите ваше имя"
                        className="name-input"
                    />
                    <button className="win-button" onClick={handleNameSubmit}>
                        Сохранить и продолжить
                    </button>
                </div>
            ) : (
                <div className="win-buttons">
                    <button className="win-button" onClick={() => setEpages(EPAGES.MENU)}>
                        Меню
                    </button>
                </div>
            )}
        </div>
    );
};

export default Win;
