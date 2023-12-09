import React from "react"
import { ethers } from 'ethers'
import lighthouse from '@lighthouse-web3/sdk'
import { fileInfo } from "./getFile"

const DecryptFile = (fileCid) => {

    const [fileURL, setFileURL] = React.useState(null)

    const encryptionSignature = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message
        const signedMessage = await signer.signMessage(messageRequested)
        return ({
            signedMessage: signedMessage,
            publicKey: address
        })
    }

    /* Decrypt file */
    const decrypt = async () => {
        // Fetch file encryption key
        const cid = fileCid;
        const { publicKey, signedMessage } = await encryptionSignature()
        const keyObject = await lighthouse.fetchEncryptionKey(
            cid,
            publicKey,
            signedMessage
        )

        let getFileInfo = await fileInfo(fileCid);
        const fileType = getFileInfo.data.mimeType;
        const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType)
        console.log(decrypted)

        // View File
        const url = URL.createObjectURL(decrypted)
        console.log(url)
        setFileURL(url)
    }

    return (
        <div className="App">
            <button onClick={() => decrypt()}>decrypt</button>
            {
                fileURL ?
                    <a href={fileURL} target="_blank">viewFile</a>
                    :
                    null
            }
        </div>
    )
}

export default DecryptFile;