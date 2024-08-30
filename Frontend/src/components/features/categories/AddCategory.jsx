import { useUser } from "../../contexts/UserContext";
import { POSTFUNC } from "../../utils/Utils";
import CategoryForm from "../../forms/CategoryForm";

export default function AddCategory(){
    
    const {userId} = useUser();

    async function sendCategory(event){
        event.preventDefault();

        let userUrl = `${userId}/add_category/`;

        const response = await POSTFUNC("categoryForm",userUrl, "adding category!");

        switch(response.status){
            case 200:
                console.log("Response: ",response);
                break;
            default:
                console.error("Form submission failed!");
        }
    }

    return(
        <>
            <CategoryForm onSubmitForm={sendCategory} />
        </>
    );
}