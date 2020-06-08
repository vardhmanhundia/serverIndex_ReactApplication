import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, InputBase, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const SearchBar = ({onSearch}) => {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
            <SearchIcon />
        </IconButton>
        <InputBase
            onChange={onSearch}
            className={classes.input}
            placeholder="Search Servers"
        />
        </Paper>
    );
}

export default SearchBar;
