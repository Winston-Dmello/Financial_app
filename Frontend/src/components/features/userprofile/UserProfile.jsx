
//Directly routed to from login and displayed only once. 

import UPF from "../../forms/UserProfileForm"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

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
      const formElement = document.getElementById("myForm");
      let formData = new FormData(formElement);
      let details = JSON.stringify(Object.fromEntries(formData));
      try {
        const response = await fetch(`http://localhost:8000/${userId}/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: details,
        });
        if (response.status == 200) {
          console.log("You will be redirected to home page!");
          navigate('/profile-page');
        } else if (response.status == 412) {
          console.log("User Profile already exists!");
        }
      } catch (error) {
        console.log("An error occured!");
      }
  }
  function handleInputChange() {}
  
  return (
    <>
      <form id="myForm" onSubmit={submitForm}>
        <UPF data={data} OnChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserProfile;
