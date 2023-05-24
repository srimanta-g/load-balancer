let allServerAvailable = [
    {
        serverId : 1,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 2,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 3,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 4,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 5,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 6,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 7,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 8,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 9,
        activeRequestsInServer : [],
        totalLoad : 0
    },
    {
        serverId : 10,
        activeRequestsInServer : [],
        totalLoad : 0
    },
];

const SERVER_MAPPING = {
    1 : "server-one",
    2 : "server-two",
    3 : "server-three",
    4 : "server-four",
    5 : "server-five",
    6 : "server-six",
    7 : "server-seven",
    8 : "server-eight",
    9 : "server-nine",
    10 : "server-ten"
};

let globalRequestId = 0;
let requestList = [];

let requestQueue = [];


setInterval(function () {
    refreshAllAvalaibleServers(allServerAvailable);
},1000);

setInterval(function () {
    let req = requestQueue.shift();
    if(req !== undefined) {
        req.serverAssigned = generateServerMapping();
        progressRequest(req);
    }
}, 1000);

setInterval(function () {
    requestList.forEach(element => {
        element.fileUploadSpeed = Math.ceil(generateRandomFileUploadSpeed());
        document.getElementById(`single-server-upload-speed-${element.requestId}`).innerHTML = element.fileUploadSpeed + "mbps";
    });
}, 5000);



function sendRequest() {
    // console.log(allServerAvailable);
    let req = createRequest();
    // console.log(req);
    requestQueue.push(req);
    
};