import React, { useState, useRef, useEffect } from "react";
import chipiChipiAudio from "../../public/aga.mp3"; // Changed import

const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 1;
            audioRef.current.play();
        }
    }, []);

    return (
        <div>
            <audio ref={audioRef} src={chipiChipiAudio} loop />

            <button
                onClick={togglePlayPause}
                className="noselect"
                style={{
                    backgroundColor: isPlaying ? "red" : "green",
                    color: "black",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 9999,
                    position: "absolute",
                    right: "5vw",
                    top: "0",
                    fontSize: `min(3vh,3vw)`,
                }}
            >
                {"Music "}
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default MusicPlayer;
