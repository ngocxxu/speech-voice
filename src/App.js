import { useEffect } from 'react';
import './App.css';

function App() {
  const synth = window.speechSynthesis;

  useEffect(() => {
    synth.addEventListener('voiceschanged', () => {
      const voices = synth.getVoices();
      console.log({ voices });
      for (let i = 0; i < voices.length; i++) {
        const option = document.createElement('option');
        option.textContent = `${voices[i].name} (${voices[i].lang})`;
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        // voiceSelect.appendChild(option);
      }
    });
  }, [synth]);

  return <div>123</div>;
}

export default App;
