import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TranslateApp = () => {
  const [languages, setLanguages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [textInput, setTextInput] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      const options = {
        method: 'GET',
        url: 'https://text-translator2.p.rapidapi.com/getLanguages',
        headers: {
          'x-rapidapi-key': 'c0bc551ad0mshe59461a7d7c1f17p168b76jsn0519b8e93dd1',
          'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setLanguages(response.data.data.languages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLanguages();
  }, []);

  const handleTranslate = async () => {
    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': 'c0bc551ad0mshe59461a7d7c1f17p168b76jsn0519b8e93dd1',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },
      data: new URLSearchParams({
        source_language: sourceLanguage,
        target_language: targetLanguage,
        text: textInput
      })
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Language Translator</h1>
      <div>
        <label>
          Source Language:
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Target Language:
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <textarea
          rows="4"
          cols="50"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter text to translate"
        />
      </div>
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && (
        <div>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateApp;
