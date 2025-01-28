import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { FaHome, FaTachometerAlt } from "react-icons/fa";
import { useNavigate, Outlet } from "react-router-dom";
import jawan from '../../assets/jaw.jpeg';
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const drawerWidth = 180;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    // Sample Dashboard Data (Can be fetched from API)
    const [dashboardData, setDashboardData] = React.useState({
        totalUsers: 1500,
        totalProducts: 230,
        totalOrders: 1200,
        revenue: "$50,000"
    });

    const pages = [
        { name: "Home", icon: <FaHome />, route: "/home" },
        { name: "Users", icon: <FaUser />, route: "/users" },
        { name: "Products", icon: <FaCartShopping />, route: "/products" },
        { name: "Githubuserfinder", icon: <FaGithub />, route: "/githubuserfinder" },
        // { name: "Contact", icon: <MdContactPage />, route: "/contact" },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div style={{ height: '100px', padding: '5px 20px' }}>
                <img height='100%' width='100%' src={jawan} alt="" />
            </div>
            <Divider />
            <List>
                {pages.map((obj, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(obj.route)}>
                            <ListItemIcon sx={{ minWidth: '35px', fontSize: '20px' }}>{obj.icon}</ListItemIcon>
                            <ListItemText primary={obj.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="menu items"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    // backgroundColor: 'green',
                    // textAlign: 'start',
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                {/* <Toolbar /> */}

                {/* Render nested routes (for dynamic content) */}

                <Outlet />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
