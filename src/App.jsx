import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Outlet";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import { WalletProvider } from "./pages/WalletAddressContext";
// import ContractAddress from '.././contractsData/ContractAddress.json';
import { ethers } from "ethers";
import "global";
import { useEffect, useState } from "react";
import ContractABI from "../contractData/ContractABI.json";
import ContractAddress from "../contractData/ContractAddress.json";
import { useVariable } from "./lib/storage";
import Notifications from "./utils/Notifications";
import initPush from "./utils/pushNotify";
import sendNotification from "./utils/sendPushWeb3Notificatiobs";
import lighthouse from "@lighthouse-web3/sdk";
import axios from "axios";
import MyUploads from "./pages/MyUploads";
import BellIcon from "./assets/Bell_icon.svg";
function App() {
  // const navigate = useNavigate();
  const updateWalletAddress = useVariable((state) => state.updateWalletAddress);
  const updateContractAddress = useVariable(
    (state) => state.updateContractAddress
  );
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const updateSinger = useVariable((state) => state.updateSinger);
  const updateAPIKey = useVariable((state) => state.updateAPIKey);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});
  // const [marketplace, setMarketplace] = useState({})
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(true);
  const [signer, setSigner] = useState();

  const signAuthMessage = async (_signer, verificationMessage) => {
    const address = await _signer.getAddress();
    const signedMessage = await _signer.signMessage(verificationMessage);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const generateAPIKey = async (_signer) => {
    const address = await _signer.getAddress();
    const verificationMessage = (
      await axios.get(
        `https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`
      )
    ).data;
    const signedMessage = await signAuthMessage(_signer, verificationMessage);
    const response = await lighthouse.getApiKey(
      signedMessage.publicKey,
      signedMessage.signedMessage
    );
    console.log(response);
    updateAPIKey(response.data.apiKey);
  };

  const web3Handler = async () => {
    try {
      if (window.ethereum == null) {
        alert("Not installed");
        return;
      }
      console.log("account");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      updateWalletAddress(accounts[0]);
      console.log("accountts", accounts);
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider", provider);
      setProvider(provider);
      // Set signer
      const signer = await provider.getSigner();
      console.log("signer in app.js", signer);
      setSigner(signer);
      updateSinger(signer);
      generateAPIKey(signer);
      console.log(signer, signer.address);
      // setAccount(signer.address)
      console.log(account);
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", async function (accounts) {
        setAccount(accounts[0]);
        console.log(accounts[0]);

        await web3Handler();
      });
      loadContracts(signer, account);

      // const testSendNotification = async (signer) => {
      //   if (signer) {
      //     const addresses = ["0x1d37B1700Eb4a8B4fEa710182552CAe85b5eF0E6"]; // Replace with valid Ethereum addresses
      //     const title = "Test Notification 2 after success";
      //     const body = "This is a test notification body 2.";

      //     await sendNotification(addresses, title, body, signer);
      //   }
      // };

      // testSendNotification(signer);
      // navigat
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (signer) {
        const user = await initPush(signer);
        if (!user) return;
        // userAlice.notification.list(type, {options?})
        const inboxNotifications = await user.notification.list("INBOX");
        console.log(inboxNotifications);
        setNotifications(inboxNotifications);
      }
    };
    fetchNotifications();
  }, [signer]);

  if (typeof global === "undefined") {
    window.global = window;
  }

  // useEffect(() => {
  //   const testSendNotification = async () => {
  //     const addresses = ["0x1d37B1700Eb4a8B4fEa710182552CAe85b5eF0E6"]; // Replace with valid Ethereum addresses
  //     const title = "Test Notification";
  //     const body = "This is a test notification body.";

  //     await sendNotification(addresses, title, body, signer);
  //   };

  //   testSendNotification();
  // }, []);

  const loadContracts = async (signer, account) => {
    const contract = new ethers.Contract(
      ContractAddress.address,
      ContractABI.abi,
      signer
    );
    setContract(contract);

    console.log("contract", contract);
    setLoading(false);
    updateContractAddress(contract);
    // navigate('/dashboard', {
    //   state: {
    //     account,
    //     contract,
    //   },
    // });
  };

  useEffect(() => {
    console.log("Acc:", account);
  }, [account]);

  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>          
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <HomePage
                  web3Handler={web3Handler}
                  walletAddress={account}
                  provider={provider}
                  contract={contract}
                />
              }
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="dashboard"
              element={
                <Dashboard walletAddress={account} contract={contract} />
              }
            />
            <Route path="profile" element={<Profile />} />
            <Route path="myfiles" element={<MyUploads />} />
            {/* <Route path="blogs" element={<Blogs />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
        {/* {notifications && (
          <Notifications notifications={notifications}></Notifications>
        )} */}
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
