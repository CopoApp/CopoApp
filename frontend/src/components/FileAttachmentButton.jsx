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
        // Stop user from sending objects to S3
        // onChange={handleChange}
        style={{ display: 'none' }}
      />
      {/* Button triggers the click event on the invisible input element stored in fileInput */}
      <Button
        type="button"
        mt={'1'}
        mb={'1'}
        variant="surface"
        color="gray"
        // Stop user from sending objects to S3
        // onClick={() => fileInput.current.click()}
      >
        {/* {innerText} */}
        File Attachments Disabled
      </Button>
    </>
  );
};

export default FileAttachmentButton;
