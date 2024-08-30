/**
 * Page where users can view their details
 *  Contains edit profile as well!
 */

import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { GETFUNC } from "../../utils/Utils";

export default function Profile(){
    const [userData, setUserData] = useState(null);
    const {userId} = useUser();
    async function getUserData(){
        let userUrl = `${userId}/profile/`;
        const response = await GETFUNC(userUrl, "while fetching user profile");
        setUserData(response);
        console.log(response);
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