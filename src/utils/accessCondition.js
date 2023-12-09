const lighthouse = require('@lighthouse-web3/sdk')

const accessConditions = async (fileCid) => {
  try {
    const cid = fileCid;
    const response = await lighthouse.getAccessConditions(cid);
    // Print the access conditions
    console.log(response);
    return response;
    /* Sample Response
{
  data: {
    conditions: [],
    conditionsSolana: [],
    sharedTo: [],
    owner: '0xeaf4e24ffc1a2f53c07839a74966a6611b8cb8a1',
    cid: 'QmdCHt856NADJDjrPRWapDnwYy1KCGdByYwXPqduFYXVpM'
  }
}
*/
  } catch (err) {
    return err;
  }
}

// Export the function
module.exports = { accessConditions };