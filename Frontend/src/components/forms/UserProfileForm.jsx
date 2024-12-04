import { useUser } from "../contexts/UserContext";  

function UPF({ data, OnChange, check, editable }) {
    /* If check is false, UserProfile Page is rendered (which needs no data whatsoever)
       If check is true, Profile Page is loaded*/
    return (
        <>
        {editable ? (
            Object.entries(data).map(([key, valueObj]) => (
                  <div key={key}>
                    <label htmlFor={key}>{key.replace(/_/g, "").toUpperCase()}</label>
                    <input
                    type="text"
                    name={key}
                    onChange={OnChange}
                    required
                    defaultValue={check ? valueObj : ""}
                    />
                  </div>
            ))
        ) : (Object.entries(data).map(([key, valueObj]) => (
                  <div key={key}>
                    <label htmlFor={key}>{key.replace(/_/g, "").toUpperCase()}</label>
                    <input
                    type="text"
                    name={key}
                    onChange={OnChange}
                    required
                    defaultValue={check ? valueObj : ""}
                    disabled
                    />
                  </div>
            )))}
        </>
    );
}
export default UPF;
