let userData = {}

function checkToken() {
    let result = false;
    let lsData = localStorage.getItem('Token');
    if (lsData && lsData != null) {
        result = true;
    }
    return result;
}



//wait for the fetch to occur fully to get a promise with results!
async function createAccount(createdUser) {
    //hit api and return unresolved promise
    let res = await fetch('https://abarcajblogapi.azurewebsites.net/User/AddUsers', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(createdUser)
    });
    if (!res.ok) {
        const message = `An Error has Occurred ${res.status}`
        throw new Error(message)
    }
    //now its readable
    let data = await res.json();
    console.log(data)
}

async function login(loginUser) {
    //hit api and return unresolved promise
    let res = await fetch('https://abarcajblogapi.azurewebsites.net/User/Login', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(loginUser)
    });
    if (!res.ok) {
        const message = `An Error has Occurred ${res.status}`
        throw new Error(message)
    }
    //now its readable
    let data = await res.json();
    // console.log(data)
   return data;
}

async function GetLoggedInUserData(username){
    let res = await fetch(`https://abarcajblogapi.azurewebsites.net/User/userByUsername/${username}`);
    let data = await res.json();
    userData = data;
    console.log(userData);
}

function LoggedInData(){
    return userData;
}

async function addBlogItems(blogItems) {
    //hit api and return unresolved promise
    let res = await fetch('https://abarcajblogapi.azurewebsites.net/BlogItem/AddBlogItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(blogItems)
    });
    if (!res.ok) {
        const message = `An Error has Occurred ${res.status}`
        throw new Error(message)
    }
    //now its readable
    let data = await res.json();
    // console.log(data);
    return data;
}


async function getBlogItems()
{
    let res = await fetch('https://abarcajblogapi.azurewebsites.net/BlogItem/GetBlogItems');
    let data = await res.json();
    return data;
}

async function getBlogItemsByUserId(UserId)
{
    let res = await fetch(`https://abarcajblogapi.azurewebsites.net/BlogItem/GetItemsByUserID/${UserId}`);
    let data = await res.json();
    return data;
}

async function updateBlogItems(blogItems) {
    //hit api and return unresolved promise
    let res = await fetch('https://abarcajblogapi.azurewebsites.net/BlogItem/UpdateBlogItem', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(blogItems)
    });
    if (!res.ok) {
        const message = `An Error has Occurred ${res.status}`
        throw new Error(message)
    }
    //now its readable
    let data = await res.json();
    // console.log(data);
    return data;
}

async function getPublishedBlogItems(){
    let res = await fetch('https://abarcajblogapi.azurewebsites.net/BlogItem/GetPublishedItems');
    let data = res.json();
    return data;
}

export { checkToken, createAccount, login, GetLoggedInUserData, LoggedInData, addBlogItems, getBlogItems, getBlogItemsByUserId, updateBlogItems, getPublishedBlogItems };