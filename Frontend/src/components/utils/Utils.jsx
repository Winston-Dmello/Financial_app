
async function POSTFUNC(formId, url, err){
    const formElement = document.getElementById(formId);
    let formData = new FormData(formElement);
    let details = JSON.stringify(Object.fromEntries(formData));

    try{
        const response = await fetch(`http://localhost:8000/${url}`,{
            method: "POST",
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
        return response;
    }catch(error){
        console.log(`Error: ${err}`, error);
    }
}

export {POSTFUNC, GETFUNC};