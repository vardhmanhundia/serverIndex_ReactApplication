import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Tooltip, Box, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import TableChartIcon from '@material-ui/icons/TableChart';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "100px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuSliderContainer:{
        width: 300,
        height: "100%"
    },
    avatar: {
        display: "block",
        margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
    listText: {
        color: "default"
    }

}));

const menuItems = [
    {
        listIcon: <Home/>,
        listText: "MainPage"
    },
    {
        listIcon: <AddCircleIcon/>,
        listText: "AddPage"
    },
    {
        listIcon: <TableChartIcon />,
        listText: "MaterTable"
    }
]



const NavBar = ({onRouteChange, changeTheme}) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        right: false
    })

    const toggleSlider = (slider, open) => () =>{
        setState({...state, [slider]: open})
    };

    const sideList = Slider => (
        <Box className={classes.menuSliderContainer} component="div">
            <Avatar className={classes.avatar} src="https://www.iotalliance.in/profile/vardhman.jpg" alt="ProfilePhoto"  />
            <Divider />
            <List>
                {menuItems.map((lsItem, key) => (
                    <ListItem button key={key} onClick={() => onRouteChange(lsItem.listText) } >
                        <ListItemIcon >
                            {lsItem.listIcon}
                        </ListItemIcon>
                        <ListItemText className={classes.listText} primary={lsItem.listText} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className={classes.root}>
        <AppBar color="primary" position="fixed">
            <Toolbar>
                <IconButton edge="start" onClick={toggleSlider("right",true)} className={classes.menuButton} color="default" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <MobileRightMenuSlider
                    anchor="left"
                    open={state.right}
                    onClose = {toggleSlider("right",false)}
                    >
                        {sideList("right")}
                    </MobileRightMenuSlider>
                <Typography color="textPrimary" variant="h6" className={classes.title}>
                    Server 2.0
                </Typography>
                <Tooltip title="HOME">
                    <IconButton onClick={() => onRouteChange("MainPage")} edge="end" className={classes.menuButton} color="default" aria-label="menu">
                        <Home />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Master Table">
                    <IconButton onClick={() => onRouteChange("MasterTable")} edge="end" className={classes.menuButton} color="default" aria-label="menu">
                        <TableChartIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add Server">
                    <IconButton onClick={() => onRouteChange("AddPage")} edge="end" className={classes.menuButton} color="default" aria-label="menu">
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Toggle Dark-Theme/ Light-Theme">
                    <IconButton onClick={changeTheme} edge="end" className={classes.menuButton} color="default" aria-label="menu">
                        <Brightness5Icon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default NavBar;