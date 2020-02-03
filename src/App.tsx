import React from 'react';
import logo from './logo.svg';
import './App.css';

// import Button from './components/button'
import Button from './components/button'


const App: React.FC = () => {
  const submit = (e:React.SyntheticEvent)=>{
    console.log('submit')
  }
  return (
    <div className="App">
      <Button onClick={(e:React.SyntheticEvent)=>{submit(e)}} >23</Button>
    </div>
  );
}

export default App;
