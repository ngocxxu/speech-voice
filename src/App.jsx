import { Divider } from '@mantine/core';
import './App.css';
import Dictaphone from './Dictaphone';
import SpeechSyth from './SpeechSyth';

function App() {
  return (
    <div>
      <Dictaphone />
      <Divider />
      <SpeechSyth />
      {/* <SpeechRecognition /> */}
    </div>
  );
}

export default App;
