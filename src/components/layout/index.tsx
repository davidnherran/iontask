import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LowPriorityOutlined, ExitToAppOutlined, AssignmentIndOutlined } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import { DrawerHeader, AppBar, Drawer } from "./layout.st";
import { Avatar, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: any) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuList = [{
    name: 'Tareas',
    icon: <LowPriorityOutlined htmlColor="white" />,
    path: '/',
    event: ()=>{navigate('/')},
  },{
    name: 'Usuarios',
    icon: <AssignmentIndOutlined htmlColor="white" />,
    path: '/users',
    event: ()=>{navigate('/users')},
  },{
    name: 'Cerrar sesión',
    icon: <ExitToAppOutlined htmlColor="white" />,
    path: '/',
    event: ()=>{Cookies.remove('accessToken'); navigate('/sign-in')},
  }
]

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Tareas
          </Typography>
          </Box>
          <Box>
          <Tooltip title="tooltip" placement="bottom-start">
          <Avatar sx={{ bgcolor: 'white' }}>👨‍🚀</Avatar>
          </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        style={{ backgroundColor: "#3b3b19" }}
      >
        <DrawerHeader style={{ backgroundColor: "#252e50" }}>
          <span style={{color: 'white', width: '100%', textAlign: 'center', letterSpacing: '3px'}}>IONTASK</span>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon htmlColor="white" />
            ) : (
              <ChevronLeftIcon htmlColor="white" />
            )}
          </IconButton>
        </DrawerHeader>
        <List style={{ backgroundColor: "#252e50", height: "100%" }}>
          {menuList.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={item.event}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: "#ffffff" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
