import { useUser } from "../../contexts/UserContext";
import { sendRequest } from "../../utils/Utils";
import CategoryForm from "../../forms/CategoryForm";

function AddCategory(){
    const {userId} = useUser();
    return(
        <>
            <CategoryForm onSubmitForm={(event)=>sendRequest(event, userId, "category","POST", "occured during adding category!")} />
        </>
    );
}

function UpdateCategory(){
    const {userId} = useUser();
    return(
        <>
            <CategoryForm onSubmitForm={(event)=>sendRequest(event, userId, "category","PUT","occured during updating category!")}/>
        </>
    );
}

function DeleteCategory(){
    const {userId} = useUser();
    return(
        <>
            <form onSubmit={(event)=>sendRequest(event, userId, "category","DELETE","occured during deleting category!")} id="categoryForm">
                <input type="text" name="category" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export {AddCategory, UpdateCategory, DeleteCategory};