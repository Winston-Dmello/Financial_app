
//Directly routed to from login and displayed only once. 

import UPF from "../../forms/UserProfileForm"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { POSTFUNC } from "../../utils/Utils";

function UserProfile() {
  const data = {
    name: { value: "" },
    ph_no: { value: "" },
    bank: { value: "" },
    ifsc: { value: "" },
    balance: { value: "" },
    age: { value: "" },
  };
  const navigate = useNavigate();
  const {userId} = useUser();

  async function submitForm(event) {
      event.preventDefault();

      let userUrl = `${userId}/profile`;

      const response = await POSTFUNC("myForm",userUrl,"POST","creating user profile!");

      if (response.status == 200) {
        console.log("You will be redirected to home page!");
        navigate('/profile-page');
      } else if (response.status == 412) {
        console.log("User Profile already exists!");
      }
  }
  function handleInputChange() {}
  
  return (
    <>
      <form id="myForm" onSubmit={submitForm}>
        <UPF data={data} OnChange={handleInputChange} check={false} editable={true}/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserProfile;
