import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/home.css";
import Popup from "./Popup";

let userId = localStorage.getItem("UserID");

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/${userId}/get_transactions`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setTransactions(data);
        } else {
          alert("Something went wrong Try Again Later!");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleSignUp = () => {
    navigate("/signup");
  };

  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8000/${userId}/upload_file/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status == 200) {
        setUploadSuccess(true);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error occurred during upload:", error);
    }
  };

  async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(document.getElementById("myForm"));
    let details = JSON.stringify(Object.fromEntries(formData));
    console.log(details);

    try {
      const response = await fetch(`http://localhost:8000/${userId}/add_transaction/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: details,
      });

      if (response.status == 200) {
        closePopup();
        console.log("Success");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogin = () => {
    navigate("/login");
  };

  const handleAbout = () => {
    navigate("/about");
  };
  return (
    <div>
      <header className="nav-bar">
        <h1 className="logo">Transaction Tracker</h1>
        <button className="menu-toggle">Menu</button>
        <button className="logout-btn">Logout</button>
      </header>
      <nav className="slide-panel">
        <ul>
          <li>
            <a href="#">Menu Option 1</a>
          </li>
          <li>
            <a href="#">Menu Option 2</a>
          </li>
          <li>
            <a href="#">Menu Option 3</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
      <section className="content-wrapper">
        <h1>Transactions</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Date</th>
                <th>Particulars</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Notes</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {transactions &&
                transactions.map((item, index) => {
                  const key = Object.keys(item)[0];
                  const { Date, particulars, amount, type, Category, notes } =
                    item[key];
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Date}</td>
                      <td>{particulars}</td>
                      <td>{amount}</td>
                      <td>{type}</td>
                      <td>{Category}</td>
                      <td>{notes}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <div className="buttons">
          <label htmlFor="file-upload" className="custom-file-upload">
            <span className="button-text">Upload</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button type="Submit">Submit</button>
          <button className="add-btn" onClick={openPopup}>
            Add
          </button>
        </div>
      </form>
      <Popup isOpen={isOpen} onClose={closePopup}>
        <form id="myForm" onSubmit={submitForm}>
          <label htmlFor="Date">Date(dd-mm-yyyy):</label>
          <input type="text" placeholder="" required></input>
          <label htmlFor="particulars">Particulars:</label>
          <input type="text" name="particulars" placeholder="" required></input>
          <label htmlFor="Amount">Amount:</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="any"
            placeholder=""
            required
          ></input>
          <label htmlFor="Type">Type:(UPI/NON-UPI)</label>
          <input type="text" name="type" required></input>
          <label htmlFor="Category">Category:</label>
          <select name="Category" id="category">
            <option value={"I"}>Sleep</option>
            <option value={"random"}>random it seems</option>
          </select>
          <label htmlFor="Notes">Notes:</label>
          <input type="text" name="notes" />
          <button type="submit">Submit</button>
        </form>
      </Popup>
    </div>
  );
}
