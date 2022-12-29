import React, { useEffect } from 'react'
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditExercise() {
    const { id } = useParams()
    const [exercises, setExercises] = useState([])
    useEffect(() => {
        axios.get('/api/exercises/' + id)
            .then(res => {
                setExercises(res.data)
                console.log("this is edit exercise form")
                console.log(res.data.username)
            })
            .catch(err => console.log(err))
    }, [id])




    const onchangeHandle = (e) => {
        setExercises({ ...exercises, [e.target.name]: e.target.value })
        // console.log(username)
    }

    const acceptAlldata = (e) => {
        e.preventDefault();
        const exercise = {
            username: exercises.username,
            description: exercises.description,
            duration: exercises.duration,
            date: exercises.date
        }
        console.log(exercise)

        // add data to backend
        axios.post('/api/exercises/update/' + id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Paper elevation={3} sx={{ width: '600px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography style={{ marginTop: '15px' }} variant="h4" component="h4" gutterBottom>
                        Edit Exercise Log
                    </Typography>
                    <Box style={{ width: "60%" }} >
                        <form>
                            <TextField
                                sx={{ width: '100%', margin: '10px' }}
                                id="outlined-basic"
                                variant="outlined"
                                name="username"
                                value={exercises.username}
                                onChange={onchangeHandle}
                            // defaultValue={username.username}


                            />
                            <TextField
                                sx={{ width: '100%', margin: '10px' }}
                                id="outlined-basic"
                                // label="Description"
                                variant="outlined"
                                name="description"
                                defaultValue={exercises.description}
                                value={exercises.description}
                                onChange={onchangeHandle}
                            />
                            <TextField
                                sx={{ width: '100%', margin: '10px' }}
                                id="outlined-basic"
                                // label="Duration"
                                variant="outlined"
                                name="duration"
                                value={exercises.duration}
                                onChange={onchangeHandle}
                            />
                            <TextField
                                sx={{ width: '100%', margin: '10px' }}
                                id="outlined-basic"
                                // label="Date"
                                variant="outlined"
                                name="date"
                                value={exercises.date}
                                onChange={onchangeHandle}
                            />
                            <Button
                                sx={{ width: '100%', margin: '10px' }}
                                variant="contained"
                                onClick={acceptAlldata}
                            >Edit Exercise Log</Button>
                        </form>
                    </Box>
                </Paper>
            </Box>

        </>
    )
}

export default EditExercise