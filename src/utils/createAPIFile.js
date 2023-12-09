import axios from 'axios'
import { ethers } from 'ethers'
import lighthouse from '@lighthouse-web3/sdk'


const signAuthMessage = async (verificationMessage) => {
    const address = await signer.getAddress();
    const signedMessage = await signer.signMessage(verificationMessage)
    return {
        signedMessage: signedMessage,
        publicKey: address,
    };
}


const getApiKey = async () => {
    const verificationMessage = (
        await axios.get(
            `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`
        )
    ).data
    const signedMessage = await signAuthMessage(verificationMessage);
    const response = await lighthouse.getApiKey(signedMessage.publicKey, signedMessage.signedMessage)
    console.log(response)
}

getApiKey()
