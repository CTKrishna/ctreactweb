import logo from './logo.svg';
import './App.css';
import clevertap from 'clevertap-web-sdk';
import {initSignedCall} from 'clevertap-signed-call';
function App() {
  return (
    <div className="App">
      <h3>CleverTap Web SDK using React</h3>
      <div>
        <button onClick={handleEventPushClick}>Push Event</button>
        <button onClick={handelsignedcall}>InitializedSignedCall</button>
        <button onClick={signedcallhandling}>handlingofsignedcall</button>
      </div>
      <div>
          <input
            id="test"
            type="text"
            name='cuid'
            placeholder='Cuid'
          />
      </div>
      <div>
          <input
            id="test2"
            type="text"
            name='receiver'
            placeholder='receiver'
          />
      </div>
      <div>
        <button onClick={update}>submit</button>
      </div>

      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
var receiver;
var cuid;
function update(){
   receiver= document.getElementById("test2").value; 
   cuid =document.getElementById("test").value;
   console.log("CUID IS=="+cuid);
   console.log("receiver ID=="+receiver);
}


let context="hey need help";
function handleEventPushClick () {

  clevertap.event.push('Product Viewed', {
    "Product name": "Casio Chronograph Watch",
    "Category": "Mens Accessories",
    "Price": 59.99,
    "Date": new Date()
  }); // Replace Payload as per your event schema and design
}  
var SignedCallClient;

function handelsignedcall(){

  console.log("inside funcitom"+receiver+cuid)
  initSignedCall(
    {
      accountId: "61a52046f56a14cb19a1e9cc",
      apikey: "9dcced09dae16c5e3606c22346d92361b77efdb360425913850bea4f22d812dd",
      cuid:cuid,
      clevertap: clevertap
    }
  ).then(client => SignedCallClient = client).catch(err => console.log("errorsss",err))
 

}
function signedcallhandling(){


 
    SignedCallClient.call(receiver, context).then(response => {
    // if the call has been answered
    
    console.log("call status is: ",response)
    }).catch (err => {
     // if the call is either missed or declined 
    console.log("call status is: ", err)
    })

}

export default App;
