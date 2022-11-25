const OutputVideo = ({ handleDownload, gifSrc }) => {
    return gifSrc ? (
      <article className="grid_txt_2">
        <div className="bord_g_2 p_2">
          <img src={gifSrc} autoPlay controls muted width="450"></img>
        </div>
        <button onClick={handleDownload} className="btn btn_g">
          {" "}
          download
        </button>
      </article>
    ) : null;
  };
  
export default OutputVideo;