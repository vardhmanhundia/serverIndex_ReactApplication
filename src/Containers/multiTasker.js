import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Checkbox, Grid,
    IconButton, TextField, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import SubHeading from '../Components/SubHeading/subHeading';
import SearchBar from '../Components/SearchBar/searchBar';



const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
});


const MultiTasker = () => {
    const [servers, setServers] = useState([]);
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState([]);
    const [deleteMode, setDeleteMode] = useState(true);

    useEffect((props) => {
        fetch(`http://localhost:9090/server/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setServers(data))
    },[]);

    const updateServers = () => {
        fetch(`http://localhost:9090/server/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setServers(data))
    }

    const deleteServers = () => {
        fetch(`http://localhost:9090/server/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setServers(data))
    }

    const toDelete = (id) => {
        setCount(count+1);
        let add = selected.push(id);
        setSelected(add);
        console.log("deleting", count, selected);
    }

    const toModify = (data) => {
        setCount(count+1);
        let add = [].concat(selected);
        add.push(data);
        setSelected(add);
        console.log("updating", count, selected);
    }

    const selectAll = () => {

    }

    const changeMode = () => {
        setCount(0);
        setSelected([]);
        setDeleteMode(!deleteMode);
    }

    const onSearch = (event) => {
        const req = event.target.value!=="" ? `http://localhost:9090/server/search/${event.target.value}` : `http://localhost:9090/server/`;
        fetch(req, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setServers(data))
    }

    const classes = useStyles();

    return (
        <div>
            <SubHeading subHead="Master Table" subDes="multiply your working speed with master table" />
            <Paper >
                <Grid color="primary" container style={{marginBottom:"10px", padding:"10px"}} >
                    <Tooltip title="Delete" >
                    <IconButton  onClick={deleteServers} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Update" >
                    <IconButton onClick={updateServers} aria-label="update">
                        <DoneIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="toggle" >
                    <IconButton onClick={changeMode} aria-label="EditIcon">
                        <EditIcon />
                    </IconButton>
                    </Tooltip>
                    <SearchBar onSearch ={onSearch} />
                </Grid>
                <TableContainer style={{margin:"5px"}} component={Paper}>
                <Table stickyHeader={true} className={classes.table} aria-label="simple table">
                    <TableHead >
                    <TableRow>
                        {deleteMode &&
                        <TableCell align="left"> 
                            <Checkbox
                                name="Select All"
                                onSelect={selectAll}
                            />
                        </TableCell>
                        }
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Language</TableCell>
                        <TableCell align="left">Framework</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">imgUrl</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {(servers!=null && servers.length>0) &&servers.map((row) => (
                        <TableRow key={row.id} selected={false} >
                            {
                                deleteMode &&
                                <TableCell align="left">
                                    <Checkbox
                                        name={row.id}
                                        onSelect={toDelete}
                                    />
                                </TableCell>
                            }
                            <TableCell align="left">
                                {
                                    deleteMode? <>{row.serverName}</> : <TextField  defaultValue={row.serverName} />
                                }
                            </TableCell>
                            <TableCell align="left">
                                {
                                    deleteMode? <>{row.serverLanguage}</> : <TextField  defaultValue={row.serverLanguage} />
                                }
                            </TableCell>
                            <TableCell align="left">
                                {
                                    deleteMode? <>{row.serverFramework}</> : <TextField defaultValue={row.serverFramework} />
                                }
                            </TableCell>
                            <TableCell align="left">
                                {
                                    deleteMode? <>{row.description}</> : <TextField  defaultValue={row.description} />
                                }
                            </TableCell>
                            <TableCell align="left">
                                {
                                    deleteMode? <>{row.imageUrl}</> : <TextField  defaultValue={row.imageUrl} />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default MultiTasker;