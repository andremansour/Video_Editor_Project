const Output9x16Video = ({ handleDownload, videoSrc }) => {
    return videoSrc ? (
      <article className="grid_txt_2">
        <div className="bord_g_2 p_2">
          <video src={videoSrc} autoPlay controls width="400" height="700"></video>
        </div>
        <button onClick={handleDownload} className="btn btn_g">
          {" "}
          download
        </button>
      </article>
    ) : null;
  };
  
export default Output9x16Video;