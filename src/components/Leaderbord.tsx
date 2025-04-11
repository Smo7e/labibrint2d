import React, { useEffect, useState } from "react";
import { EPAGES } from "../App";

interface LeaderboardProps {
    onClose: Function;
}

type LeaderboardEntry = {
    name: string;
    time: number;
};
const openDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("leaderboardDB", 1); // Имя базы данных и версия

        request.onupgradeneeded = (e) => {
            const db = (e.target as IDBRequest).result;
            if (!db.objectStoreNames.contains("leaderboard")) {
                const store = db.createObjectStore("leaderboard", { autoIncrement: true });
                store.createIndex("timeIndex", "time"); // Индекс для сортировки по времени
                store.createIndex("movesIndex", "moves"); // Индекс для сортировки по ходам
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};
export const saveToLeaderboard = async (time: number, name: string) => {
    const newEntry: LeaderboardEntry = {
        name,
        time,
    };

    const db = await openDB();

    const transaction = db.transaction("leaderboard", "readwrite");
    const store = transaction.objectStore("leaderboard");

    store.add(newEntry);

    const leaderboard = await new Promise<LeaderboardEntry[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as LeaderboardEntry[]);
        request.onerror = () => reject("Failed to retrieve leaderboard");
    });

    leaderboard.sort((a, b) => a.time - b.time);

    const topEntries = leaderboard.slice(0, 10);

    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
        topEntries.forEach((entry) => store.add(entry));
    };

    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject();
    });
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    const db = await openDB();
    const transaction = db.transaction("leaderboard", "readonly");
    const store = transaction.objectStore("leaderboard");

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
            resolve(request.result as LeaderboardEntry[]);
        };
        request.onerror = () => {
            reject("Failed to retrieve leaderboard");
        };
    });
};

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    // const clearLeaderboard = async () => {
    //     const password = prompt("Введите пароль для удаления данных: ");
    //     if (password === "Password") {
    //         const db = await openDB();
    //         const transaction = db.transaction("leaderboard", "readwrite");
    //         const store = transaction.objectStore("leaderboard");
    //         store.clear();

    //         transaction.oncomplete = () => {
    //             setLeaderboard([]);
    //             alert("Таблица лидеров очищена!");
    //         };
    //         transaction.onerror = () => {
    //             alert("Произошла ошибка при очистке данных.");
    //         };
    //     } else {
    //         alert("Неверный пароль!");
    //     }
    // };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const data = await getLeaderboard();
            setLeaderboard(data);
        };

        fetchLeaderboard();
    }, []);

    return (
        <>
            <div style={{ display: "flex", height: "80vh", width: "80vw" }}>
                <div className="leaderboard">
                    <div style={{ width: "100%", textAlign: "center", fontSize: "3vw" }}>Таблица лидеров</div>
                    <table style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                            <tr style={{ fontSize: "min(2vw, 3vh)", height: "min(6.5vh, 6.5vw)", width: "100%" }}>
                                <th>№</th>
                                <th>Имя</th>
                                <th>Время(сек)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr
                                    key={index}
                                    style={{ fontSize: "min(2vw, 3vh)", height: "min(6.5vh, 6.5vw)", width: "100%" }}
                                >
                                    <td>{index + 1}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button
                style={{ fontSize: "min(2vw, 3vh)", height: "min(6.5vh, 6.5vw)" }}
                onClick={() => onClose(EPAGES.MENU)}
            >
                Назад
            </button>
        </>
    );
};

export default Leaderboard;
