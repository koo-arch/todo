import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./api/requests";


const RedirectToTop = (cookie) => {

    const navigation = useNavigate();

    getUserInfo(cookie)
        .then(function (response) {
            console.log(response);
        })
        .catch(e => {
            console.log(e)
            navigation('/')
        })
}

export default RedirectToTop;