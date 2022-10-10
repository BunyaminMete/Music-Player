import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./home.css";

import CurrentSongInformations from "../../../components/information/informations";
import FavoriteButton from "../../../components/favbutton/favorite";
import { Favorite } from "../../../context/store";
import {
  PauseIcon,
  SkipIcon,
  SkipBackIcon,
  PlayIcon,
  HoistMP3,
  SandmanMP3,
  MetallicaMP3,
} from "../../../import/assets.js";

const songs = [HoistMP3, SandmanMP3, MetallicaMP3];
const singers = ["Colm Macguinnes", "Metallica", "Metallica"];
const songNames = [
  "HOIST THE COLORS",
  "ENTER SANDMAN",
  "RIDE THE LIGHTNING COMES INTO",
];

const images = [
  "https://neredecekiliyor.com/wp-content/uploads/2020/04/Karayip-Korsanlar%C4%B1-Nerede-%C3%87ekildi.jpg",
  "https://m.media-amazon.com/images/M/MV5BYmU0N2EzNmQtMzdhNS00ZjQ2LWI3NzUtZWM4YjlhNDg0OGZkXkEyXkFqcGdeQXVyNDE4OTY5NzI@._V1_.jpg",
  "https://external-preview.redd.it/dm15HUeSzRA4ginUNRyV0mEqcoLwP3pZ-h6N9RawlFM.jpg?auto=webp&s=768cd1485dce9313b822683e432d87c7abd678b2",
];

const HomePage = () => {
  const [count, setCount] = React.useState(Number);
  const [songIndex, setSongIndex] = React.useState(Number);
  const [whatsTime, setWhatsTime] = React.useState("");
  const [cleanName, setCleanName] = React.useState(songNames[0]);
  const [showIcon, setShowIcon] = React.useState(false);

  const timeCounter = React.useRef();
  const musicEvent = React.useRef();
  const bgRef = React.useRef();
  const seekbarProgress = React.useRef();

  const songEnd = () => {
    musicEvent.current.currentTime === musicEvent.current.duration &&
      skipEvent();
  };

  setTimeout(() => {
    songEnd();
  }, 1000);

  const playMusic = () => {
    musicEvent.current.play();
    count % 2 === 0 ? musicEvent.current.play() : musicEvent.current.pause();
    setCount(count + 1);
  };

  const skipBackEvent = () => {
    if (songIndex > 0) {
      Favorite.isFavorite = 0;

      setSongIndex(songIndex - 1);
      musicEvent.current.src = songs[songIndex - 1];
      bgRef.current.style.backgroundImage = `url(${images[songIndex - 1]})`;
      if (songNames[songIndex - 1].length > 27) {
        setCleanName(
          songNames[songIndex - 1].split(" ").splice(0, 4).join(" ") + "..."
        );
      } else {
        setCleanName(songNames[songIndex - 1]);
      }
    } else {
      musicEvent.current.currentTime = 0;
      bgRef.current.style.backgroundImage = `url(${images[0]})`;
    }
    musicEvent.current.play();
    count % 2 === 0 && setCount(count + 1);
  };

  function skipEvent() {
    console.log("skipevent çalıştı");
    console.log(songIndex, "<", songs.length - 1);

    if (songIndex < songs.length - 1) {
      Favorite.isFavorite = 0;
      setSongIndex(songIndex + 1);
      musicEvent.current.src = songs[songIndex + 1];
      bgRef.current.style.backgroundImage = `url(${images[songIndex + 1]})`;

      if (songNames[songIndex + 1].length > 27) {
        setCleanName(
          songNames[songIndex + 1].split(" ").splice(0, 4).join(" ") + "..."
        );
      } else {
        setCleanName(songNames[songIndex + 1]);
      }
    }

    musicEvent.current.play();
    count % 2 === 0 && setCount(count + 1);
  }

  const seekBarPlay = () => {
    let progress = seekbarProgress.current.value;
    musicEvent.current.currentTime = progress / 1000;
  };

  useEffect(() => {
    bgRef.current.style.backgroundImage = `url(${images[0]})`;

    musicEvent.current.addEventListener("loadeddata", (v) => {
      seekbarProgress.current.max = v.srcElement.duration * 1000;
      musicEvent.current.addEventListener("timeupdate", (timeEvent) => {
        if (timeEvent?.timeStamp) {
          seekbarProgress.current.value = musicEvent.current.currentTime * 1000;
        }
        var hr, min, sec;
        let time = musicEvent.current.currentTime;
        hr = Math.floor(time / 3600);
        min = Math.floor((time - hr * 3600) / 60);
        sec = Math.floor(time - hr * 3600 - min * 60);

        min = min > 9 ? min : "0" + min;
        sec = sec > 9 ? sec : "0" + sec;
        setWhatsTime(min + ":" + sec);
      });
    });
  }, []);

  return (
    <>
      <Helmet>
        <style>{"body { background-color: rgb(20, 84, 183); } "}</style>
      </Helmet>

      <div ref={bgRef} className="playArea">
        <audio ref={musicEvent}>
          <source src={songs[songIndex]} type="audio/mpeg"></source>
        </audio>

        <div
          className="fullControl"
          onMouseEnter={() => {
            setShowIcon(true);
          }}
          onMouseLeave={() => {
            if (Favorite.isFavorite % 2 !== 0) {
              setShowIcon(true);
            } else {
              setShowIcon(false);
            }
          }}
        >
          <br />
          {showIcon === true && <FavoriteButton />}

          <CurrentSongInformations
            className="songInfo"
            singer={singers[songIndex]}
            song={cleanName}
          />

          <div className="slider-container">
            <input
              type="range"
              min="0"
              ref={seekbarProgress}
              className="seekbar-counter"
              onChange={seekBarPlay}
            ></input>
            <div className="time">
              <span ref={timeCounter}>{whatsTime}</span>
            </div>
          </div>

          <div id="controlButtons">
            <button onClick={skipBackEvent} className="playButton">
              <img className="playImage" src={SkipBackIcon} alt="play button" />
            </button>

            <button onClick={playMusic} className="playButton">
              {count % 2 === 0 ? (
                <img className="playImage" src={PlayIcon} alt="play button" />
              ) : (
                <img className="pauseImage" src={PauseIcon} alt="play button" />
              )}
            </button>

            <button onClick={skipEvent} className="playButton">
              <img className="playImage" src={SkipIcon} alt="play button" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <a href="https://github.com/BunyaminMete" alt="github-link">
          <img
            className="github"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github"
          ></img>
        </a>
      </div>
    </>
  );
};

export default HomePage;
