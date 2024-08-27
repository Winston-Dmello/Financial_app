/**
 * Page where users can view their details
 *  Contains edit profile as well!
 */

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
            <div>
                {userData ? (
                    Object.entries(userData).map(([key, value]) => (
                        <span key={key}>
                            <strong>{key}: </strong> {value}
                            <br />
                        </span> 
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <br />
            
        </>
    );

}