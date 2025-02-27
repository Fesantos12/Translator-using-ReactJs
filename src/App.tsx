import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuArrowRightLeft } from 'react-icons/lu';

export function App() {
  const languages = [
    { name: 'Alemão', code: 'de' },
    { name: 'Espanhol', code: 'es' },
    { name: 'Francês', code: 'fr' },
    { name: 'Inglês', code: 'en' },
    { name: 'Italiano', code: 'it' },
    { name: 'Português', code: 'pt' },
  ];

  const [sourceLang, setSourceLang] = useState('pt');
  const [targetLang, setTargetLang] = useState('en');
  const [areaText, setAreaText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const swapLanguages = () => {
    setAreaText(translatedText);
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  async function handleTranslate() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${areaText}&langpair=${sourceLang}|${targetLang}`
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (err) {
      console.log('Erro ao traduzir...', err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (areaText) {
      handleTranslate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaText, sourceLang, targetLang]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-400 items-center justify-between">
      <header className="w-full h-20 bg-gray-200 shadow-md flex items-center justify-start pl-6">
        <h1 className="text-3xl font-bold antialiased">Tradutor Unker</h1>
      </header>

      <div className="w-1/2 h-96 bg-gray-300 rounded-2xl shadow-lg flex flex-col max-sm:h-1/2">
        <div className="w-full h-14 shadow-md flex items-center justify-between px-5 max-sm:flex-col max-sm:gap-2 max-sm:h-30">
          <select
            name="source-lang"
            id="source-lang"
            className="w-24 h-10 flex items-center outline-none cursor-pointer"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                className="bg-gray-600 text-gray-300"
              >
                {lang.name}
              </option>
            ))}
          </select>

          <button
            className="group w-10 h-8 flex items-center justify-center rounded-sm outline-none cursor-pointer hover:shadow-[inset_9px_7px_30px_-27px_rgba(0,0,0,0.75)] transition-shadow"
            onClick={swapLanguages}
          >
            <LuArrowRightLeft
              size={20}
              className="group-hover:size-4 transition-shadow"
            />
          </button>

          <select
            name="target-lang"
            id="target-lang"
            className="w-24 h-10 flex items-center outline-none cursor-pointer"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-gray-300">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center w-full h-full max-md:flex-col">
          <textarea
            name="text-area"
            id="text-area"
            className="w-1/2 h-full max-md:w-full max-md:h-1/2 resize-none outline-none py-10 px-10 text-3xl font-semibold antialiased"
            placeholder="Digite seu texto..."
            onChange={(e) => setAreaText(e.target.value)}
            value={areaText}
          ></textarea>

          <div className="relative w-1/2 h-full bg-gray-600 py-10 px-10 text-3xl font-semibold text-white antialiased rounded-br-2xl max-md:w-full max-md:h-1/2 max-md:rounded-bl-2xl">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full border-t-2 border-gray-300 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            ) : (
              <p>{translatedText}</p>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full h-20 bg-gray-200 shadow-md flex items-center justify-center font-semibold pl-6">
        Developed By Unker &copy;{new Date().getFullYear()}
      </footer>
    </div>
  );
}
