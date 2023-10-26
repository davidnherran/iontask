import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { FormContainer } from "./newtask.st";
import Cookies from "js-cookie";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 10,
  p: 4,
};

export default function AssignTask() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const requestBody = {
      name: title,
      description: description,
    };
    const accessToken = Cookies.get("accessToken");

    try {
      const response = await axios.post(
        "https://api.iontask.site/api/v1/projects/create",
        requestBody,
        {
          headers: {
            iontask_token: accessToken,
          },
        }
      );

    
      handleClose();
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Asignar tarea
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Completa los campos requeridos y pulsa 'Guardar' para agregar una
            tarea a tu lista de actividades.
          </Typography>
          <FormContainer>
            <TextField
              sx={{marginBottom: '20px'}}
              fullWidth
              required
              id="outlined-required"
              label="Titulo"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{marginBottom: '20px'}}
              fullWidth
              required
              id="outlined-required"
              label="Descripcion"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              sx={{marginBottom: '20px'}}
              type="date"
              fullWidth
              required
              id="outlined-required"
              onChange={(e) => setDate(e.target.value)}
            />
            <Button variant="outlined" onClick={handleSubmit}>
              Asignar
            </Button>
          </FormContainer>
        </Box>
      </Modal>
    </div>
  );
}
