import React from 'react';
import {Card, CardHeader, CardMedia, CardActions, Avatar, IconButton, Button, Menu, MenuItem} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    button:{
        justifyContent: "center",
        margin:"10px",
        alignContent:"center"
    }
}));

const ServerCard = ({ onRouteChange, onDelete, server}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();

    return (
        <Card  className={classes.root}>
            <CardHeader
                style={{backgroundColor: "transparent"}}
                avatar={
                <Avatar aria-label="server" className={classes.avatar}>
                    {server.serverName.charAt(0)}
                </Avatar>
                }
                action={
                <IconButton color="inherit" aria-label="options" onClick={handleClick} >
                    <MoreVertIcon />
                </IconButton>
                }
                title= {server.serverName}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => onRouteChange("ModifyPage",server.id) }><SystemUpdateAltIcon/><hr/>Update</MenuItem>
                <MenuItem onClick={() => onDelete(server.id) }> <DeleteIcon /><hr/>Delete</MenuItem>
            </Menu>
            <CardMedia
                className={classes.media}
                image={server.imageUrl}
                title={server.imageUrl}
            />
            <CardActions disableSpacing>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {onRouteChange("ServerPage", server.id)}}
                    startIcon={<SendIcon />}
                >
                    More
                </Button>
            </CardActions>
        </Card>
    );
}

export default ServerCard;
