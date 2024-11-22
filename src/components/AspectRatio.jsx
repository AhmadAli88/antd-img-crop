import { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Handle file list changes
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Restrict uploads to image files only
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };

  // Preview the selected image
  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  return (
    <>
    {/* <ImgCrop aspect={1}>  Square cropping */}
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

export default App;
