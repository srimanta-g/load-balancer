
// function generateRandomFileSize() {
//     return Math.random() * (1000 - 300) + 300;
// }

function createRequest() {
    return {
        requestId : generateRequestId(),
        fileSize : generateRandomFileSize(),
        serverAssigned : undefined,
        fileUploadSpeed : Math.ceil(generateRandomFileUploadSpeed()),
        isActive : true,
        progress : 0,
        doWork : function(callback) {

            const intervalId = setInterval(() => {
                
                if(this.progress >= this.fileSize) {
                        this.isActive = false;
                        callback(this.requestId, this);
                        clearInterval(intervalId);
                    }

                let element = document.getElementById("single-server-progress-bar-" + this.requestId);
                if(element !== null) {
                    element.setAttribute(
                        "style", "width : " + findPercentage(this.progress, Math.ceil(this.fileSize)) + "%")
                } 
                this.progress += this.fileUploadSpeed;

            }, 1000);
        }
    };
};

function generateRandomFileUploadSpeed() {
    return Math.random() * (70 - 10) + 10;
}

function findPercentage(curr, total) {
    return (100 * curr) / total;
}

function generateRequestId() {
    globalRequestId += 1;
    return globalRequestId;
};

function generateRandomFileSize() {
    return Math.random() * (700 - 400) + 400;
}

function addRequestToList(req) {
    addRequestToSingleServer(allServerAvailable, req.serverAssigned, req);
    requestList.push(req);
    req.doWork(removeRequestFromList);
}

function removeRequestFromList(reqId, req) {
    removeElementFromDocument(reqId);
    removeRequestFromSingleServer(allServerAvailable, req.serverAssigned, reqId);
    requestList = requestList.filter(item => item.requestId !== reqId);
    // console.log(requestList);
    // console.log(allServerAvailable);
}

function removeElementFromDocument(reqId) {
    document.getElementById(`request-${reqId}`).outerHTML = "";
}

function generateServerMapping() {
    return getServerWithMinimumLoad(allServerAvailable);
}



function progressRequest(req) {
    addRequestToList(req);

    let parentDiv = document.getElementById(SERVER_MAPPING[req.serverAssigned]);
    let childDiv = document.createElement("div");

    childDiv.className = "request";
    childDiv.setAttribute("id", `request-${req.requestId}`);
    childDiv.innerHTML = `<div class="single-server-text">R${req.requestId}</div>
            <div class="single-server-text" id="single-server-filesize">${Math.round(req.fileSize)} mb</div>
            <div class="single-server-text" id="single-server-upload-speed-${req.requestId}">${Math.round(req.fileUploadSpeed)}mbps</div>
            <div class="single-server-progress-div">
                <div class="progress">
                    <div id="single-server-progress-bar-${req.requestId}" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>`;

    parentDiv.appendChild(childDiv);
}