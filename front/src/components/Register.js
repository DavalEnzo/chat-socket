import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const {email, password, username} = inputValue;
  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        `https://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000/signup`,
        {
          ...inputValue,
        },
        {withCredentials: true}
      );
      const {success, message} = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className={'flex justify-center items-center h-full'}>
      <div
        className={"flex flex-col h-3/5 gap-9 bg-slate-400 p-5 rounded-2xl w-4/12 items-center"}>
        <h1 className={"text-7xl mb-7"}>Inscription</h1>
        <input type="email" name={"email"} value={email} onChange={handleOnChange} placeholder="Entrez votre email" className={"p-2 rounded-md border border-gray-300 w-4/5"} />
        <input type="text" value={username} name="username"
               onChange={handleOnChange} placeholder="Entrez votre pseudo"
               className="p-2 rounded-md border border-gray-300 w-4/5"/>
        <input type="password" name={"password"} value={password} onChange={handleOnChange} placeholder="Entrez votre mot de passe"
               className="p-2 rounded-md border border-gray-300 w-4/5"/>
        <button onClick={handleSubmit} className={"bg-blue-500 text-white p-3 py-2 w-48 rounded-2xl"}>S'inscrire</button>
        <Link to={'/'} className={"text-2xl"}>Déjà inscrit ? <b
          className={"text-blue-500 underline"}>Connectez-vous</b></Link>
      </div>
    </div>
  )

}

export default Register;