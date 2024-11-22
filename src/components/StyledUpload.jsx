import { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';

const CustomUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Handle file list changes
  const onChange = ({ file, fileList: newFileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed.`);
    }
    setFileList(newFileList);
  };

  // Restrict uploads to image files
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    return true; // Allow the file to be uploaded
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
          className='custom-upload'
          listType='picture-card'
          style={{
            border: '1px dashed #1890ff',
            borderRadius: '8px',
            padding: '16px',
          }}
          fileList={fileList}
          onChange={onChange}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
        >
          {fileList.length < 5 && '+ Custom Upload'}
        </Upload>
      </ImgCrop>

      {/* Modal for previewing the uploaded image */}
      <Modal
        visible={previewVisible}
        title='Image Preview'
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='preview' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CustomUpload;
