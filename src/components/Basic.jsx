import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
const Basic = () => {
  const onChange = ({ fileList }) => {
    console.log('FileList:', fileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <ImgCrop>
      <Upload
        listType='picture-card'
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        + Upload
      </Upload>
    </ImgCrop>
  );
};

export default Basic;
