import { useUser } from "../../contexts/UserContext";
import { sendRequest } from "../../utils/Utils";
import GoalForm from "../../forms/GoalForm";

function AddGoal(){
    const {userId} = useUser();
    return(
        <GoalForm onSubmit={(event)=> sendRequest(event, "goalForm", userId, "goal", "POST","Error while creating goal...")}/>
    )
}

function UpdateGoal(){
    const userId = useUser();

}

function DeleteGoal(){
    const userId = useUser();

}


export {AddGoal, UpdateGoal, DeleteGoal};