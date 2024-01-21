import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login(props) {
    const { register, handleSubmit } = useForm();
    const newNavigate = useNavigate()
const user={}
    const checkUser = async (inputUser) => {
        let {data} = await axios.get(`http://localhost:3300/sql/login/user/validation`,{headers:{'auth':`${inputUser.username}:${inputUser.password}`}});
        localStorage.setItem('user',`${inputUser.username}`)
        localStorage.setItem('password',`${inputUser.password}`)
        const { id, userExists } = data
        if (userExists===1) {
            props.setUserId(id);
            newNavigate(`/sql/login/home`);
        }
        else {
            alert("you are not register")
            newNavigate('/Login');
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(checkUser)}>
                <label htmlFor="username"></label>
                <input type="text" name="username"{...register('username', { required: true })} />
                <label htmlFor="password"></label>
                <input type="text" name="password"{...register('password', { required: true })} />
                <button>Login</button>
            </form>
        </div>
    )
}