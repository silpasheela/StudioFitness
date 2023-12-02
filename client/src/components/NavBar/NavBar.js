import React, { useState } from "react";
import "./NavBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { removeAuth } from "../../app/features/Auth/authSlice";

const pages = ["Home", "Services", "Trainers", "Contact"];
const settings = ["Dashboard", "Logout"];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate();

    const authState = useSelector((state) => {
        return state.auth.authState;
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        switch (page) {
        case "Home":
            navigate("/");
            break;

        case "Services":
            if (authState?.role === "user") {
            if (authState?.subscriptionDetails?.status === "active") {
                navigate("/user/subscription-details");
            } else if (
                authState?.subscriptionDetails?.status === "canceled" ||
                !authState?.subscriptionDetails?.status
            ) {
                navigate("/viewplandetails");
            }
            } else if (authState?.role === "trainer") {
            navigate("/");
            } else {
            navigate("/login");
            }
            break;

        case "Trainers":
            if (authState?.role === "user") {
            navigate("/user/viewtrainers");
            } else {
            navigate("/");
            }
            break;
        // Add more cases as needed
        default:
            break;
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleDashboard = () => {
        console.log("hyyyyyyy", authState);
        navigate(`/${authState.role}/dashboard`);
    };

    const dispatch = useDispatch();

    const handleLogout = () => {
        // dispatch(adminLogout());

        localStorage.removeItem("user");
        dispatch(removeAuth());
        navigate("/login");
        // console.log("im from logout",JSON.stringify(authState))
        // console.log(authState.role)
    };

    return (
        <AppBar sx={{ backgroundColor: "#000" }}>
        <Container>
            <Toolbar disableGutters>
            <div>
                <img
                className="logo"
                alt="logo"
                src="https://res.cloudinary.com/djd2rpgil/image/upload/f_auto,q_auto/ynhwgl1co8ww4vnlvitn"
                />
            </div>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#6B6B6B",
                textDecoration: "none",
                }}></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: "block", md: "none" },
                }}>
                {/* {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))} */}

                {pages.map((page) => (
                    <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                }}></Typography>
            <Box
                sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                marginRight: "150px",
                }}>
                {pages.map((page) => (
                <Button
                    key={page}
                    // onClick={handleCloseNavMenu}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{
                    my: 2,
                    color: "#6B6B6B",
                    display: "block",
                    "&:hover": {
                        color: "#88C13E", // Change text color to #88C13E on hover
                    },
                    }}>
                    {page}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                {authState ? (
                <>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={authState?.profilePicture} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {settings.map((setting) => (
                        <MenuItem
                        key={setting}
                        onClick={
                            setting === "Logout" ? handleLogout : handleDashboard
                        }>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </>
                ) : (
                <Button
                    className="login-button-nav"
                    endIcon={<LockIcon />}
                    onClick={handleLoginClick}
                    sx={{
                    padding: "10px 20px",
                    margin: "10px",
                    borderRadius: "5px",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s",
                    backgroundColor: "#88C13E",
                    color: "#000",
                    "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "#72ad23",
                        color: "#fff",
                    },
                    }}>
                    Login
                </Button>
                )}
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}

export default NavBar;
