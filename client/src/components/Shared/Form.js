import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { uninterceptedApiInstance } from "../../api/axiosInstance";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { useDispatch } from "react-redux";
import { setAuth } from "../../app/features/Auth/authSlice";
import LockResetIcon from "@mui/icons-material/LockReset";
import GoogleIcon from "@mui/icons-material/Google";
import Tooltip from "@mui/material/Tooltip";

function Form({ formType }) {
    const [isUser, setIsUser] = useState(true);

    const data =
        formType === "signup"
        ? {
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
            confirmPassword: "",
            }
        : {
            email: "",
            password: "",
            };

    const [formData, setFormData] = useState(data);

    const [formErrors, setFormErrors] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    let errorData = {
        email: "",
        password: "",
        name: "",
        mobileNumber: "",
        confirmPassword: "",
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const status = searchParams.get("authentication");
        if (status === "failed") {
        setError("Google authentication failed");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoogleAuth = async () => {
        try {
        // eslint-disable-next-line no-unused-vars
        const test = window.open(
            "https://studio.time-shift.shop/user/auth/google",
            "_self"
        );
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));

        setFormErrors((prev) => ({
        ...prev,
        [name]: "",
        }));
    };

    const validateEmail = (email) => {
        const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(email);
    };

    const validateMobile = (mobileNumber) => {
        const re = /^[0-9]{10}$/;
        return re.test(mobileNumber);
    };

    const validatePassword = (password) => {
        const re =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (formType === "signup") {
        // if(formData.name.length < 5) {
        //     errorData.name  = "Name must be at least 5 characters";
        //     isValid = false;
        // }

        if (/\d/.test(formData.name)) {
            errorData.name = "Name must not include digits";
            isValid = false;
        }

        if (!validateMobile(formData.mobileNumber)) {
            errorData.mobileNumber = "Invalid mobile number";
            isValid = false;
        }
        if (!validatePassword(formData.password)) {
            errorData.password =
            "Password must include least one uppercase letter, lowercase letter, number and special character";
            isValid = false;
        }

        if (!passwordsMatch) {
            errorData.confirmPassword = `Password doesn't match`;
            isValid = false;
        }
        }

        if (!validateEmail(formData.email)) {
        errorData.email = "Invalid email format";
        isValid = false;
        }

        setFormErrors(errorData);

        if (isValid) {
        const role = isUser ? "user" : "trainer";

        if (formType === "signup") {
            try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await uninterceptedApiInstance.post(
                API_ENDPOINTS.SIGNUP(role),
                formData
            );
            navigate("/login");
            } catch (error) {
            const { response } = error;
            setError(response?.data?.message);

            toast.error(response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            }
        } else {
            try {
            const { data } = await uninterceptedApiInstance.post(
                API_ENDPOINTS.LOGIN(role),
                formData
            );

            localStorage.setItem("user", JSON.stringify(data?.user));
            dispatch(setAuth());
            navigate(`/${role}/dashboard`);
            } catch (error) {
            const { response } = error;
            setError(response?.data?.message);

            toast.error(response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            }
        }
        }
    };

    return (
        <Grid
        container
        sx={{
            height: "78vh",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "1rem",
            marginLeft: "-50px",
        }}
        spacing={1}>
        <Grid
            item
            sx={{
            display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: { lg: "30rem", md: "50%" },
            }}>
            <Box
            sx={{
                textAlign: "center",
                marginLeft: "-10rem",
            }}>
            <img
                src="https://res.cloudinary.com/djd2rpgil/image/upload/v1699891406/theme/o7h0yeecny118945ytmx.png"
                style={{ width: "25rem", height: "25rem" }}
                alt=""
            />
            </Box>
        </Grid>
        <Grid
            item
            sx={{
            width: { lg: "30rem", md: "50%" },
            }}>
            <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => {
                handleSubmit(e);
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "75px",
                borderRadius: "5px",
                padding: "1.5rem",
                width: { lg: "100%", md: "100%", sm: "20rem" },
                marginLeft: "2.5rem",
            }}>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "-3rem",
                }}>
                <Typography
                sx={{
                    color: "#000",
                    fontSize: { lg: "1.6rem", md: "1rem", sm: ".9rem" },
                }}>
                {isUser
                    ? `User ${formType.charAt(0).toUpperCase() + formType.slice(1)}`
                    : `Trainer ${
                        formType.charAt(0).toUpperCase() + formType.slice(1)
                    }`}
                </Typography>
                <Typography
                sx={{
                    fontSize: { lg: "1rem", md: "1rem", sm: ".7rem" },
                    color: "#6EC72D",
                    paddingTop: { lg: ".6rem", md: ".5rem", sm: ".2rem" },
                    cursor: "pointer",
                    "&:hover": {
                    color: "#848b94",
                    },
                    textDecoration: "none",
                }}
                onClick={() => setIsUser(!isUser)}>
                {isUser ? "Are you a trainer ?" : "Are you a user ?"}
                </Typography>
            </Box>
            {formType === "signup" && (
                <>
                <TextField
                    label="Full Name"
                    variant="outlined"
                    sx={{
                    width: "100%",
                    height: ".1rem",
                    }}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.fullName)}
                    helperText={formErrors.fullName}></TextField>
                </>
            )}
            <TextField
                label="Email"
                variant="outlined"
                sx={{
                width: "100%",
                height: ".1rem",
                }}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}></TextField>
            {formType === "signup" && (
                <TextField
                label="Mobile"
                variant="outlined"
                sx={{
                    width: "100%",
                    height: ".1rem",
                }}
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                error={Boolean(formErrors.mobileNumber)}
                helperText={formErrors.mobileNumber}></TextField>
            )}
            <TextField
                label="Password"
                variant="outlined"
                sx={{
                width: "100%",
                height: ".1rem",
                }}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}></TextField>
            {formType === "signup" && (
                <TextField
                label="Confirm Password"
                variant="outlined"
                sx={{
                    width: "100%",
                    height: ".1rem",
                }}
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={Boolean(formErrors.confirmPassword)}
                helperText={formErrors.confirmPassword}></TextField>
            )}
            {formType === "login" && (
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineStart: "0px",
                }}>
                <LockResetIcon />
                <Typography
                    sx={{
                    fontSize: { lg: "1rem", md: ".8rem", sm: ".8rem" },
                    color: "#6EC72D",
                    cursor: "pointer",
                    "&:hover": {
                        color: "#848b94",
                    },
                    textDecoration: "none",
                    marginLeft: "5px",
                    }}
                    component={Link}
                    to={"/forgot-password"}>
                    Forgot password ?
                </Typography>
                </div>
            )}
            <Box
                sx={{
                display: "flex",
                flexDirection: {
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                },
                alignItems: "center",
                justifyContent: "space-between",
                }}>
                <Button
                variant="contained"
                type="submit"
                sx={{
                    width: {
                    xl: "35%",
                    lg: "35%",
                    md: "35%",
                    sm: "100%",
                    xs: "100%",
                    },
                    marginBottom: {
                    xl: "0",
                    lg: "0",
                    md: "0",
                    sm: "1rem",
                    xs: "1rem",
                    },
                    backgroundColor: "#6EC72D",
                    color: "#161616",
                    borderRadius: "5px",
                    "&:hover": { backgroundColor: "#6EC72D", color: "#fff" },
                }}>
                {formType.toUpperCase()}
                </Button>
                <Typography
                sx={{
                    fontSize: { lg: "1rem", md: ".8rem", sm: ".8rem" },
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#6EC72D",
                    "&:hover": {
                    color: "#848b94",
                    },
                }}
                component={Link}
                to={`/${formType === "signup" ? "login" : "signup"}`}>
                {formType === "signup"
                    ? "Already have account ?"
                    : `Don't have an account ?`}
                </Typography>
            </Box>
            <Tooltip title="Signup with Google">
                <Button
                type="button"
                variant="outlined"
                sx={{
                    width: "100%",
                    height: 55,
                    color: "black",
                    borderRadius: 20,
                    borderColor: "#88C13E",
                    marginTop: "-2rem",
                    "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                    },
                }}
                size="small"
                onClick={handleGoogleAuth}>
                {<GoogleIcon />}
                </Button>
            </Tooltip>
            </Box>
        </Grid>
        </Grid>
    );
}

export default Form;
