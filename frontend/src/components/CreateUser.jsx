import React from 'react'
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
function CreateUser() {

    const [username, setUsername] = useState({
        username: '',
    })
    const onchangeHandle = (e) => {
        setUsername({ ...username, [e.target.name]: e.target.value })
        // console.log(username)
        console.log(username)
    }

    const acceptAlldata = (e) => {
        e.preventDefault();
        const user = {
            username: username.username,
        }
        console.log(user)
        console.log(username)
        window.location = '/'
        // add data to backend
        fetch('/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))

    }

    return (
        <>
            <Box style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <Paper elevation={3} style={{ width: "50%", height: "50%", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h4" component="h4" gutterBottom>
                        Create New User
                    </Typography>
                    <Box style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <form style={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                name="username"
                                value={username.username}
                                onChange={onchangeHandle}
                            />
                            <Button variant="contained" onClick={acceptAlldata} style={{ marginTop: "20px" }}>Create User</Button>
                        </form>
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default CreateUser