import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignContainer, SignImage, SignForm, SignLinks } from "./signup.st";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SendSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      username: email.split("@")[0],
      password,
      role,
    };

    try {
      const response = await axios.post(
        "https://api.iontask.site/api/v1/users/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
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
      <SignForm>
        <h1>¡Registrate en IonTask!</h1>
        <h3>
          Únete a nuestra comunidad y mantén tu vida organizada con IonTask.
        </h3>
        <form onSubmit={onSubmit}>
          <TextField
            id="standard-basic"
            label="Nombre"
            variant="outlined"
            required={true}
            type="text"
            helperText={error.firstName}
            error={error.firstName.length > 0 ? true : false}
            autoComplete="off"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => validateField(e.target.name)}
          />
          <TextField
            id="standard-basic"
            label="Apellidos"
            variant="outlined"
            required={true}
            type="text"
            helperText={error.lastName}
            error={error.lastName.length > 0 ? true : false}
            autoComplete="off"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => validateField(e.target.name)}
          />
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Perfil</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              required={true}
              label="Perfil"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="ADMINISTRATOR">Administrador</MenuItem>
              <MenuItem value="EXECUTANT">Ejecutor</MenuItem>
            </Select>
          </FormControl>
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
            Registrarme
          </Button>
        </form>
        <SignLinks>
          <Link to="/sign-in">¿Ya tienes una cuenta?</Link>
        </SignLinks>
      </SignForm>
      <SignImage />
    </SignContainer>
  );
};

export default SignUp;
