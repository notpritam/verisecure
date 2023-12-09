import CustomButton from '@/components/custombutton';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVariable } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { ethers } from 'ethers';

import { DialogClose } from '@radix-ui/react-dialog';
import {
  Eye,
  Lock,
  Search,
  ShieldEllipsis,
  Upload,
  UserRoundCog,
  View,
  Wallet,
} from 'lucide-react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);
  const [documents, setDocuments] = useState([]);
  const walletAddress = useVariable((state) => state.walletAddress);
  const contract = useVariable((state) => state.contract);
  const navigate = useNavigate();
  const handleShowDetails = (id) => {
    setShowDetails(true);
  };

  const disconnectWalletHandler = () => {
    location.reload; // Clear the wallet address from the context
  };
  // Function to get request information
  const getRequestInfo = async (userAddress, cid) => {
    try {
      // Call the function that retrieves information from the mapping
      const requestInfo = await contract.requestAccess(userAddress, cid);

      // Now requestInfo contains the data from the mapping for the specified userAddress and cid
      console.log('Request Information:', requestInfo);
      if (requestInfo.requestSent) return 1;
      if (requestInfo.acknowledgment) return 2;

      return 0;
    } catch (error) {
      console.error('Error retrieving request information:', error);
      return null;
    }
  };
  useLayoutEffect(() => {
    console.log(walletAddress);
  }, [walletAddress]);

  useEffect(() => {
    console.log(walletAddress, contract);
    if (!walletAddress || !contract) {
      console.log('address', contract);
      navigate('/');
      return;
    }
    const fetchDocuments = async () => {
      try {
        // const x=await contract.queryFilter("*");
        console.log('-----');

        // Define the event filter for DocumentAdded
        // const filter = contract.filters.DocumentAdded(null, null, null);
        // console.log('***',filter);
        // console.log('***',filter.topics[0].toString());
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const blockNumber = await provider.getBlockNumber();
        // Query for past events
        const events = await contract.queryFilter(
          'DocumentAdded',
          35799782,
          blockNumber
        );
        console.log('***', events);

        // Use Promise.all to wait for all promises to resolve
        const docsPromises = events.map(async (event) => {
          const { cid, docName, uploader } = event.args;
          const size = await contract.documents(cid);
          const info = await getRequestInfo(walletAddress, cid);
          const reqParam = info % 3;

          return { cid, docName, uploader, size, reqParam };
        });

        // Wait for all promises to resolve
        const docs = await Promise.all(docsPromises);

        setDocuments(docs);
        console.log(docs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments();
  }, []);
  return (
    <Dialog>
      {/* <Header web3Handler={web3Handler} walletAddress={walletAddress}/> */}

      <header className="flex z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
        {/* <div className="flex items-center justify-between w-full">
          <span className="text-[1.5rem] tracking-wide font-bold">
            AnonVerify
          </span>
          <div className="flex gap-4">
            <Link to={"/profile?action=upload"}>
              <Button className="flex gap-2">
                <Upload />
                Upload Files
              </Button>
            </Link>
            <Link to="/profile">
              {walletAddress ? (
                <>
                  <span>Connected Wallet: {walletAddress}</span>
                  <Button
                    onClick={disconnectWalletHandler}
                    variant="outline"
                    className="flex gap-2"
                  >
                    <UserRoundCog />
                    Disconnect Wallet
                  </Button>
                </>
              ) : (
                // <Link to="/">
                  <Button variant="outline" className="flex gap-2" handleClick={web3Handler}>
                    Connect Wallettt
                  </Button>
                // </Link>
              )}
            </Link>
          </div>
        </div> */}
      </header>
      <div className="min-h-screen  h-screen w-screen overflow-x-hidden flex items-center gap-[4rem]  justify-center min-w-screen">
        <div
          className={cn(
            'w-full max-w-[1280px] gap-4 items-center  justify-center flex flex-col p-2 min-h-[600px] mt-[8rem] border',
            showDetails == true ? 'w-[20%] mt-[6rem]' : ''
          )}
        >
          <div
            className={cn(
              'flex sticky top-0 justify-center min-h-[200px] backdrop-blur-lg items-center gap-6 w-full',
              showDetails == true ? 'min-h-[80px] sticky top-[4rem]' : ''
            )}
          >
            <Input
              className="max-w-[600px] w-full"
              placeholder="Enter User Id"
            />{' '}
            <Button variant="outline" className="">
              <Search />
            </Button>
          </div>

          <div className="flex flex-col mt-[6rem] items-center gap-6 overflow-hidden overflow-y-scroll hide-scrollbar w-full h-screen ">
            {/* {Array.from({ length: 20 }).map((_, i) => ( */}
            {documents.map((doc, i) => (
              <Card
                key={i}
                className={cn(
                  'flex gap-4 p-2 pl-6 pr-6 w-full justify-between max-w-[600px] items-center'
                )}
              >
                <div className="flex gap-4 items-center">
                  <img
                    className={cn(
                      'h-10 w-10 rounded-full',
                      showDetails == true ? 'hidden' : ''
                    )}
                    src="https://i.pravatar.cc/300"
                  ></img>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        'text-[1.5rem] font-bold',
                        showDetails == true ? 'text-[1rem]' : ''
                      )}
                    >
                      {/* John Doe {i} */}
                      {doc.docName}
                    </span>
                    <div className="flex gap-8">
                      <span className="text-[0.8rem] opacity-80">
                        {doc.uploader}
                      </span>
                      <span className="text-[0.8rem] opacity-80">
                        Size :{doc.fileSize}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {i % 2 == 0 ? (
                    <>
                      <DialogTrigger asChild>
                        <Button
                          // onClick={() => onClickVersion(data)}
                          variant="outline"
                          className="flex gap-2 items-center "
                        >
                          {/* <Eye /> */}
                          <Lock />
                          Request Access
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Ask for Access</DialogTitle>
                          <DialogDescription>
                            You are about to request access to this user's info.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() => console.log('handling access')}
                              type="submit"
                            >
                              Request Access
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </>
                  ) : i % 3 == 0 ? (
                    <>
                      {' '}
                      <Button
                        onClick={() => onClick(data)}
                        variant="outline"
                        className="flex gap-2 items-center "
                      >
                        {/* <Eye /> */}
                        <ShieldEllipsis />
                        Pending Access
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleShowDetails(i)}
                      variant="outline"
                      className="flex gap-2 items-center "
                    >
                      {/* <Eye /> */}
                      {/* <ShieldEllipsis /> */}
                      <View color="#262e9c" />
                      {/* Already Viewed */}
                      Request Sent
                    </Button>
                  )}
                  {/* <Button variant="outline">Verify</Button> */}
                </div>
              </Card>
            ))}
          </div>
        </div>
        {showDetails && (
          <>
            <div className="w-full pl-8 pr-8 h-full mt-[10rem] p-[4rem] border">
              <img
                className="h-[4rem] w-[4rem] rounded-full"
                src="https://i.pravatar.cc/300"
              ></img>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default Dashboard;
