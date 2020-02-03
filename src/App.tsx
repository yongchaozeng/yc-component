import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './components/button'
import Input from './components/input'


const App: React.FC = () => {

  let [value, setValue] = useState('')

  const submit = (e: React.SyntheticEvent) => {
    console.log('submit')
  }
  const onChange = (e: string) => {
    // setValue((e.target as HTMLTextAreaElement).value)
    setValue(e)
  }
  return (
    <div className="App">
      <Button onClick={(e: React.SyntheticEvent) => { submit(e) }} >23</Button>
      <Input value={value} onChange={onChange} />
      <h1>{value}</h1>
    </div>
  );
}

export default App;
