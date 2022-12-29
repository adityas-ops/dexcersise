import React from 'react'
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import Lottie from "react-lottie";
import exercise from './exercise2.json'


// create exercise a simple form using material ui
function CreateExercise() {

    // 
    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: exercise,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [username, setUsername] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []

    })
    const onchangeHandle = (e) => {
        setUsername({ ...username, [e.target.name]: e.target.value })
        // console.log(username)

    }

    const acceptAlldata = (e) => {
        e.preventDefault();
        const exercise = {
            username: username.username,
            description: username.description,
            duration: username.duration,
            date: username.date
        }
        console.log(exercise)
        console.log(username)
        window.location = '/'
        // add data to backend
        fetch('/api/exercises/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        })
            .then(res => res.json())
            .then(data => console.log(data))

    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>

                <Paper elevation={3} sx={{ p: 2, m: 2, width: '80%', margin: 'auto', height: 'content-fit' }}>
                    <Typography style={{ width: '100%', textAlign: "center", marginBottom: '0px' }} variant="h4" component="h4" gutterBottom>
                        Create New Exercise Log
                    </Typography>
                    <Box style={{ marginTop: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Box>
                            <Lottie options={defaultOptions1} height={500} width={500} />
                        </Box>
                        <Box style={{ width: "60%" }} >
                            <form>
                                <TextField
                                    sx={{ width: '100%', margin: '10px' }}
                                    id="outlined-basic"
                                    label="Exercise Name"
                                    variant="outlined"
                                    name="username"
                                    value={username.username}
                                    onChange={onchangeHandle}
                                />
                                <TextField
                                    sx={{ width: '100%', margin: '10px' }}
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    name="description"
                                    value={username.description}
                                    onChange={onchangeHandle}
                                />
                                <TextField

                                    sx={{ width: '100%', margin: '10px' }}
                                    id="outlined-basic"
                                    label="Duration"
                                    variant="outlined"
                                    name="duration"
                                    value={username.duration}
                                    onChange={onchangeHandle}
                                />
                                <TextField
                                    sx={{ width: '100%', margin: '10px' }}
                                    id="outlined-basic"
                                    label="Date"
                                    variant="outlined"
                                    name="date"
                                    value={username.date}
                                    onChange={onchangeHandle}
                                />
                                <Button
                                    onClick={acceptAlldata}
                                    variant="contained" sx={{ width: '90%', marginLeft: '35px' }}>Create Exercise Log</Button>
                            </form>
                        </Box>
                    </Box>

                </Paper>
            </Box>

        </>
    )
}

export default CreateExercise