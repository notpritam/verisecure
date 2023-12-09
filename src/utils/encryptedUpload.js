
const ethers = require('ethers')
const lighthouse = require('@lighthouse-web3/sdk')
const kavach = require('@lighthouse-web3/kavach')

const signAuthMessage = async (privateKey) => {
    const signer = new ethers.Wallet(privateKey)
    const authMessage = await kavach.getAuthMessage(signer.address)
    const signedMessage = await signer.signMessage(authMessage.message)
    const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
    return (JWT)
}

const uploadEncrypted = async () => {
    /**
     * This function lets you upload a file to Lighthouse with encryption enabled.
     * 
     * @param {string} path - Location of your file.
     * @param {string} apiKey - Your unique Lighthouse API key.
     * @param {string} publicKey - User's public key for encryption.
     * @param {string} signedMessage - A signed message or JWT used for authentication at encryption nodes.
     * 
     * @return {object} - Returns details of the encrypted uploaded file.
     */

    const pathToFile = 'XRP.png'
    const apiKey = '70f95287.3ddfaeb3f1ca462591d6333fe8599a50'
    const publicKey = '0x37e401D92961908046c2672A89a780bFaD2FA927'
    const privateKey = '475d684b486e10bacd57dc67ac6b0ab566ab0b3235c1acda07fa3bb3bb8eb425'
    const signedMessage = await signAuthMessage(privateKey)

    const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, signedMessage)
    console.log(response)
}

uploadEncrypted()

/*
{
    data: [
      {
        Name: 'wow.text',
        Hash: 'QmXhvRaWPpEXgFzqBLkq75EcE79oghqE3pGtkmiU21LnPf',
        Size: '91'
      }
    ]
  }
When tried to open this encrypted file not able to open
https://gateway.lighthouse.storage/ipfs/QmXhvRaWPpEXgFzqBLkq75EcE79oghqE3pGtkmiU21LnPf/

  */

/*
{
  data: [
    {
      Name: 'XRP.png',
      Hash: 'QmTJrWjLY9ARCwxYqJwc4Zu8Dzm3fXakAgVvdtgc24X3BU',
      Size: '73394'
    }
  ]
}
*/