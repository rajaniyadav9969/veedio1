import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Components/Dashboard/Dashboard';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import VideoEditor from './Components/VideoEditor/VideoEditor';
import SettingTab from './Components/VideoEditor/components/SettingTab/SettingTab';


function App() {


  return (

    <Routes>
      <Route path="home" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="home"></Navigate>} />
      <Route path="/editor" element={<VideoEditor />} >
        <Route path="/editor/setting" element={<SettingTab />} />
      </Route>
    </Routes>
  );
}
export default App;
