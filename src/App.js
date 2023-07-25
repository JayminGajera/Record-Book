import './App.css';
import TextField from '@mui/material/TextField';
import Header from './component/Header'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {Helmet} from "react-helmet";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


//to get data from localStorage

const getLocalData = () => {
  let list = localStorage.getItem('data');

  if(list){
    return JSON.parse(localStorage.getItem('data'));//convert string to object means array
  }else{
    return [];
  }
}

function App() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [data,setData] = useState(getLocalData());

  function addData(){
    setData([...data,{ name: name , email : email }]);
    setName("");
    setEmail("") ;
  }

  function remove(index){
    let newArray= [...data];
    newArray.splice(index,1);
    setData([...newArray])
  }

  function filterRecord(){
      const sortedData = data.sort((a,b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
  
  }

  // add data to localStorage
  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data));//convert object to string
  },[data]);


  return (
    <div className="App">
     <Helmet>
                <meta charSet="utf-8" />
                <title>Record Book</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta name='description' content='Record Book'></meta>
       </Helmet>
      <Header/>
      <div className='input-bar'>
        <TextField id="outlined-basic" label="name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
        <TextField id="outlined-basic" label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Button variant="contained" onClick={addData}>Add</Button>
      </div>
      <div className='filter' onClick={() => filterRecord()}>
        <FormControlLabel control={<Switch />} label="Filter (A-Z)"  />
      </div>
      <div className='top'>
      <div className='head'>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Remove</h4>
      </div>
      
      {
        data.map((element,index) => {
          return (
            <div className='record' key={index}>
              <p>{element.name}</p>
              <p>{element.email}</p>
              <Button variant="outlined" color="error" onClick={() => remove(index)}>
                <DeleteIcon/>
              </Button>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
