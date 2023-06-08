import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./api/requests";


const RedirectToTodo = (cookie) => {

    const navigation = useNavigate();

    getUserInfo(cookie)
        .then(function(response){
            console.log(response);
            navigation('/todo');
        })
        .catch(e =>{
            console.log(e)
        })
}

export default RedirectToTodo;