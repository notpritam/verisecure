import { Link } from "react-router-dom";
import ethLogo from "../assets/ethIndia.svg";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Lock,
  MoreVertical,
  ShieldEllipsis,
  Upload,
  UserRoundCog,
  View,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useVariable } from "@/lib/storage";
import lighthouse from "@lighthouse-web3/sdk";

function MyUploads() {
  const [selectedFile, setSelectedFile] = useState(null);
  const signer = useVariable((state) => state.signer);
  const apiKey = useVariable((state) => state.apiKey);
  const contract = useVariable((state) => state.contract);
  const [userFiles, setUserFiles] = useState([]);
  const [otherUserFiles, setOtherUserFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [mimeType, setMimeType] = useState();

  const signAuthMessage = async () => {
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const handleFileChange = async (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    const signerAddress = await signer.getAddress();
    console.log("tr signer", signer, signerAddress);
    const signedMessage = await signAuthMessage();
    let file = event.target.files;
    console.log(file, apiKey, signerAddress, signedMessage.signedMessage);
    // Upload file with encryption
    const output = await lighthouse.uploadEncrypted(
      file,
      apiKey,
      signerAddress,
      signedMessage.signedMessage
    );
    console.log("Encrypted File Status:", output);
    let cid;
    let _docName;
    let _fileSize;
    if (output?.data?.fileList) {
      cid = output.data.fileList[0].cid;
      _docName = output.data.fileList[0].fileName;
      _fileSize = Math.round(Number(output.data.fileList[0].fileSizeInBytes) / 1024);
    } else {
      cid = output.data[0].Hash;
      _docName = output.data[0].Name;
      _fileSize = Math.round(Number(output.data[0].Size) / 1024);
    }
    console.log(cid, _docName, _fileSize);
    await (await contract.addDocument(cid, _docName, _fileSize)).wait();
    setSelectedFile(null);
    getUploads();
  };
  const handleFileUpload = () => {};

  const decryptFile = async (fileCid) => {
    try {
      const getFileInfo = await lighthouse.getFileInfo(fileCid);
      const fileType = getFileInfo.data.mimeType;
      const { publicKey, signedMessage } = await signAuthMessage();
      const keyObject = await lighthouse.fetchEncryptionKey(
        fileCid,
        publicKey,
        signedMessage
      );

      console.log("0", fileCid, fileType);
      const decrypted = await lighthouse.decryptFile(
        fileCid,
        keyObject.data.key,
        fileType
      );
      console.log(decrypted);
      const url = URL.createObjectURL(decrypted);
      return url;
    } catch (error) {
      console.error("Error decrypting file:", error);
      return null;
    }
  };

  const handleViewFile = async (cid, mimeType) => {
    try {
      const fileUrl = await decryptFile(cid);
      setSelectedFileUrl(fileUrl);
      setMimeType(mimeType);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error decrypting file:", error);
    }
  };

  const getUploads = async () => {
    try {
      const response = await lighthouse.getUploads(apiKey);
      console.log("response", response);
      const publicKey = await signer.getAddress();

      // Filter the files uploaded by the current user
      const userUploadedFiles = response.data.fileList.filter(
        (file) => file.publicKey.toLowerCase() === publicKey.toLowerCase()
      );

      console.log("userUploadedFiles", userUploadedFiles);
      setUserFiles(userUploadedFiles);

      // Check for files shared with the current user
      const sharedFilesPromises = response.data.fileList.map(async (file) => {
        const accessResponse = await lighthouse.getAccessConditions(file.cid);
        if (accessResponse.data.sharedTo.includes(publicKey)) {
          return file;
        }
        return null;
      });

      const sharedFiles = (await Promise.all(sharedFilesPromises)).filter(
        (file) => file !== null
      );

      console.log("shared", sharedFiles);
      setOtherUserFiles(sharedFiles);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  useEffect(() => {
    getUploads();
  }, []);

  // const FileModal = () => {
  //   if (!isModalOpen) return null;

  //   return (
  //     <div className="modal-overlay" onClick={closeModal}> {/* Optionally close modal on overlay click */}
  //       <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent click inside modal from closing it */}
  //         <button onClick={closeModal} style={{color: "black"}}>Close</button>
  //         <img src={selectedFileUrl} alt="Decrypted File" />
  //       </div>
  //     </div>
  //   );
  // };

  const FileModal = () => {
    if (!isModalOpen || !selectedFileUrl) return null;

    let content;
    const fileType = mimeType; //getMimeType(selectedFileUrl);
    console.log("fileType", fileType);
    if (fileType.startsWith("image/")) {
      content = <img src={selectedFileUrl} alt="File Content" />;
    } else if (fileType === "application/pdf") {
      content = (
        <iframe
          src={selectedFileUrl}
          style={{ width: "100%", height: "300px" }}
        ></iframe>
      );
    } else if (fileType.startsWith("text/")) {
      content = (
        <iframe
          src={selectedFileUrl}
          style={{ width: "100%", height: "200px" }}
        ></iframe>
      );
    } else {
      content = <p>Unsupported file format</p>;
    }

    return (
      <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ color: "black" }}
          >
            Close
          </button>
          {content}
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="flex z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
        <div className="flex items-center justify-between w-full">
          <Link to={"/"}>
            <span className="text-[1.5rem] tracking-wide font-bold">
              AnonVerify
            </span>
          </Link>
          <div className="flex gap-4">
            <Link to={"/profile?action=upload"}>
              {/* <Button className="flex gap-2">
                <Upload />
                Upload Files
              </Button> */}
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="flex gap-2">
                <UserRoundCog />
                Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="w-full h-full flex flex-col mt-[4rem] justify-center items-center">
        <div className="min-w-screen justify-center flex p-[2rem]  w-full max-w-[1280px] h-full items-center">
          <Card className="p-6 items-center flex flex-col gap-4 justify-center w-full">
            <Label htmlFor="picture" className="text-[1.25rem]">
              Choose the file
            </Label>
            <Input
              className="text-center"
              id="picture"
              type="file"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="flex flex-col gap-4">
                <img src={selectedFile} alt="Selected file" className="mt-4" />
                <Button onClick={() => handleFileUpload()}>Upload File</Button>
              </div>
            )}
          </Card>
        </div>
        <div className="w-full flex flex-col gap-4 max-w-[1280px]">
          <span className="text-[2rem] font-bold">Your Files</span>
          {userFiles.length > 0 ? (
            userFiles.map((file, index) => (
              <Card
                key={index}
                className="flex flex-col gap-1 p-4 w-full max-w-[600px]"
              >
                {Object.entries(file).map(([key, value], propIndex) => {
                  let displayValue;

                  if (typeof value === "boolean") {
                    displayValue = value ? "Yes" : "No";
                  } else if (key === "createdAt") {
                    displayValue = new Date(value).toLocaleString(); // Format date
                  } else {
                    displayValue = value;
                  }

                  return (
                    <div key={propIndex} className="flex justify-between">
                      <strong>{key}:</strong>
                      <span>{displayValue}</span>
                    </div>
                  );
                })}
                <button
                  onClick={() => handleViewFile(file.cid, file.mimeType)}
                  className="view-button"
                >
                  View
                </button>
              </Card>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
      </div>
      <FileModal />
    </>
  );
}

export default MyUploads;
