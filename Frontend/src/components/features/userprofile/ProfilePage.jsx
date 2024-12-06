/**
 * Page where users can view their details
 *  Contains edit profile as well!
 */

import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { GETFUNC, sendRequest } from "../../utils/Utils";
import UPF from "../../forms/UserProfileForm";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const { userId } = useUser();
  async function getUserData() {
    let userUrl = `${userId}/profile/`;
    const response = await GETFUNC(userUrl, "while fetching user profile");
    setUserData(response);
    console.log(response);
  }
  async function editProfile(event) {
    //event, formId, userId, endpoint, method, err
    let response = await sendRequest(
      event,
      "profileForm",
      userId,
      "edit_profile",
      "POST",
      "Editing profile!"
    );
  }
  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = (event) => {
    setEditable(!editable);
    editProfile(event);
  };
  /* Need to make the edit profile api call */
  return (
    <>
      <div>
        {userData ? (
          editable ? (
            <form id="profileForm" onSubmit={(event) => handleEdit(event)}>
              <UPF data={userData} check={true} editable={true} />
              <input type="submit" />
              <button onClick={() => setEditable(!editable)}>Cancel</button>
            </form>
          ) : (
            <form id="profileForm">
              <UPF data={userData} check={true} editable={false} />
              <button onClick={() => setEditable(!editable)}>Edit</button>
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
