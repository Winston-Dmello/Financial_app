import React, { useState, useEffect } from "react";
import "../assets/categories.css";
const Categories = () => {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState(1);

  const [categoriesList, setCategoriesList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriorityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setPriority(value);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/categories/");
      if (response.ok) {
        const data = await response.json();
        setCategoriesList(data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("An error occurred while fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, priority }),
      });
      if (response.ok) {
        console.log("Category added successfully");
        fetchCategories();
        setCategory("");
        setPriority(1);
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("An error occurred while adding category:", error);
    }
  };

  const handleEditCategory = async (index) => {
    const categoryIdToEdit = categoriesList[index]?.id;
    const updatedCategory = categoriesList[index]?.category;
    const updatedPriority = categoriesList[index]?.priority;
    try {
      const response = await fetch(
        `http://localhost:8000/categories/${categoryIdToEdit}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: updatedCategory,
            priority: updatedPriority,
          }),
        }
      );
      if (response.ok) {
        console.log("Category edited successfully");
        fetchCategories();
        setAlertMessage("Category edited successfully");
      } else if (response.status === 410) {
        setAlertMessage("Category does not exist");
      } else {
        console.error("Failed to edit category");
      }
    } catch (error) {
      console.error("An error occurred while editing category:", error);
    }
  };

  const handleDeleteCategory = async (index) => {
    const categoryIdToDelete = categoriesList[index]?.id;
    try {
      const response = await fetch(
        `http://localhost:8000/categories/${categoryIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Category deleted successfully");
        fetchCategories();
        setAlertMessage("Category deleted successfully");
      } else if (response.status === 410) {
        setAlertMessage("Category does not exist");
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("An error occurred while deleting category:", error);
    }
  };

  return (
    <div>
      {alertMessage && <div className="alert">{alertMessage}</div>}
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <input
            type="number"
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
            min={1}
            max={5}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <div>
        <h2>Categories List</h2>
        <ul>
          {categoriesList.map((item, index) => (
            <li key={index}>
              <input
                type="text"
                value={item.category}
                onChange={(e) => {
                  const updatedCategories = [...categoriesList];
                  updatedCategories[index].category = e.target.value;
                  setCategoriesList(updatedCategories);
                }}
              />
              <input
                type="number"
                value={item.priority}
                onChange={(e) => {
                  const updatedCategories = [...categoriesList];
                  updatedCategories[index].priority = parseInt(e.target.value);
                  setCategoriesList(updatedCategories);
                }}
                min={1}
                max={5}
              />
              <button onClick={() => handleEditCategory(index)}>Edit</button>
              <button onClick={() => handleDeleteCategory(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
