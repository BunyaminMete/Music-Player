// eslint-disable-next-line no-unused-vars
import React from "react";
import InputComponent from "../../../components/input/input";
import "./style.css";

const FlaskData = () => {
  const [mp3Data, setmp3Data] = React.useState();
  const [url, setURL] = React.useState("");

  const fetchStart = async () => {
    await fetch(`http://127.0.0.1:5000/api2/youtube?url=${url}`)
      .then((res) => res.json())
      .then((res) => setmp3Data(res))
      .catch((err) => console.log(err));

    mp3Data && console.log(mp3Data);
  };

  return (
    <>
      <div className="centeredArea">
        <div className="songFrame">
          {mp3Data && (
            <div className="fetchedSong">
              <img
                className="thumbnail"
                src={mp3Data.info.thumbnail}
                alt="video-thumbnail"
              ></img>

              <div className="title">{mp3Data.info.title}</div>
            </div>
          )}
        </div>

        <br />

        <InputComponent
          onchange={(event) => {
            setURL(event.target.value);
          }}
        />
        <div className="fetchArea">
          <button className="fetchButton" onClick={fetchStart}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default FlaskData;
