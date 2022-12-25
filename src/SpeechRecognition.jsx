/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';

const SpeechRecognition = () => {
  let recognition = new SpeechRecognition();
  let SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
  console.log({ recognition });
  console.log({ SpeechRecognition });
  const diagnosticRef = useRef(null);

  useEffect(() => {
    recognition.onresult = function (event) {
      var color = event.results[0][0].transcript;
      diagnosticRef.current.textContent = 'Result received: ' + color + '.';
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recognition.onresult]);

  return (
    <div>
      <h1>Speech color changer</h1>
      <button
        onClick={() => {
          recognition.start();
          console.log('Ready to receive a color command.');
        }}
        id='play'
        type='button'
      >
        Mic
      </button>
      <button
        onClick={() => {
          recognition.end();
        }}
        type='button'
      >
        Mic
      </button>
      <div>
        <p ref={diagnosticRef}>
          <em>...diagnostic messages</em>
        </p>
      </div>
    </div>
  );
};

export default SpeechRecognition;
