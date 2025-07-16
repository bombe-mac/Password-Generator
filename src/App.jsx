import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password, setPassword]=useState("");

  const passwordGen= useCallback(()=>{
    let password='';
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if(numberAllowed) str+='1234567890';
    if(charAllowed)   str+='@$%&{}[]';

    for (let index = 1; index <= length; index++) {
      let strIndexRand= Math.floor(Math.random()*str.length + 1);
      password +=str.charAt(strIndexRand);
    }
    setPassword(password);
  },[length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passwordGen();
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordRef=useRef(null);

  const copyPasswordToClipboard = useCallback( ()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  my-8 bg-gray-800 text-yellow-400">
        <h1 className='text-4xl py-5'>Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white placeholder:text-gray-300"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            >copy</button>
          </div>

          <div className='flex text-sm gap-x-2 justify-center'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={100}
              value={length}
                className='cursor-pointer'
                 onChange={(e) => {setLength(e.target.value)}}
                />
              <label>Length: {length}</label>
            </div>

          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
