import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Button, ButtonGroup, Typography} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ServerCard from '../Components/ServerCard/serverCard';
import SearchBar from '../Components/SearchBar/searchBar';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const AvailableServers = ({onRouteChange, data, onFetch, onSearch}) => {

    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const [state , setState] = React.useState(false);
    const [deleteId, setId] = React.useState(-1)


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteServer = () => {
        setState(false);
        console.log("delete");
        fetch(`http://localhost:9090/server/${deleteId}`, {
        method: 'DELETE',
        headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .then(setOpen(true))
        .then(() => onFetch())
    };

    const onDelete = (id) => {
        setState(true);
        setId(id);
        handleOpen();
    };


    return (
        <Box >
            <Box style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px'}} >
            <SearchBar 
                onSearch = {onSearch}
                style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}} />
            </Box>
            <Box style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px'}}>
            <Grid container spacing={2}>
                {
                    (data!=null && data.length>0)?
                    data.map((server, key) => (
                        <Grid item xs={12} sm={6} lg={3} >
                            <ServerCard server={server} key={key} onRouteChange={onRouteChange} onDelete={onDelete} />
                        </Grid>
                    ))
                    :
                    <Grid item xs={12} sm={6} lg={3} >
                        <Typography variant="h3" color="textSecondary" ></Typography>
                    </Grid>
                    
                }
            </Grid>
            </Box>
            <Box style={{marginTop: "20px",display:"flex", justifyContent:"center"}} >
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddCircleOutlineIcon />}
                size="large"
                style={{marginBottom: "30px"}}
                onClick={() => onRouteChange("AddPage")}
            >
                ADD
            </Button>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {
                            state?
                            <div>
                                <h4 id="transition-modal-title">Are you sure you want to delete?</h4>
                                <ButtonGroup disableElevation style={{marginTop: "20px"}} variant="contained" color="primary">
                                    <Button onClick={deleteServer} style={{marginRight: "5px"}} >DELETE</Button>
                                    <Button onClick={handleClose} style={{marginLeft: "5px"}} >CANCEL</Button>
                                </ButtonGroup>
                            </div>
                            :
                            <div>
                                <h4 id="transition-modal-title">The server was Deleted Successfully</h4>
                            </div>
                        }
                    </div>
                </Fade>
            </Modal>
        </Box>
    );
}

export default AvailableServers;
