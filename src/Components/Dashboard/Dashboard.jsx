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
import { FaHome } from "react-icons/fa";
import { useNavigate, Outlet, Link } from "react-router-dom";
import jawan from '../../assets/jawan.png';
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import './Dashboard.css'
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { AuthCredential, getAuth, onAuthStateChanged } from 'firebase/auth';
const drawerWidth = 210;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const currentPath = location.pathname

    const pages = [
        { name: "Home", icon: <FaHome />, route: "/home" },
        { name: "Users", icon: <FaUser />, route: "/users" },
        { name: "Products", icon: <FaCartShopping />, route: "/products" },
        { name: "Githubuserfinder", icon: <FaGithub />, route: "/githubuserfinder" },
        { name: "Contact Us", icon: <MdContactPage />, route: "/contact" },
    ];
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('uid')
        navigate('/login')
    }
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const auth = getAuth();
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Set loading to false once auth state is determined
        });

        return () => unsubscribe();
    }, [auth]);
    const { cart } = useSelector((state) => state.cart)
    console.log(cart);

    const drawer = (
        <div>
            {/* <Toolbar /> */}
            <div className="logo">
                <Link to='/'>
                    <img className="logoImage" height='100%' width='100%' src={jawan} alt="" />
                </Link>
            </div>
            <Divider />
            <List sx={{ padding: '5px' }}>
                {pages.map((obj, index) => (
                    <ListItem sx={{ background: obj.route === currentPath ? "#e8eefe" : '', borderRadius: '5px' }} key={index} disablePadding>
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
                    backgroundColor: '#567ad3',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        ExploreEase
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', height: '32px', my: 'auto', mx: '15px' }} />
                        <Box>
                            <Badge badgeContent={cart.length} color="primary">
                                <IconButton onClick={() => navigate('/cart')}>
                                    <ShoppingCartIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Badge>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', height: '32px', my: 'auto', mx: '15px' }} />
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                {!loading && (
                                    <Box display="flex" alignItems="center" gap={1} onClick={handleOpenUserMenu} sx={{ cursor: 'pointer' }}>
                                        <Avatar
                                            alt={user ? user.displayName : "Guest"}
                                            src={user?.photoURL || "https://randomuser.me/api/portraits/men/1.jpg"}
                                        />
                                        <Box>
                                            <Typography color="" fontWeight={600} fontSize="14px">
                                                {user ? user.displayName : "Guest"}
                                            </Typography>
                                            <Box display="flex" alignItems="center">
                                                <Typography color="" fontSize="12px">
                                                    {user ? "Admin" : "Guest"}
                                                </Typography>
                                                <ArrowDropDownIcon fontSize="small" />
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Tooltip>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                                    Profile
                                </MenuItem> */}
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/'); }}>
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/cart'); }}>
                                    Cart
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                    p: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >


                {document.location.pathname === '/' && <Box sx={{ pt: 9 }}>
                    <h3> Welcome to the ExploreEase :</h3>
                    <p>
                        This is the central hub where you can access
                        and manage all key aspects of your application.
                        Navigate through different sections such as Users, Products, Profile, and Contact using the sidebar menu. The dashboard provides a user-friendly interface for quick access to essential data, analytics, and management tools. Get real-time insights and efficiently handle tasks with just a few clicks.
                    </p>
                    <h3>Purpose of This Website :</h3>
                    <p>
                        The primary purpose of this website is to enhance my skills in React Nested Routing while utilizing Material-UI (MUI) for UI components.
                        This project serves as a hands-on practice to efficiently structure a dashboard with multiple pages, implementing a responsive sidebar navigation and seamless transitions between different sections. Through this, I am improving my understanding of React Router, component-based development, and UI/UX design with MUI.
                    </p>
                    <h3>Website Description: Explore, Manage, and Connect</h3>

                    <p> Welcome to YourHub, a dynamic web platform designed to streamline user management, product discovery, and seamless integration with GitHub. Our three core pages—Users, Products, and GitHub User Finder—empower you to organize data, explore resources, and connect with developers effortlessly.
                    </p>
                    <h4> Users Page</h4>
                    <p>            Manage and interact with user profiles in a clean, intuitive interface. View detailed user information, track activity, and customize access levels. Perfect for teams or communities looking to maintain organized user directories with search, filtering, and sorting capabilities.
                    </p>
                    <h4>  Products Page</h4>
                    <p>            Browse a curated catalog of products with rich descriptions, pricing, and availability. Whether you're showcasing software tools, physical goods, or digital services, this page offers a visually engaging experience. Users can filter by category, price, or popularity, making it easy to find exactly what they need.
                    </p>
                    <h3>  GitHub User Finder</h3>
                    <p>            Integrate with GitHub’s API to search for developers in real time. Enter a username to instantly fetch profiles, repositories, activity stats, and social links. Ideal for recruiters, collaborators, or open-source enthusiasts looking to connect with talented developers.
                    </p>
                </Box>}

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
