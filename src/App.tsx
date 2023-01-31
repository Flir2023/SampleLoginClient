import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const baseURL = 'https://10.130.0.102:7256';

function App() {
  //Created state because I wanted to make the form a controlled component
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function submitHandler(e : React.SyntheticEvent, operation: string) {
    //e.preventDefault(); // no need to prevent default because I didnt used an actual form element to submit the data to the server (why? because I want a controlled component))
    console.log(e);
    console.log("in submithandler");
    
    let url = '';
    //no need to convert to JSON with JSON.stringify method because we are using axios (if we convert to JSON than the response.data will not be a JS Object)
    const formDataJSObject = { name: username, password: password, email: email };

    switch (operation) {
      case 'login':
        url = `${baseURL}/api/Login`;
        break;
      case 'addUser':
        url = `${baseURL}/api/Login/AddUser`;
        break;
      default:
        url = '';
    }
    console.log(`${url}`);

    axios.post(`${url}`, formDataJSObject)
    .then((response) => { 

      console.log("Server response.data: ");
      console.log(response.data);  
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <div className="App">
          <br></br>
          <br></br>
          {/* htmlFor = A String, representing the id of the element the label is bound to */}
          <label htmlFor="username">Username: </label>
          <input id="username" onChange={(e) => setUsername(e.target.value)} /><br></br>

          <label htmlFor="password">Password: </label>
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/><br></br>

          <label htmlFor="email">Email: </label>
          <input id="email"  type="email" onChange={(e) => setEmail(e.target.value)}/><br></br>

          <button onClick={(e) => submitHandler(e,'login')}>Post request to login</button><br></br>
          <button onClick={(e) => submitHandler(e, 'addUser')} >Post request to add new user</button>
    </div>
  );
}

export default App;
