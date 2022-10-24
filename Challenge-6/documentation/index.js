const {
    Collection,
    Item,
    Header
} = require("postman-collection");
const fs = require("fs");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiY2hhcmxlcyIsIm5pY2tuYW1lIjoiZ2Fuc3MiLCJpYXQiOjE2NjUxMjk2NTh9.RCm5nv12fi4EnifDNL8uLOC6VSp9bD33Gg-4NJv1QPg"

// create collection
const postmanCollection = new Collection({
    info: {
        name: "Dokumentasi API Challenge 4"
    },
    item: []
});

// set header
// const rawHeaderString =
//     `Authorization:\nContent-Type:application/json\ncache-control:no-cache\n`;

// const rawHeader = Header.parse(rawHeaderString);

// const requestHeader = rawHeader.map((h) => new Header(h));

// // create endpoint
// const apiEndpoint = "https://httpbin.org/post";
// const requestName = "Contoh req pake postman";

// const requestPayload = {
//     key1: "value_1",
//     key2: "value_2",
//     key3: "value_3",
// };

// add test for request
const requestTest = `
pm.test('Sample test: Test for succesfull response', function(){
    pm.expect(pm.response.code).to.equal(200);
});
`;

// USER REQUEST
// User Registration Request
const postmanRequestUserRegistration = new Item({
    name: "User Registration",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/user/register",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "username": "charles",
                "password": "gunawan",
                "nickname": "ganss"
            }),
        },
        auth: null,
        description: "Registrasi User dengan menginput username, password, dan nickname"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// User Login Request
const postmanRequestUserLogin = new Item({
    name: "User Login",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/user/login",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "username": "charles",
                "password": "gunawan"
            }),
        },
        auth: null,
        description: "Login User dengan menginput username dan password"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Change Password Request
const postmanRequestUserChangePass = new Item({
    name: "User Change Password",
    request: {
        header: {
            "Content-Type": "application/json",
            Authorization: token
        },
        url: "localhost:3000/user/chagepass",
        method: "PATCH",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "oldPass": "gunawan",
                "newPass": "gunawan123",
                "confirmPass": "gunawan123"
            }),
        },
        auth: null,
        description: "User Change Password dengan menginput password lama, password baru, dan konfirmasi password baru"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Delete User Request
const postmanRequestDeleteUser = new Item({
    name: "Delete User",
    request: {
        header: {
            "Content-Type": "application/json",
            Authorization: token
        },
        url: "localhost:3000/user/delete/:id",
        method: "DELETE",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "confirmPass": "gunawan123"
            }),
        },
        auth: null,
        description: "Delete User dengan mengonfirmasi password"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Get All User Request
const postmanRequestGetAllUser = new Item({
    name: "Get All User",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/user/all",
        method: "GET",
        auth: null,
        description: "Get All User"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Get Detail User Request
const postmanRequestGetDetailUser = new Item({
    name: "Get Detail User",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/user/detail/13",
        method: "GET",
        auth: null,
        description: "Get Detail User using id as param at the end of url"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Who am i Request
const postmanRequestWhoAmI = new Item({
    name: "Get Detail User",
    request: {
        header: {
            "Content-Type": "application/json",
            Authorization: token
        },
        url: "localhost:3000/user/whoami",
        method: "GET",
        auth: null,
        description: "Get data of user who login using token as authorization"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});


// BIODATA REQUEST
// Create Biodata Request
const postmanRequestCreateBio = new Item({
    name: "Create Biodata",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/bio/create",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "name":"charles",
                "email":"charles23@gmail.com",
                "region":"Asia"
                }),
        },
        auth: null,
        description: "Create Biodata dengan menginput name, email, dan region"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Get All Biodata Request
const postmanRequestGetAllBio = new Item({
    name: "Get All Biodata",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/bio/all",
        method: "GET",
        auth: null,
        description: "Get All Biodata"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Get Detail Biodata Request
const postmanRequestGetDetailBio = new Item({
    name: "Get Detail Biodata",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/bio/detail/6",
        method: "GET",
        auth: null,
        description: "Get Detail of Biodata with id as param at the end of url"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Change Email in Biodata Request
const postmanRequestChangeEmail = new Item({
    name: "Change Email in Biodata",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/bio/changeemail",
        method: "PATCH",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "oldEmail":"charlesgunawan23@gmail.com",
                "newEmail":"charlesaja@gmail.com",
                "confirmEmail":"charlesaja@gmail.com"
            }),
        },
        auth: null,
        description: "Change Email in Biodata with input old email, new email, and confirm email"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Delete Biodata Request
const postmanRequestDeleteBiodata = new Item({
    name: "Delete Biodata",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/bio/delete/6",
        method: "DELETE",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "confirmEmail":"charlesaja@gmail.com"
            }),
        },
        auth: null,
        description: "Delete Biodata with input confirm email and id as param at the end of url"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// HISTORY REQUEST
// Create History Request
const postmanRequestCreateHistory = new Item({
    name: "Create History",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/history/create",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "playerOneId":14, 
                "playerOneScore":12,
                "playerTwoId":12,
                "playerTwoScore":12
                }),
        },
        auth: null,
        description: "Create History dengan menginput id player 1 dan 2, serta score dari masing-masing player"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Get All History Request
const postmanRequestGetAllHistory = new Item({
    name: "Get All History",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/history/all",
        method: "GET",
        auth: null,
        description: "Get All History"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Get Detail History Request
const postmanRequestGetDetailHistory = new Item({
    name: "Get Detail History",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/history/detail/3",
        method: "GET",
        auth: null,
        description: "Get Detail of History with id as param at the end of url"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Change Score in History Request
const postmanRequestChangeHistory = new Item({
    name: "Change Email in History",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/history/changehistory/3",
        method: "PATCH",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "newPlayerOneScore": 1,
                "newPlayerTwoScore": 3
                }),
        },
        auth: null,
        description: "Change Email in History with input score baru masing-masing player dan id sebagai param di akhir url"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Delete Biodata Request
const postmanRequestDeleteHistory = new Item({
    name: "Delete History",
    request: {
        header: {
            "Content-Type": "application/json"
        },
        url: "localhost:3000/history/delete/5",
        method: "DELETE",
        auth: null,
        description: "Delete History with id as param at the end of url"
    },
    events: [{
        listen: "test",
        script: {
            type: "text/javascript",
            exec: requestTest,
        },
    }, ]
});

// Add request
postmanCollection.items.add(postmanRequestChangeEmail);
postmanCollection.items.add(postmanRequestChangeHistory);
postmanCollection.items.add(postmanRequestCreateBio);
postmanCollection.items.add(postmanRequestCreateHistory);
postmanCollection.items.add(postmanRequestDeleteBiodata);
postmanCollection.items.add(postmanRequestDeleteHistory);
postmanCollection.items.add(postmanRequestDeleteUser);
postmanCollection.items.add(postmanRequestGetAllBio);
postmanCollection.items.add(postmanRequestGetAllHistory);
postmanCollection.items.add(postmanRequestGetDetailBio);
postmanCollection.items.add(postmanRequestGetAllUser);
postmanCollection.items.add(postmanRequestGetDetailHistory);
postmanCollection.items.add(postmanRequestGetDetailUser);
postmanCollection.items.add(postmanRequestUserChangePass);
postmanCollection.items.add(postmanRequestUserLogin);
postmanCollection.items.add(postmanRequestUserRegistration);
postmanCollection.items.add(postmanRequestWhoAmI);

// convert to JSON
const collectionJSON = postmanCollection.toJSON();

// export to file
fs.writeFile("collection.json", JSON.stringify(collectionJSON), (err) => {
    if (err) console.log(err);
    console.log("file saved!");
});