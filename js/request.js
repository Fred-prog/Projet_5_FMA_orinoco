
//export const 
get = function (url) {
    return new Promise((resolve, reject)=> {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                resolve(request.responseText);
            } else if (this.status =! 200) {
                reject(request)
            }
        }
        request.open('GET', url, true);
        request.send();
    });
}

let catchError = function(e) {
    console.error("Erreur ajax", e);
}



post1 = function (url, jsonBody) {
    return new Promise((resolve, reject) => {
        let requestPost = new XMLHttpRequest();
        requestPost.onload = function () {
            resolve(requestPost.responseText);
        }
        requestPost.open('POST', url, true);
        requestPost.setRequestHeader("Content-Type", "application/json");
        requestPost.send(JSON.stringify(jsonBody));
        //resolve(request.status);
    })
}
