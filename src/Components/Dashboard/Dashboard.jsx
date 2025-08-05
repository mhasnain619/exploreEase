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
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import jawan from '../../assets/new.png';
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";
import './Dashboard.css';
import { Avatar, Menu, MenuItem, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const drawerWidth = 210;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const currentPath = location.pathname;
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // ≥1024px
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm')); // <600px

    const pages = [
        { name: "Home", icon: <FaHome />, route: "/calculators" },
        { name: "Calculators", icon: <FaCalculator />, route: "/about" },
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
        localStorage.removeItem('uid');
        navigate('/login');
    };

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const auth = getAuth();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const { cart } = useSelector((state) => state.cart);

    const drawer = (
        <div>
            <div className="logo">
                <Link to='/'>
                    {/* <img className="logoImage" height='100%' width='100%' src={jawan} alt="" /> */}
                    <Typography>Calculator</Typography>
                </Link>
            </div>
            <Divider />
            <List sx={{ padding: '5px' }}>
                {pages.map((obj, index) => (
                    <ListItem
                        sx={{
                            background: obj.route === currentPath ? "#e8eefe" : '',
                            borderRadius: '5px',
                            transition: 'background 0.3s ease, color 0.6s ease',
                        }}
                        key={index}
                        disablePadding
                    >
                        <ListItemButton
                            onClick={() => {
                                navigate(obj.route);
                                if (isMobileScreen) {
                                    handleDrawerToggle();
                                }
                            }}
                        >
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
                    width: { sm: isLargeScreen ? '100%' : `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: isLargeScreen ? 0 : `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography>
                           Calculator
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: isLargeScreen ? 'none' : 'block' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {isLargeScreen && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {pages.map((obj, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            px: 2,
                                            py: 1,
                                            background: obj.route === currentPath ? '#e8eefe' : 'transparent',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            color: obj.route === currentPath ? '#567ad3' : 'white',
                                            '&:hover': { background: '#e8eefe', color: '#567ad3' },
                                            transition: 'background 0.3s ease, color 0.6s ease',
                                        }}
                                        onClick={() => navigate(obj.route)}
                                    >
                                        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{obj.icon}</Box>
                                        <Typography variant="body1">{obj.name}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
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
                                            <Typography color="white" fontWeight={600} fontSize="14px">
                                                {user ? user.displayName : "Guest"}
                                            </Typography>
                                            <Box display="flex" alignItems="center">
                                                <Typography color="white" fontSize="12px">
                                                    {user ? "Admin" : "Guest"}
                                                </Typography>
                                                <ArrowDropDownIcon fontSize="small" sx={{ color: 'white' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
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
            {!isLargeScreen && (
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
                            display: { xs: "none", sm: "block", lg: "none" },
                            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
            )}
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                    p: 1,
                    width: { sm: isLargeScreen ? '100%' : `calc(100% - ${drawerWidth}px)` },
                }}
            >
                {document.location.pathname === '/' && (
                    <Box sx={{ pt: 9 }}>
                        <h3>Welcome to the ExploreEase :</h3>
                        <p>
                            This is the central hub where you can access
                            and manage all key aspects of your application.
                            Navigate through different sections such as Users, Products, Profile, and Contact using the sidebar menu. The dashboard provides a user-friendly interface for quick access to essential data, analytics, and management tools. Get real-time insights and efficiently handle tasks with just a few clicks.
                        </p>
                        <h3>Purpose of This Website :</h3>
                        <span>
                            <p>The primary purpose of this website is to enhance my skills in React Nested Routing while utilizing Material-UI (MUI) for building modern and responsive UI components. This project serves as a hands-on practice to efficiently structure a dashboard with multiple pages, implement a responsive sidebar navigation, and ensure smooth transitions between different sections.</p>
                            <p>In addition, this project focuses on implementing Protected Routes and Auth Routes to manage user access based on authentication status. By integrating authentication functionality, I am learning how to restrict access to specific pages, handle user login/logout processes, and protect sensitive routes in the application.</p>
                            <p>Furthermore, I have used Redux Toolkit for efficient state management — specifically for handling the product cart functionality. This allowed me to manage cart items globally, perform CRUD operations on the cart, and provide a better user experience.</p>
                            <h3>Key Learning Areas :</h3>
                            <ul style={{ marginLeft: '20px' }}>
                                <li>React Router (Nested Routing & Route Guarding)</li>
                                <li>Authentication & Authorization in React</li>
                                <li>Redux Toolkit for State Management (Product Cart)</li>
                                <li>Component-based development</li>
                                <li>UI/UX design using Material-UI (MUI)</li>
                                <li>Responsive Layout & Sidebar Navigation</li>
                                <li>State management for user sessions</li>
                                <li>Real-world Project Structure & Best Practices</li>
                            </ul>
                            Overall, this project is a complete learning experience to build scalable, secure, and user-friendly dashboard applications in React.
                        </span>
                        <h3>Website Description: Explore, Manage, and Connect</h3>
                        <p>Welcome to ExploreEase, a dynamic web platform designed to streamline user management, product discovery, and seamless integration with GitHub. Our three core pages—Users, Products, and GitHub User Finder—empower you to organize data, explore resources, and connect with developers effortlessly.</p>
                        <h4>Users Page</h4>
                        <p>Manage and interact with user profiles in a clean, intuitive interface. View detailed user information, track activity, and customize access levels. Perfect for teams or communities looking to maintain organized user directories with search, filtering, and sorting capabilities.</p>
                        <h4>Products Page</h4>
                        <p>Browse a curated catalog of products with rich descriptions, pricing, and availability. Whether you're showcasing software tools, physical goods, or digital services, this page offers a visually engaging experience. Users can filter by category, price, or popularity, making it easy to find exactly what they need.</p>
                        <h3>GitHub User Finder</h3>
                        <p>Integrate with GitHub’s API to search for developers in real time. Enter a username to instantly fetch profiles, repositories, activity stats, and social links. Ideal for recruiters, collaborators, or open-source enthusiasts looking to connect with talented developers.</p>
                    </Box>
                )}
                <Outlet />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;