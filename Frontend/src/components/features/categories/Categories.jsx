import { useUser } from "../../contexts/UserContext";
import { GETFUNC, sendRequest } from "../../utils/Utils";
import CategoryForm from "../../forms/CategoryForm";
import { useEffect, useState } from "react";

const AddCategory = ({ userId, update }) => {
  return (
    <>
      <CategoryForm
        onSubmitForm={(event) => {
          sendRequest(
            event,
            "categoryForm", //formID
            userId,
            "category", //endpoint
            "POST", //method
            "occured during adding category!" //error description
          );
          update();
        }}
      />
    </>
  );
};

const UpdateCategory = ({ userId, update }) => {
  return (
    <>
      <CategoryForm
        onSubmitForm={(event) => {
          sendRequest(
            event,
            "categoryForm",
            userId,
            "category",
            "PUT",
            "occured during updating category!"
          );
          update();
        }}
      />
    </>
  );
};

const DeleteCategory = ({ userId, update }) => {
  return (
    <>
      <form
        id="categoryForm"
        onSubmit={(event) => {
          sendRequest(
            event,
            "categoryForm",
            userId,
            "category",
            "DELETE",
            "occured during deleting category!"
          );
          update();
        }}
      >
        <input type="text" name="category" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const Categories = () => {
  /*The actual categories page*/
  const [selector, setSelector] = useState(null);
  const { userId } = useUser();
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    const data = await GETFUNC(`${userId}/category`);
    setCategories(data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (  
    <>
      <h1>Categories!</h1>
      {categories
        ? Object.entries(categories).map(([key, val]) => (
            <li key={key}>{`${key} : ${val}`}</li>
          ))
        : ""}
      <select onChange={(e) => setSelector(e.target.value)}>
        <option value={null}>Select</option>
        <option value={"add"}>Add Category</option>
        <option value={"upt"}>Update Category</option>
        <option value={"del"}>Delete Category</option>
      </select>
      <br />
      <br />
      <div>
        {selector == "add" ? (
          <AddCategory userId={userId} update={getCategories} />
        ) : selector == "upt" ? (
          <UpdateCategory userId={userId} update={getCategories} />
        ) : selector == "del" ? (
          <DeleteCategory userId={userId} update={getCategories} />
        ) : (
          <p>What would you like to do?</p>
        )}
      </div>
    </>
  );
};

export { AddCategory, UpdateCategory, DeleteCategory, Categories };
