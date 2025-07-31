import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}~|/><?";

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard.writeText(password);
    }
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-xl px-6 py-8 my-10 text-orange-500 bg-gradient-to-br from-gray-800 to-gray-900">
      <h1 className="text-white text-center text-3xl font-bold mb-6">
        🔐 Password Generator
      </h1>

      <div className="flex shadow-inner rounded-lg overflow-hidden mb-6 border border-gray-700 bg-gray-700">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="outline-none w-full py-3 px-4 bg-transparent text-orange-300 placeholder:text-orange-300 font-mono text-lg tracking-wider"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 transition duration-300"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-5 text-sm text-white">
        <div className="flex items-center justify-between">
          <label htmlFor="lengthRange" className="font-medium">
            Length: <span className="text-orange-400">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={50}
            id="lengthRange"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="cursor-pointer w-1/2 accent-orange-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="numberInput" className="font-medium">
            Include Numbers
          </label>
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="w-5 h-5 accent-orange-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="charInput" className="font-medium">
            Include Special Characters
          </label>
          <input
            type="checkbox"
            id="charInput"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="w-5 h-5 accent-orange-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
