import { useState } from "react"
import useSpeechToText from 'react-hook-speech-to-text';

export default function Test() {

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div className="p-12">
            <button onClick={isRecording ? stopSpeechToText : startSpeechToText} className={"p-2 bg-red-500 rounded-lg"}>
                {isRecording ? 'Stop' : 'Start'}
            </button>
            <ul>
                {results.map((result) => (
                    <li key={result.timestamp}>vừa nghe được: {result.transcript}</li>
                ))}
                {interimResult && <li>{interimResult}</li>}
            </ul>

            { results && results[results.length - 1]?.transcript }
        </div>
    );
}
//
