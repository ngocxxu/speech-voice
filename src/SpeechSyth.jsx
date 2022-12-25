/* eslint-disable no-use-before-define */
import { ActionIcon, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconVolume } from '@tabler/icons';
import React from 'react';

const SpeechSyth = () => {
  const synth = window.speechSynthesis;
  // const inputFormRef = useRef(null);
  // const voiceSelectRef = useRef(null);
  // const voicesRef = useRef(null);
  const { onSubmit, getInputProps, values } = useForm({
    initialValues: {
      text: '',
    },
  });

  // function populateVoiceList() {
  //   voicesRef.current = synth.getVoices().sort(function (a, b) {
  //     const aname = a.name.toUpperCase();
  //     const bname = b.name.toUpperCase();

  //     if (aname < bname) {
  //       return -1;
  //     } else if (aname === bname) {
  //       return 0;
  //     } else {
  //       return +1;
  //     }
  //   });

  //   const selectedIndex =
  //     voiceSelectRef.current.selectedIndex < 0
  //       ? 0
  //       : voiceSelectRef.current.selectedIndex;
  //   voiceSelectRef.current.innerHTML = '';

  //   for (let i = 0; i < voicesRef.current.length; i++) {
  //     const option = document.createElement('option');
  //     option.textContent = `${voicesRef.current[i].name} (${voicesRef.current[i].lang})`;

  //     if (voicesRef.current[i].default) {
  //       option.textContent += ' -- DEFAULT';
  //     }

  //     option.setAttribute('data-lang', voicesRef.current[i].lang);
  //     option.setAttribute('data-name', voicesRef.current[i].name);
  //     voiceSelectRef.current.appendChild(option);
  //   }
  //   voiceSelectRef.current.selectedIndex = selectedIndex;
  // }

  function handleSpeak() {
    // The voice is speaking
    if (synth.speaking) {
      synth.cancel();
      return;
    }

    if (values.text !== '') {
      const utterThis = new SpeechSynthesisUtterance(values.text);

      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
      };

      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      };

      // const selectedOption =
      //   voiceSelectRef.current.selectedOptions[0].getAttribute('data-name');

      const voices = synth.getVoices();
      const languageCode = 'en';

      for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang.slice(0, 2) === languageCode) {
          utterThis.voice = voices[i];
          break;
        }
      }
      synth.speak(utterThis);
    }
  }

  const handleSubmit = (values, event) => {
    event.preventDefault();
    handleSpeak();
  };

  // useEffect(() => {
  //   // populateVoiceList();

  //   // if (speechSynthesis.onvoiceschanged !== undefined) {
  //   //   console.log(speechSynthesis.onvoiceschanged);
  //   //   speechSynthesis.onvoiceschanged = populateVoiceList;
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <h1>Speech synthesiser</h1>

      <form
        // ref={inputFormRef}
        onSubmit={onSubmit((values, _event) => handleSubmit(values, _event))}
      >
        <Textarea
          placeholder='Your text'
          label='Your text'
          {...getInputProps('text')}
        />
        <ActionIcon radius='xl' type='submit'>
          <IconVolume size={18} />
        </ActionIcon>

        <br />

        {/* <select onChange={handleSpeak} ref={voiceSelectRef}></select> */}
      </form>
    </div>
  );
};

export default SpeechSyth;
