import { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';

const ServerUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Function to handle file upload to the server
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        message.success('File uploaded successfully!');
        return true;
      } else {
        message.error('File upload failed.');
        return Upload.LIST_IGNORE;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error('An error occurred while uploading.');
      return Upload.LIST_IGNORE;
    }
  };

  // Handle file list changes
  const onChange = ({ file, fileList: newFileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed.`);
    }
    setFileList(newFileList);
  };

  // Restrict uploads to image files and upload cropped files to the server
  const beforeUpload = async (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }

    const isUploaded = await handleUpload(file);
    return isUploaded;
  };

  // Preview the selected image
  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  return (
    <>
      <ImgCrop aspect={16 / 9} quality={0.8}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>

      {/* Modal for previewing the cropped image */}
      <Modal
        visible={previewVisible}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ServerUpload;
