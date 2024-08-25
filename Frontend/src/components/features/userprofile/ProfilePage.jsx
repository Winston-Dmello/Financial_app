import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";

export default function Profile(){
    const [userData, setUserData] = useState(null);
    const {userId} = useUser();
    async function getUserData(){
        try{
            const response = await fetch(`http://localhost:8000/${userId}/profile/`)
            let data = await response.json();
            setUserData(data);
            console.log(data);
        }catch(error){
            console.log("Error: ", error);
        }
    }
    useEffect(()=>{
        getUserData();
    }, []);

    return(
        <>
            <div>{JSON.stringify(userData, null, 2)}</div>
        </>
    );

}