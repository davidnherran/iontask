import styled from "@emotion/styled";
import { AirlineStopsOutlined, DataUsageOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FormContainer } from "../../components/forms/newtask.st";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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

const ToDo = ({ taskCreated }: ToDoProps) => {
  const [task, setTask] = useState<Task[]>([]);
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("")
  const [assignNewTask, setAssignNewTask] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const accessToken = Cookies.get("accessToken");
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "#f5f7fb",
    margin: "10px 20px",
  }));

  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://api.iontask.site/api/v1/projects/all", {
          headers: {
            iontask_token: accessToken,
          },
        })
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de usuarios", error);
        });
    }
  }, [taskCreated]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://api.iontask.site/api/v1/users/all", {
          headers: {
            iontask_token: accessToken,
          },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de usuarios", error);
        });
    }
  }, []);

  const submitAssignTask = () => {
    handleOpen();
  
    if (accessToken) {
      const selectedUserId = userId;

      const userIdsArray = JSON.parse(sessionStorage.getItem("userIdsArray") || "[]");
  
      const uniqueUserIds = new Set(userIdsArray);

      if (!uniqueUserIds.has(selectedUserId)) {
        uniqueUserIds.add(selectedUserId);
        const updatedUserIdsArray = [...uniqueUserIds];
  
        sessionStorage.setItem("userIdsArray", JSON.stringify(updatedUserIdsArray))
  
        axios
          .post(
            "https://api.iontask.site/api/v1/users/add-to-project",
            {
              user: selectedUserId,
              project: assignNewTask,
              accessLevel: 50
            },
            {
              headers: {
                iontask_token: accessToken,
              },
            }
          )
          .then((response) => {
            handleClose();
            console.log(response);
          })
          .catch((error) => {
            console.error("Error en la solicitud", error);
          });
      } else {
        console.log("El userId ya existe en la sesion.");
      }
    }
  };
  

  return (
    <>
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Perfil</InputLabel>
              <Select
                sx={{ marginBottom: "20px" }} 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                required={true}
                label="Perfil"
                onChange={(e) => setUserId(e.target.value)}
              >
                {users.filter((user: User)=> user.role === "EXECUTANT").map((user: User)=> (
                  <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={submitAssignTask}>Asignar</Button>
          </FormContainer>
        </Box>
      </Modal>

      <Grid item xs={4} md={4}>
        <Demo>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Por asignar" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            {task.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="Asignar"
                    onClick={()=> {setAssignNewTask(item.id); handleOpen()}}
                    sx={{
                      backgroundColor: "#252e50",
                      color: "white",
                      marginRight: "4px",
                    }}
                  >
                    <AirlineStopsOutlined />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <DataUsageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </>
  );
};

export default ToDo;
