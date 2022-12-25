import { ActionIcon, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMicrophone, IconPlayerStop } from '@tabler/icons';
import React, { useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();
  const { startListening, stopListening } = SpeechRecognition;
  const { getInputProps, setFieldValue } = useForm({
    initialValues: {
      text: '',
    },
  });

  const handleStartSpeech = () => {
    if (browserSupportsContinuousListening) {
      startListening({ continuous: true });
    } else {
      startListening();
    }
  };

  const handleStopSpeech = () => {
    if (transcript) {
      setFieldValue('text', transcript);
    }
    stopListening();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  }, [browserSupportsSpeechRecognition]);

  return (
    <div>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

      <Textarea
        readonly='readonly'
        placeholder='Your text'
        label='Your text'
        {...getInputProps('text')}
      />

      {listening ? (
        <ActionIcon
          color='blue'
          radius='xl'
          variant='filled'
          onClick={handleStopSpeech}
        >
          <IconPlayerStop size={18} />
        </ActionIcon>
      ) : (
        <ActionIcon radius='xl' onClick={handleStartSpeech}>
          <IconMicrophone size={18} />
        </ActionIcon>
      )}
    </div>
  );
};
export default Dictaphone;
