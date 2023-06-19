import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postRegister } from "./api/requests";

const Register = () => {
    const navigation = useNavigate();
    const [movie, setMoive] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [cookie, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, watch, getValues, errors } = useForm();

    const postData = (data) => {
        console.log(data)
        postRegister(data)
        .then(function(response) {
            console.log(response.data)
            alert('登録が完了しました');
            navigation('/');
        })
        .catch(err => {
            console.log(err.response.data);
            setMoive(err.response.data)
        });
    };
    return(
        <div className="top-wrapper">
            <div class="login">
                <h3>Register</h3>
            </div>
            <div class="login-block">
                <form onSubmit={handleSubmit(postData)}>
                    <label for="email">Email：</label>
                    <input className='form-control' {...register('email')} />
                    <label for="password">PassWord：</label>
                    <input className='form-control' type="password" {...register('password', { required: true })} />
                    <label for="password">PassWord（再入力）：</label>
                    <input className='form-control' type="password" {...register('password_confirmation', { 
                        required: "パスワードを再入力してください" ,
                        validate: (value) => {
                            return(
                                value === getValues("password") || "パスワードが一致しません"
                            )
                        }})} />
                    <input className='btn btn-secondary' type="submit" value="登録" />
                </form>
            </div>
        </div>
    );
};

export default Register;