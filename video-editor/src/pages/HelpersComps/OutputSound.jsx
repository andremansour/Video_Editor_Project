const OutputSound = ({ handleDownload, soundSrc }) => {
    return soundSrc ? (
      <article className="grid_txt_2">
        <div className="bord_g_2 p_2">
          <audio src={soundSrc} autoPlay controls></audio>
        </div>
        <button onClick={handleDownload} className="btn btn_g">
          {" "}
          download
        </button>
      </article>
    ) : null;
  };
  
export default OutputSound;