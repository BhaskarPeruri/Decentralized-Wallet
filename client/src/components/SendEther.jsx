import { useState } from "react";
import "./Main.css";

function SendEther({web3, account}) {
  const[receipt,setReceipt]=useState({});
  const[toggle,setToggle]=useState(false);
  
  function sendEther(event){
    event.preventDefault();//it cancels the browser default behaviour i.e browser refresh
    const _to= document.querySelector("#to").value;
    const _value = document.querySelector("#value").value;
    //converting from ether to wei
    const weiValue = web3.utils.toWei(_value,"ether");
    web3.eth.sendTransaction({
      from:account,
      to:_to,
      value:weiValue
      //when the transaction is done "then" is implemented.
    }).then(function(receipt){
      setReceipt(receipt);
      setToggle(true);
      // console.log(receipt);
    });
    }
  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h5>Transaction Status</h5>
          {/* The content inside the <code> tag is typically displayed in a monospaced font, 
          making it suitable for representing programming code. */}
          {/* <code>{toggle && JSON.stringify(receipt,["transactionHash","blockHash","blockNumber","gasUsed"],2)}</code> */}
          
          {toggle && receipt && (
          <div>
                <p>Transaction executed successfully!</p>
                <code>{JSON.stringify(receipt, ["transactionHash", "blockHash", "blockNumber", "gasUsed"], 2)}</code>
    
           </div>
          )}
        </pre>
      </div>
    </>
  );
}

export default SendEther;
