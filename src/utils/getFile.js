
const lighthouse = require('@lighthouse-web3/sdk')

const fileInfo = async (fileCid) => {
  try {
    const cid = fileCid
    const fileInfo = await lighthouse.getFileInfo(cid)
    console.log(fileInfo)
    return fileInfo;
  }
  catch (err) {
    console.log("err", err)
  }

}
module.exports = { fileInfo };