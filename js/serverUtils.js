
function refreshAllAvalaibleServers(allServerAvailable) {
    for(let i=0;i<allServerAvailable.length;i++) {
        refreshSingleServer(allServerAvailable[i]);
    }
}

function refreshSingleServer(server) {
    let totalFileSize = 0;
    let fileUploaded = 0;
    for(let i=0;i<server.activeRequestsInServer.length;i++) {
        totalFileSize += server.activeRequestsInServer[i].fileSize;
        fileUploaded += server.activeRequestsInServer[i].progress;
    }
    server.totalLoad = totalFileSize - fileUploaded < 0 ? 0 : totalFileSize - fileUploaded;
}

function getServerWithMinimumLoad(allServerAvailable) {
    let minLoad = allServerAvailable[0].totalLoad;
    let serverId = allServerAvailable[0].serverId;

    for(let i=1;i<allServerAvailable.length;i++) {
        if(allServerAvailable[i].totalLoad < minLoad) {
            minLoad = allServerAvailable[i].totalLoad;
            serverId = allServerAvailable[i].serverId;
        }
    }
    // printLoadOfAllServer();
    // console.log(serverId);
    return serverId;
}

function printLoadOfAllServer(allServerAvailable) {
    console.log("server 1 : " + allServerAvailable[0].totalLoad);
    console.log("server 2 : " + allServerAvailable[1].totalLoad);
    console.log("server 3 : " + allServerAvailable[2].totalLoad);
    console.log("server 4 : " + allServerAvailable[3].totalLoad);
    console.log("server 5 : " + allServerAvailable[4].totalLoad);
    console.log("server 6 : " + allServerAvailable[5].totalLoad);
    console.log("server 7 : " + allServerAvailable[6].totalLoad);
    console.log("server 8 : " + allServerAvailable[7].totalLoad);
    console.log("server 9 : " + allServerAvailable[8].totalLoad);
    console.log("server 10 : " + allServerAvailable[9].totalLoad);
}

function addRequestToSingleServer(allServerAvailable, serverId, req) {
    allServerAvailable[serverId - 1].activeRequestsInServer.push(req);
}

function removeRequestFromSingleServer(allServerAvailable, serverId, reqId) {
    console.log(allServerAvailable[serverId - 1].activeRequestsInServer);
    console.log(reqId);
    allServerAvailable[serverId - 1].activeRequestsInServer = allServerAvailable[serverId - 1].activeRequestsInServer.filter(item => item.requestId !== reqId);
}