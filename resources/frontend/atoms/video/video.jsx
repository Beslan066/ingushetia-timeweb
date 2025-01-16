import React, { useRef, useState } from "react";
import './video.css';
import PauseIcon from "#/atoms/icons/pause.jsx";
import PlayIcon from "#/atoms/icons/play.jsx";
import FullscreenIcon from "#/atoms/icons/fullscreen.jsx";
export default function Video({ video, image }) {
  const videoRef = useRef(null);
  const playButtonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const playVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleControlsToggle = () => {
    if (!isPlaying) {
      return;
    }
    setShowControls(!showControls);
  }

  return (
    <div className="video-container" onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave } onClick={ () => handleControlsToggle() }>
      <video
        ref={ videoRef }
        src={ `/storage/${ video }` }
        poster={ `/storage/${ image }` }
        className="video-player"
      >
        Ваш браузер не поддерживает данный тип видео
      </video>
      {
        isPlaying && showControls && (
          <div className="video-controls-overlay">
            <button onClick={ playVideo }>
              <PauseIcon/>
            </button>
            <button onClick={ toggleFullScreen }>
              <FullscreenIcon style={ { width: '20px', height: '12px' } }/>
            </button>
          </div>
        )
      }
      <button onClick={ playVideo } ref={ playButtonRef } className="play-button">
        <PlayIcon />
      </button>
    </div>
  )
}
