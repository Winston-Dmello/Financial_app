import { useUser } from "../../contexts/UserContext";
import { sendRequest } from "../../utils/Utils";
import CategoryForm from "../../forms/CategoryForm";

const AddCategory = () => {
    const {userId} = useUser();
    return(
        <>
            <CategoryForm onSubmitForm={(event)=>sendRequest(event,"categoryForm", userId, "category","POST", "occured during adding category!")} />
        </>
    );
}

const UpdateCategory = () => {
    const {userId} = useUser();
    return(
        <>
            <CategoryForm onSubmitForm={(event)=>sendRequest(event,"categoryForm", userId, "category","PUT","occured during updating category!")}/>
        </>
    );
}

const DeleteCategory = () => {
    const {userId} = useUser();
    return(
        <>
            <form onSubmit={(event)=>sendRequest(event,"categoryForm", userId, "category","DELETE","occured during deleting category!")} id="categoryForm">
                <input type="text" name="category" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

const Categories = () => { /*The actual categories page*/

}

export {AddCategory, UpdateCategory, DeleteCategory};