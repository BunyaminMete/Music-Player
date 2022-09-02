import "./style.css";

const CurrentSongInformations = ({ singer, song, className }) => {
  return (
    <div className={className}>
      {singer} - {song}
    </div>
  );
};
export default CurrentSongInformations;
