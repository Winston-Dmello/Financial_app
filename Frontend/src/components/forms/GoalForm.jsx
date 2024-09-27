

export default function GoalForm({onSubmit}){

    return(
        <>
            <form onSubmit={onSubmit} id="goalForm">
                <label htmlFor="goalName">Goal Name: </label>
                    <input type="text" id="goalName" name="goalName" required/>
                    <br />
                <label htmlFor="goalAmount">Goal Amount: </label>
                    <input type="number" id="goalAmount" name="goalAmount" required/>
                    <br />
                <label htmlFor="monthsLeft">Months Left: </label>
                    <input type="number" id="monthsLeft" name="monthsLeft" required/>
                    <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}