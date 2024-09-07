
async function POSTFUNC(formId, url, method, err){
    const formElement = document.getElementById(formId);
    let formData = new FormData(formElement);
    let details = JSON.stringify(Object.fromEntries(formData));

    try{
        const response = await fetch(`http://localhost:8000/${url}`,{
            method: method,
            headers: {
                "Content-Type":"application/json",
            },
            body: details,
        });
        return response.json();
    }catch(error){
        console.log(`Error: ${err}`, error);
    }
}

async function GETFUNC(url, err){
    try{
        const response = await fetch(`http://localhost:8000/${url}`);
        return response.json();
    }catch(error){
        console.log(`Error: ${err}`, error);
    }
}


async function sendRequest(event, userId, endpoint, method, err){
    event.preventDefault();
    let userUrl = `${userId}/${endpoint}`;

    const response = await POSTFUNC("categoryForm",userUrl, method, err);

    switch(response.status){
        case 200:
            console.log("Response: ",response);
            break;
        case 417:
            console.log("Response: ", response.message);
            break;
        case 410:
            console.log("Response: Category doesn't exist!");
            break;
        default:
            console.error("Form submission failed!");
    }
}


export {POSTFUNC, GETFUNC, sendRequest};