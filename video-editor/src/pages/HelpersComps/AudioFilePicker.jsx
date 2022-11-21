function AudioFilePicker({ showAudio, handleAudioChange, children }) {
	const FileAudioInput = () => (
		<label htmlFor="sound" id={`${showAudio ? "file_picker_small" : ""}`} className={`file_picker`}>
			<span>Choose your audio file</span>
			<input onChange={handleAudioChange} type="file" id="sound" accept="sound/*" />
		</label>
	);

	return showAudio ? (
		<>
			{" "}
			{children} <FileAudioInput />
		</>
	) : (
		<FileAudioInput />
	);
}

export default AudioFilePicker;
