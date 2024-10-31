import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function ProfilePage({ setProfilePicture }) {

  const user = JSON.parse(localStorage.getItem('user'));
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });
  let { email, password, newPassword } = inputValue;
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  // Function to handle the file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage({
        preview: URL.createObjectURL(file),
        raw: file,
      }); // Display the uploaded image
    }
  };

  // Function to trigger the file input when image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const getImage = () => {
    if (image) {
      return image.preview;
    }
    return "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=";
  }

  useEffect(() => {
    setInputValue({
      email: user.email,
      password: "",
      newPassword: "",
    });
    setImage({
      preview: user.profilePicture,
      raw: "",
    });
  }, [user.email, user.profilePicture]);

  const checkPassword = async () => {
    if (password) {
      try {
        const {data} = await axios.post(
          `http://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000/check-password`,
          { user_id: user._id, password: password },
          {withCredentials: true});
        const {success} = data;
        return success;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordCheck = await checkPassword();
    if (!passwordCheck) {
      setError("Mot de passe incorrect");
      return;
    }

    if (!newPassword) {
      newPassword = password;
    }

    try {
      const {data} = await axios.put(
        `http://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000/user`,
        { user_id: user._id, email: email, password: newPassword, profilePicture: "http://localhost:4000/profilePictures/" + image.raw.name },
        {withCredentials: true}
      );

      if(image.raw){
        const formData = new FormData();
        formData.append("image", image.raw);
        await axios.post(
          `http://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        ).then(res => {
          return res.data;
        });
      }

      const {success, message} = data;
      if (success) {
        handleSuccess(message);
        setProfilePicture("http://localhost:4000/profilePictures/" + image.raw.name);
        setError("");
        localStorage.setItem('user', JSON.stringify({ ...user, email: email, profilePicture: "http://localhost:4000/profilePictures/" + image.raw.name }));
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      password: "",
      newPassword: "",
    });
  };

  return (
    <div className={"w-full flex flex-col items-center"}>
      <div className={"gap-12 border-2 rounded-2xl w-1/2 my-5 items-center flex justify-center py-2 shadow-md"}>
        <div className={"flex flex-col gap-2 items-center w-4/6"}>
          <input type={"file"} onChange={handleFileChange} ref={fileInputRef} className={"hidden"}/>
          <img
            className={"w-52 h-52 rounded-full object-contain border"}
            onClick={handleImageClick}
            src={getImage()} alt=""/>
          <p className={"text-xl"}>{user.username}</p>
          <p className={"text-xl"}>{user.email}</p>
          <p className={"text-xl mb-2"}>Prénom et nom</p>

          {error && <p className={"text-red-500"}>{error}</p>}

          <div className={"flex flex-col gap-2 w-full"}>
            <label>Adresse mail</label>
            <input type="text" name={"email"} value={email} onChange={handleOnChange}
                   placeholder="Modifier votre adresse email" className="p-2 rounded-md border border-gray-300"/>
          </div>
          <div className={"flex flex-col gap-2 w-full"}>
            <label>Mot de passe actuel</label>
            <input type="password" name={"password"} value={password} onChange={handleOnChange}
                   placeholder="Mot de passe actuel" className="p-2 rounded-md border border-gray-300"/>
          </div>
          <div className={"flex flex-col gap-2 w-full"}>
            <label>Nouveau mot de passe</label>
            <input type="password" name={"newPassword"} value={newPassword} onChange={handleOnChange}
                   placeholder="Nouveau mot de passe" className="p-2 rounded-md border border-gray-300"/>
          </div>
          <button onClick={handleSubmit} className={"bg-blue-500 text-white rounded-md px-4 py-2 mt-2"}>Modifier les
            informations
          </button>
        </div>
      </div>
    </div>
  );
}
