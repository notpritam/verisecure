import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Outlet";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import { WalletProvider } from "./pages/WalletAddressContext";
// import ContractAddress from '.././contractsData/ContractAddress.json';
import ContractAddress from '../contractData/ContractAddress.json';
import ContractABI from '../contractData/ContractABI.json';
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})
  // const [marketplace, setMarketplace] = useState({})
  const [loading, setLoading] = useState(true)
  const [provider,setProvider]= useState(true)
  const web3Handler = async () => {
  
  try {
    if(window.ethereum==null){
      alert("Not installed");
      return;
    }
      console.log("account");
  
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      

      // Get provider from Metamask
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("provider" ,provider)
      setProvider(provider);
      // Set signer
      const signer = await provider.getSigner()
      console.log(signer,signer.address);
      setAccount(signer.address)
      // console.log(account);
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })
  
      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        console.log(accounts[0]);
  
        await web3Handler()
      })
      loadContracts(signer)
      // navigat
  } catch (error) {
    console.log(error);
  }
  }
  const loadContracts = async (signer) => {
    

    
    const contract = new ethers.Contract(ContractAddress.address, ContractABI.abi, signer)
    setContract(contract)
    console.log("contract",contract);
    setLoading(false)
  }
  useEffect(() => {
    console.log("Acc:",account);
  
  }, [account])
  
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage web3Handler={web3Handler} walletAddress={account} provider={provider} contract={contract}/>} />
            <Route path="dashboard" element={<Dashboard web3Handler={web3Handler} walletAddress={account} provider={provider} contract={contract}/>} />
            <Route path="profile" element={<Profile />} />
          {/* <Route path="blogs" element={<Blogs />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
