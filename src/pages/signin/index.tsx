import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignContainer, SignImage, SignForm, SignLinks } from "./signin.st";
import { Button, TextField } from "@mui/material";
import { SendSharp } from "@mui/icons-material";
import axios from "axios";
import Cookies from 'js-cookie';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userData = {
        username: email,
        password,
      };
      const response = await axios.post(
        "https://api.iontask.site/api/v1/auth/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        Cookies.set('accessToken', response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        password: "Usuario y/o contraseña inválidos",
      }));
    }
  };

  const validateField = (e: string) => {
    if (e === "email") {
      if (!regexEmail.test(email)) {
        setError((prevError) => ({
          ...prevError,
          email: "Correo electrónico inválido",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          email: "",
        }));
      }
    } else if (e === "password") {
      if (password.length <= 5) {
        setError((prevError) => ({
          ...prevError,
          password: "La contraseña debe contener minimo 6 catacteres",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          password: "",
        }));
      }
    }
  };

  return (
    <SignContainer>
      <SignImage />
      <SignForm>
        <h1>¡Hola de nuevo! 👋</h1>
        <h3>
          ¡Ingresa con tu correo electrónico y contraseña, para iniciar sesión
          en tu cuenta!
        </h3>
        <form onSubmit={onSubmit}>
          <TextField
            id="standard-basic"
            label="Correo electrónico"
            variant="outlined"
            required={true}
            type="text"
            helperText={error.email}
            error={error.email.length > 0 ? true : false}
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateField(e.target.name)}
          />
          <TextField
            id="standard-basic"
            label="Contraseña"
            variant="outlined"
            required={true}
            type="password"
            helperText={error.password}
            error={error.password.length > 0 ? true : false}
            autoComplete="off"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => validateField(e.target.name)}
          />
          <Button
            style={{ marginBottom: "18px" }}
            variant="outlined"
            type="submit"
            endIcon={<SendSharp />}
          >
            Iniciar sesi&oacute;n
          </Button>
        </form>
        <SignLinks>
          <Link to="/sign-up">No tengo una cuenta</Link>
        </SignLinks>
      </SignForm>
    </SignContainer>
  );
};

export default SignIn;
