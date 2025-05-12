import { useRef } from "react";

const FileAttachmentButton = ({ handleChange }) => {
  // Stores an 'invisible' reference to the actual input element so that its functionality its still available
  const fileInput = useRef(null);

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInput}
        accept="image/*"
        name="images"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {/* Button triggers the click event on the invisible input element stored in fileInput */}
      <button
        type="button"
        className="upload-btn"
        onClick={() => fileInput.current.click()}
      >
        Upload Photos
      </button>
    </>
  );
};

export default FileAttachmentButton;
