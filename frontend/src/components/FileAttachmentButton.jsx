import { useRef } from 'react';
import { Button } from '@radix-ui/themes';

const FileAttachmentButton = ({ handleChange, innerText }) => {
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
        style={{ display: 'none' }}
      />
      {/* Button triggers the click event on the invisible input element stored in fileInput */}
      <Button type="button" mt={'1'} mb={'1'} onClick={() => fileInput.current.click()}>
        {innerText}
      </Button>
    </>
  );
};

export default FileAttachmentButton;
