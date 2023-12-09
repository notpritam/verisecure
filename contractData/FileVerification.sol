// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FileVerification {
    struct Document {
        string cid;
        string docName;
        uint256 fileSize;
        address docOwner;
    }

    struct Request {
        address requestSender;
        string cid;
        bool requestSent;
        bool acknowledgment;
    }

    mapping(string => Document) public documents; // cid to document
    mapping(address => mapping(string => Request)) public requestAccess; // request sender address to request
    mapping(address => Request[]) public pendingRequests; // owner to array of pending requests
    mapping(address => Document[]) public sentRequests; // sender address to array of sent requests

    event RequestSent(
        address indexed sender,
        address indexed receiver,
        string cid
    );
    event RequestApproved(address indexed sender, string cid);
    event RequestRejected(address indexed sender, string cid);
    event DocumentAdded(string cid, string docName, address uploader);

    modifier onlyDocumentOwner(string memory _cid) {
        require(
            documents[_cid].docOwner == msg.sender,
            "Not the owner of the document"
        );
        _;
    }

    function addDocument(
        string memory _cid,
        string memory _docName,
        uint256 _fileSize
    ) public {
        documents[_cid] = Document(_cid, _docName, _fileSize, msg.sender);
        emit DocumentAdded(_cid, _docName, msg.sender);
    }

    // company to university
    function sendRequestForApproval(string memory _cid) public {
        require(
            documents[_cid].docOwner != address(0),
            "Document does not exist"
        );
        Request storage request = requestAccess[msg.sender][_cid];

        require(!request.requestSent, "Access Request already sent");
        require(!request.acknowledgment, "Access Request already approved");
        require(
            documents[_cid].docOwner != msg.sender,
            "Cannot send request to yourself"
        );

        request.requestSender = msg.sender;
        request.requestSent = true;
        request.cid = _cid;

        // Add the document reference to the pendingRequests mapping
        pendingRequests[documents[_cid].docOwner].push(request); // request to be approved
        sentRequests[msg.sender].push(documents[_cid]);

        emit RequestSent(msg.sender, documents[_cid].docOwner, _cid);
    }

    function approveRequest(
        string memory _cid,
        address _requestSender
    ) public onlyDocumentOwner(_cid) {
        // require(pendingRequests[msg.sender]==msg.sender,"Didn't receive request from this address");

        Request storage request = requestAccess[_requestSender][_cid];
        require(request.requestSent, "No request for this document was sent");
        request.acknowledgment = true;

        // Remove the document from the pendingRequests array
        removePendingRequest(pendingRequests[msg.sender], _requestSender);

        emit RequestApproved(_requestSender, _cid);
    }

    function rejectRequest(
        string memory _cid,
        address _requestSender
    ) public onlyDocumentOwner(_cid) {
        // require(requestAccess[msg.sender][_cid].requestSender==_requestSender,"Didn't receive request from this address");
        Request storage request = requestAccess[_requestSender][_cid];
        require(request.requestSent, "No request for this document was sent");
        request.acknowledgment = false;
        // Remove the document from the pendingRequests array
        removePendingRequest(pendingRequests[msg.sender], _requestSender);

        emit RequestRejected(_requestSender, _cid);
    }

    function removePendingRequest(
        Request[] storage requestArray,
        address _requestSender
    ) internal {
        for (uint256 i = 0; i < requestArray.length; i++) {
            // if (keccak256(abi.encodePacked(requestArray[i]._requestSender)) == keccak256(abi.encodePacked(_cid))) {
            if (requestArray[i].requestSender == _requestSender) {
                // Remove the document at index i by moving the last element to index i and reducing the length
                requestArray[i] = requestArray[requestArray.length - 1];
                requestArray.pop();
                break;
            }
        }
    }

    function getPendingRequests() public view returns (Request[] memory) {
        return pendingRequests[msg.sender];
    }

    function getSentRequests() public view returns (Document[] memory) {
        return sentRequests[msg.sender];
    }
}
