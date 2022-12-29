import React from 'react'
import { Paper, Button, Typography, Box, Container, Divider } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));





function ExerciseList() {
    const [exercises, setExercises] = useState([])
    useEffect(() => {
        console.log("murcha")
        axios.get('/api/exercises/')
            .then(res => {

                setExercises(res.data)
                console.log("data", res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const deleteExercise = (id) => {
        axios.delete(`/api/exercises/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        setExercises(exercises.filter(exercise => exercise._id !== id))

    }


    return (
        <>
            <Container>
                <Box style={{ width: "100%", height: "content-fit", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <Paper elevation={3} style={{ width: "100%", marginTop: "130px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="h4" component="h4" gutterBottom>
                            All exercise
                            <Divider />
                        </Typography>
                        <Box style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Typography variant='h5'>Exercise</Typography></TableCell>
                                            <TableCell align="right"><Typography variant='h5'>Duration</Typography></TableCell>
                                            <TableCell align="right"><Typography variant='h5'>Date</Typography></TableCell>
                                            <TableCell align="right"><Typography component="h4" variant="h5">Actions</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {exercises.map((row) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell style={{ width: "30%" }} component="th" scope="row">
                                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                            <Typography>{row.username}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                                {row.description}
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </TableCell>
                                                <TableCell align="right"><Typography style={{ fontSize: '18px' }}>{row.duration}</Typography></TableCell>
                                                <TableCell align="right"><Typography style={{ fontSize: '18px' }}>{row.date.substring(0, 10)}</Typography></TableCell>
                                                <TableCell align="right">
                                                    <NavLink to={`/update/${row._id}`} style={{ textDecoration: "none" }}>
                                                        <Button

                                                            variant="contained" style={{ marginRight: "15px" }} color="primary">Edit</Button>
                                                    </NavLink>
                                                    <Button onClick={() => {
                                                        deleteExercise(row._id)
                                                    }} variant="contained" color="error">Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                    </Paper>


                </Box>

            </Container>

        </>
    )
}

export default ExerciseList