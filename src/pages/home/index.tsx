import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react"
import Layout from "../../components/layout";
import NewTask from "../../components/forms/newTask";
import ToDo from "../../components/to-do"
import styled from "@emotion/styled";
import Cookies from "js-cookie";
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import AutoModeOutlined from '@mui/icons-material/AutoModeOutlined';
import axios from "axios";

const Home = () => {
  const [taskCreated, setTaskCreated] = useState(false)
  const [userWithTask, setUserWithTask] = useState<UserData | null>(null); 
  type UserId = string;

  const accessToken = Cookies.get("iontask_token");
  const userIdsArray = JSON.parse(sessionStorage.getItem("userIdsArray") || "[]");

  useEffect(()=>{
    userIdsArray.forEach((userId :UserId) => {
      axios
        .get(`https://api.iontask.site/api/v1/users/${userId}`, {
          headers: {
            iontask_token: accessToken,
          },
        })
        .then(response => {
          const user = response.data;
          setUserWithTask(user)
        })
        .catch(error => {
          console.error(`Error al obtener el usuario con ID ${userId}:`, error);
        });
    });
  },[])

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "#f5f7fb",
    margin: "10px 20px",
  }));

  const onTaskCreated = () => {
    setTaskCreated(!taskCreated)
  }

  return (
    <Layout>
      <NewTask onTaskCreated={onTaskCreated} />
      <Grid container sx={{ padding: "20px" }}>
        <ToDo taskCreated={taskCreated} />
        <Grid item xs={4} md={4}>
          <Demo>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="En ejecución" />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              {userWithTask?.projectsIncludes.map((project: ProjectData, index: number) => (
                <ListItem key={index} secondaryAction={<IconButton edge="end" aria-label="delete">
                  <DeleteOutlineOutlined />
                </IconButton>}>
                  <ListItemAvatar>
                    <Avatar><AutoModeOutlined /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={project.project.name}
                    secondary={project.project.description}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={4} md={4}>
          <Demo>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Finalizado" />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
