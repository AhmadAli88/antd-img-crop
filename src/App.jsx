import './App.css';
import Basic from './components/Basic';
import PreviewQuality from './components/Preview and Quality';
import ServerUpload from './components/Server Upload';
import CustomUpload from './components/StyledUpload';

function App() {
  return (
    <div>
      <Basic />
      <PreviewQuality/>
      <ServerUpload/>
      <CustomUpload/>
    </div>
  );
}

export default App;
