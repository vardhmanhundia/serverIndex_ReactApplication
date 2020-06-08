import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const SubHeading = ({subHead, subDes}) => {
    return (
        <>
        <Grid xs={12} sm={12} lg={12} style={{display: 'flex', justifyContent: 'center'}} >
            <Typography color="secondary"  variant="h3" component="h3">
                <b>{subHead}</b>
            </Typography>
        </Grid>
        <Grid xs={12} sm={12} lg={12} style={{display: 'flex', justifyContent: 'center'}}>
            <Typography color="primary" variant= "h4" component="h4" >
                <b>{subDes}</b>
            </Typography>
        </Grid>
        </>
    )
}

export default SubHeading;
