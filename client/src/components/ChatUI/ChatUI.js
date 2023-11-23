/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import io from "socket.io-client";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { instance } from "./../../api/axiosInstance";

function ChatUI({ role }) {
    const searchUrl = role === "trainer" ? `/chat/getusers` : `/chat/gettrainers`;
    const createChatUrl =
        role === "trainer" ? `/chat/trainer/create` : `/chat/user/create`;
    const senderRole = role === "trainer" ? "Trainer" : "User";

    const [socket, setSocket] = useState(null);
    const selectedChatComparer = useRef(null);

    const theme = createTheme(); // Create an empty theme object
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const authState = useSelector((state) => {
        return state.auth?.authState;
    });

    useEffect(() => {
        const socket = io("http://localhost:4000/");
        setSocket(socket);

        // Cleanup on component unmount
        return () => {
        socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
        // Event listeners for socket events
        socket.on("connect", () => {
            // Send the user ID to the server for setup
            socket.emit("setup", authState._id);
        });

        socket.on("disconnect", () => {
            // console.log("Disconnected from server");
        });
        }
    }, [socket]);

    const [myConversation, setmyConversation] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [showAlert, setShowAlert] = useState(false);

    // fetches the available chats

    const fetchConversations = async () => {
        try {
        const { data } = await instance.get("/chat/mychat");
        setmyConversation(data);
        } catch (err) {
        console.log(err);
        }
    };
    useEffect(() => {
        fetchConversations();
    }, []);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    // searching the users
    const fetchUsers = async () => {
        try {
        const { data } = await instance.get(`${searchUrl}?search=${searchValue}`);
        role === "trainer"
            ? setMyAppointments(data?.myUsers)
            : setMyAppointments(data?.myTrainers);
        setSearchValue("");
        } catch (err) {
        console.log(err);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchValue.trim() === "") {
        setShowAlert(true);
        } else {
        fetchUsers();
        }
    };

    // creating a chat
    const createChat = async (id) => {
        const { data } = await instance.post(`${createChatUrl}/${id}`);
        setmyConversation((prev) => {
        return [...prev, data];
        });
        setMyAppointments([]);
        setSearchValue("");
    };

    // fetching messages
    const [conversationId, setConversationId] = useState("");
    const [messages, setMessages] = useState([]);

    const fetchMessages = async (conversationId) => {
        try {
        const { data } = await instance.get(`/message/${conversationId}`);
        setMessages(data);
        socket.emit("join chat", conversationId);
        } catch (err) {
        console.log(err);
        }
    };
    useEffect(() => {
        if (conversationId) {
        fetchMessages(conversationId);
        selectedChatComparer.current = conversationId;
        }
    }, [conversationId]);

    // sending meassages

    const [message, setMessage] = useState("");

    const handleMessageSent = async (e) => {
        e.preventDefault();
        const messageDetails = {
        content: message,
        role: `${senderRole}`,
        };
        if (conversationId && message) {
        setMessage("");
        const { data } = await instance.post(
            `/message/${conversationId}`,
            messageDetails
        );
        // console.log(data);
        socket.emit("new message", data);
        setMessages((prev) => {
            if (prev) {
            return [...prev, data];
            } else {
            return [data];
            }
        });
        }
    };

    useEffect(() => {
        if (socket) {
        const messageReceivedHandler = (newMessage) => {
            if (
            !selectedChatComparer.current ||
            selectedChatComparer.current !== newMessage?.conversation._id
            ) {
            // console.log(newMessage);
            } else {
            setMessages((prev) => {
                return [...prev, newMessage];
            });
            }
        };

        socket.on("message recieved", messageReceivedHandler);

        // Clean up the event listener
        return () => {
            socket.off("message recieved", messageReceivedHandler);
        };
        }
    }, [socket]);

    return (
        <Stack
        direction={isSmallScreen ? "column" : "row"}
        sx={{
            marginTop: "5rem",
            padding: "0 4rem",
            // marginLeft: { lg: "-25rem", md: "-25rem", sm: "-7rem", xs: "1rem" },
        }}>
        {/* Conversation list */}
        <Stack
            direction="column"
            sx={{
            width: { lg: "28%", md: "100%", sm: "95%", xs: "95%" },
            border: "1px #496b78 solid",
            padding: "1rem",
            marginRight: "2rem",
            height: "30rem",
            borderRadius: ".4rem",
            marginBottom: "1rem",
            }}>
            <Box
            sx={{
                marginBottom: "1rem",
            }}>
            <TextField
                size="small"
                placeholder="Search user and send messages"
                sx={{
                width: "100%",
                border: "1px dotted rgba(14,14,14,0.3)",
                borderRadius: ".3rem",
                }}
                value={searchValue}
                onChange={handleSearchChange}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <SearchIcon
                        sx={{ cursor: "pointer" }}
                        onClick={handleSearch}
                    />
                    </InputAdornment>
                ),
                }}
            />
            </Box>
            {myConversation.map((conversation) => {
            const { participants } = conversation;
            return (
                <Stack
                key={conversation._id}
                sx={{
                    paddingLeft: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px gray dotted",
                    padding: ".2rem .4rem",
                    borderRadius: ".3rem",
                    marginBottom: ".5rem",
                    backgroundColor:
                    conversationId === conversation._id ? "#a1f59d" : "",
                }}
                onClick={() => {
                    setConversationId(conversation._id);
                }}>
                <img
                    src={
                    role === "trainer"
                        ? participants[0]?.user?.profilePicture
                        : participants[0]?.trainer?.profilePicture
                    }
                    alt="pro"
                    style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    objectFit: "cover",
                    marginRight: ".5rem",
                    borderRadius: ".2rem",
                    }}
                />
                <Box>
                    <Typography
                    sx={{
                        fontSize: "1rem",
                        color:
                        conversationId === conversation._id
                            ? "#162415"
                            : "#496b78",
                    }}>
                    {role === "trainer"
                        ? participants[0]?.user?.fullName
                        : participants[0]?.trainer?.fullName}
                    </Typography>
                    <Typography
                    sx={{
                        fontSize: ".7rem",
                        color:
                        conversationId === conversation._id
                            ? "#162415"
                            : "#496b78",
                    }}>
                    {role === "trainer"
                        ? participants[0]?.user?.email
                        : participants[0]?.trainer?.email}
                    </Typography>
                </Box>
                </Stack>
            );
            })}
            {myAppointments.length > 0 && (
            <Typography sx={{ color: "lightblue" }}>
                {role === "user" ? `Trainer List` : `User List`}
            </Typography>
            )}
            {myAppointments.map((appointment) => {
            return (
                <Stack
                key={appointment._id}
                sx={{
                    paddingLeft: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px gray dotted",
                    padding: ".2rem .4rem",
                    borderRadius: ".3rem",
                    marginBottom: ".5rem",
                }}
                onClick={() => {
                    role === "trainer"
                    ? createChat(appointment?.userId)
                    : createChat(appointment?.trainerId);
                }}>
                <img
                    src={
                    role === "trainer"
                        ? appointment?.user?.profilePicture
                        : appointment?.trainer?.profilePicture
                    }
                    alt="pro"
                    style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    objectFit: "cover",
                    marginRight: ".5rem",
                    borderRadius: ".2rem",
                    }}
                />
                <Box>
                    <Typography
                    sx={{
                        fontSize: "1rem",
                        color: "#496b78",
                    }}>
                    {role === "trainer"
                        ? appointment.user?.fullName
                        : appointment.trainer?.fullName}
                    </Typography>
                    <Typography
                    sx={{
                        fontSize: ".7rem",
                        color: "#496b78",
                    }}>
                    {role === "trainer"
                        ? appointment.user?.email
                        : appointment.trainer?.email}
                    </Typography>
                </Box>
                </Stack>
            );
            })}
        </Stack>

        {/* Sending messages  */}
        <Box
            sx={{
            width: { lg: "62%", md: "98%", sm: "95%", xs: "95%" },
            height: "32rem",
            border: "1px #496b78 dotted",
            borderRadius: ".2rem",
            padding: "1rem",
            boxSizing: "border-box",
            }}>

            


            <Box>
            <Stack
                sx={{
                height: "24rem",
                overflow: "auto",
                borderRadius: ".2rem",
                "&::-webkit-scrollbar": {
                    width: "0.5rem", // Width of the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1", // Background color of the track
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#888", // Color of the thumb
                    borderRadius: "0.25rem", // Border radius of the thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555", // Color of the thumb on hover
                },
                }}>
                {messages.length > 0 &&
                messages.map((message) => {
                    const isSender = authState._id === message.sender?._id;
                    return (
                    <Chip
                        key={message?._id}
                        label={message?.content}
                        sx={{
                        maxWidth: "fit-content",
                        marginBottom: "1rem",
                        marginRight: "1rem",
                        marginLeft: isSender ? "auto" : "0",
                        backgroundColor:'#98fa50'
                        }}
                    />
                    );
                })}
            </Stack>

            <Stack
                direction="row"
                sx={{
                marginTop: "1rem",
                width: "100%",
                }}
                position="relative"
                component="form"
                onSubmit={handleMessageSent}>
                {conversationId && (
                <textarea
                    style={{
                    width: "100%",
                    padding: "0.5rem",
                    paddingRight: "2.5rem",
                    outline: "none",
                    resize: "none",
                    border: ".5px #496b78 solid",
                    borderRadius: ".3rem",
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        // e.preventDefault();
                        handleMessageSent(e);
                    }
                    }}></textarea>
                )}
                <Button
                type="submit"
                style={{
                    position: "absolute",
                    top: "52%",
                    right: "0.2rem",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                }}>
                {message && <SendIcon sx={{ color: "#8fe876" }} />}
                </Button>
            </Stack>
            </Box>
        </Box>
        </Stack>
    );
}

export default ChatUI;
