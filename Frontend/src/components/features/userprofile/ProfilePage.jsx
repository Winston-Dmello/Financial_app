/**
 * Page where users can view their details
 *  Contains edit profile as well!
 */

import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { GETFUNC } from "../../utils/Utils";
import UPF from "../../forms/UserProfileForm";

export default function Profile(){
    const [userData, setUserData] = useState(null);
    const [editable, setEditable] = useState(false);
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

    const handleEdit = () => {
        setEditable(!editable);
    }
    /* Need to make the edit profile api call */
    return(
        <>
            <div>
                {userData ? (
                    editable ? (
                        <form id="profileForm" onSubmit={handleEdit}>
                            <UPF data={userData} check={true} editable={true}/>
                            <input type="submit"/>
                        </form>
                    ) :(
                        <form id="profileForm">
                            <UPF data={userData} check={true} editable={false}/>
                            <button onClick={handleEdit}>Edit</button>
                        </form>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <br />
                  
        </>
    );

}