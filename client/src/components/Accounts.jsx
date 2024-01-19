import { useState,useEffect } from "react";
import "./Main.css";

function Accounts({web3,setAddress}) {
  const [provider,setProvider]=useState("None")
  const [balance,setBalance]=useState("None")
  const [account,setAccount]=useState("None")
  useEffect(()=>{
    async function allAccounts(){
      const select = document.querySelector("#selectNumber")
      try{
        const options = await web3.eth.getAccounts();
        setProvider("Ganache")
        // for selecting accounts dynamically
        for(let i=0;i<options.length;i++){
          let opt= options[i];
          let element = document.createElement("option");
          element.textContent= opt;
          element.value = opt;
          select.appendChild(element);
        }
      }catch(error){
        setProvider("not connected");
      }
      
    }
    web3 && allAccounts();

  },[web3]);

  async function selectAccount(){
    let selectedAccount = document.querySelector("#selectNumber").value;
    if(selectedAccount){
      setAddress(selectedAccount)
      const  accountBalance =  await web3.eth.getBalance(selectedAccount)
      // converting from wei to ether
      const  etherBalance = web3.utils.fromWei(accountBalance, "ether");
      setBalance(etherBalance);
      setAccount(selectedAccount);

    }
  }

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="selectNumber">Select an account</label>
        {/* <p style="color: black; font-weight: bold;">Select an Account</p> */}
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance:{balance} ether</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
