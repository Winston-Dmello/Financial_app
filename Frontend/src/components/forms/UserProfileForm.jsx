import { useUser } from "../contexts/UserContext";  

function UPF({ data, OnChange }) {
    let i = 0;
    const { userId } = useUser();
    console.log(userId);
    return (
        <>
        {Object.entries(data).map(([key, valueObj]) => (
            <>
            <div key={key}>
                <label htmlFor={key}>{key.replace(/_/g, "").toUpperCase()}</label>
                <input
                type="text"
                name={key}
                id={key}
                placeholder={valueObj.value}
                onChange={OnChange}
                required
                />
            </div>
            </>
        ))}
        </>
    );
}
export default UPF;
  