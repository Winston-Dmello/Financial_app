import { useUser } from "../../contexts/UserContext";
import { POSTFUNC } from "../../utils/Utils";
import CategoryForm from "../../forms/CategoryForm";


async function sendCategory(event, userId, endpoint, err){
    event.preventDefault();
    let userUrl = `${userId}/${endpoint}`;

    const response = await POSTFUNC("categoryForm",userUrl, err);

    switch(response.status){
        case 200:
            console.log("Response: ",response);
            break;
        case 410:
            console.log("Response: Category doesn't exist!");
            break;
        default:
            console.error("Form submission failed!");
    }
}

function AddCategory(){
    const {userId} = useUser();
    return(
        <>
            <CategoryForm onSubmitForm={(event)=>sendCategory(event, userId, "add_category", "occured during adding category!")} />
        </>
    );
}

function UpdateCategory(){
    const {userId} = useUser();
    return(
        <>
            <CategoryForm onSubmitForm={(event)=>sendCategory(event, userId, "update_category","occured during updating category!")}/>
        </>
    )
}

function DeleteCategory(){
    const {userId} = useUser();
    return(
        <>
            <form onSubmit={(event)=>sendCategory(event, userId, "delete_category","occured during deleting category!")} id="categoryForm">
                <input type="text" name="category" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export {AddCategory, UpdateCategory, DeleteCategory};