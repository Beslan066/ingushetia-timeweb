import React, { useRef, useState } from 'react';
import '../../../../public/css/player.css';
import FullScreenIcon from "@/Components/FullScreenIcon.jsx";
import PauseIcon from "@/Components/PauseIcon.jsx";

export default function VideoPlayer({ video, baseUrl, date }) {
    const videoRef = useRef(null);
    const playButtonRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const playVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            playButtonRef.current.style.display = 'none'; // Скрыть кнопку воспроизведения
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            playButtonRef.current.style.display = 'block'; // Показать кнопку воспроизведения
            setIsPlaying(false);
        }
    };

    const toggleFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
            videoRef.current.msRequestFullscreen();
        }
    };

    const handleMouseEnter = () => {
        if (isPlaying) {
            setShowControls(true);
        }
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };

    return (
        <div className="filtered-news-item">
            <div
                className="news-image position-relative d-flex flex-column align-items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    src={`${baseUrl}/storage/${video.video}`}
                    poster={`${baseUrl}/storage/${video.image_main}`}
                    className="video-player"
                >
                    Ваш браузер не поддерживает данный тип видео
                </video>
                <div
                    className="position-absolute gallery-icon play-button"
                    onClick={playVideo}
                    ref={playButtonRef}
                >
                    <img src="/img/icons/play.svg" alt="Play icon"/>
                </div>
                {isPlaying && showControls && (
                    <div className="video-controls-overlay">
                        <button onClick={playVideo}>
                            <PauseIcon />
                        </button>
                        <button onClick={toggleFullScreen}>
                            <FullScreenIcon style={{width: '20px', height: '12px'}} />
                        </button>
                    </div>
                )}
            </div>
            <div className="news-text pl-20 d-flex flex-column justify-content-between">
                <div>
                    <h4>{video.title.slice(0,70)}</h4>
                </div>
                <p className="news-date">{date}</p>
            </div>
        </div>
    );
}
