const fs = require('fs')
const ethers = require('ethers')
const lighthouse = require('@lighthouse-web3/sdk')

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider()
  const signer = new ethers.Wallet(privateKey, provider)
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
  const signedMessage = await signer.signMessage(messageRequested)
  return signedMessage
}

const decrypt = async () => {
  try {
    const cid = "QmTJrWjLY9ARCwxYqJwc4Zu8Dzm3fXakAgVvdtgc24X3BU" //Example: 'QmbGN1YcBM25s6Ry9V2iMMsBpDEAPzWRiYQQwCTx7PPXRZ'
    const publicKey = "0xaf8dAa403ddB2b0742BfABE44214Fa8fBe69DCAB" //Example: '0xa3c960b3ba29367ecbcaf1430452c6cd7516f588'
    const privateKey = "e7bac0a6bf7feeeb6504fef7f3fa824a86f6e903aefa19caf068cd5437e83bde"

    // Get file encryption key
    const signedMessage = await signAuthMessage(publicKey, privateKey)
    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    )

    // Decrypt File
    const decrypted = await lighthouse.decryptFile(
      cid,
      fileEncryptionKey.data.key
    )

    // Save File
    fs.createWriteStream("fileName2.png").write(Buffer.from(decrypted))
  } catch (error) {
    console.log("err", error)
  }
}


// Export the function
module.exports = { decrypt };

//can be decrypted by the owner
//can be decrypted by the sharedTo people
//can't be decrypted by the people whom not shared
//later revoked file access of the initially shared and tried to decrypt then not able to decrypt