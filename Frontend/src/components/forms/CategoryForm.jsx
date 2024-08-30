

export default function CategoryForm({onSubmitForm}){

    return(
        <>
            <form action="" id="categoryForm" onSubmit={onSubmitForm}>
                <label htmlFor="category">Category: </label>
                <input type="text" id="category" name="category" required/>
                <br />
                <label htmlFor="priority">Priority: </label>
                <input type="number" id="priority" name="priority" required/>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );  
}