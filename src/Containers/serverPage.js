import React from 'react';
import {Box, Grid, ButtonGroup, Typography, Button, TextField, Modal} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DetailsTable from '../Components/detailsTable/detailsTable';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import SubHeading from '../Components/SubHeading/subHeading';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    serverImage: {
        padding: "30px",
    },
    inputRoot: {
        fontSize: 20
    },
    labelRoot: {
        fontSize: 20,
        color: "#6D7B7F",
    },
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
});

class ServerPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modifyMode: false,
            serverName: null,
            description: null,
            serverLanguage: null,
            serverFramework: null,
            imageUrl: null,
            openModal: false,
            modalState: ""
        }
        this.fetchServer();
    }
    componentDidMount = () => {
        this.setState({
            modifyMode: this.props.mode
        })
    }
    
    fetchServer = () => {
        fetch(`http://localhost:9090/server/${this.props.serverId}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({
            serverName: data.serverName,
            description: data.description,
            serverLanguage: data.serverLanguage,
            serverFramework: data.serverFramework,
            imageUrl: data.imageUrl
        }))
    }


    toggleModify = () => {
        console.log("modify");
        this.setState({
            modifyMode: !this.state.modifyMode
        });
    };

    onFormChange = (event) => {
        switch(event.target.name) {
            case 'serverName':
                this.setState({serverName: event.target.value})
                break;
            case 'imageUrl':
                this.setState({imageUrl: event.target.value})
                break;
            case 'Description':
                this.setState({description: event.target.value})
                break;
            case 'Language':
                this.setState({serverLanguage: event.target.value})
                break;
            case 'Framework':
                this.setState({serverFramework: event.target.value})
                break;
            default:
                return;
        }
    }

    handleOpen = (action) => {
        this.setState({
            openModal: true,
            modalState: action
        });
    };

    handleClose = () => {
        this.setState({
            openModal: false
        })
    };

    rand = () => {
        return Math.round(Math.random() * 20) - 10;
    }

    getModalStyle = () => {
        const top = 50 + this.rand();
        const left = 50 + this.rand();
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }


    deleteServer = () => {
        this.setState({
            modalState: "deleted"
        });
        fetch(`http://localhost:9090/server/${this.props.serverId}`, {
        method: 'DELETE',
        headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .then(() => this.props.onRouteChange("MainPage"))
        .catch((err) => console.log(err));
    }

    updateServer = () => {

        const data = {
            id: this.props.serverId,
            serverName: this.state.serverName,
            description: this.state.description,
            serverLanguage: this.state.serverLanguage,
            serverFramework: this.state.serverFramework,
            imageUrl: this.state.imageUrl
        }

        this.handleOpen("modified");
        fetch("http://localhost:9090/server/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response)
        })
        .then(() => this.toggleModify())
        .catch((err) => console.log(err));
        
    }

    render(){
        const { classes } = this.props;
        return (
            <Box>
                <Grid style={{padding:"20px"}} container spacing={2} className={classes.serverImage} >
                    <SubHeading 
                        subHead={this.state.modifyMode? "Modify":"Server"} 
                        subDes={this.state.modifyMode? "You can modify your server here":"Provides Details of your existing server"} 
                    />
                </Grid>
                <Grid style={{padding:"20px"}} container spacing={2} className={classes.serverImage} >
                    <Grid item xs={12} sm={12} lg={6}>
                        <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        {
                            this.state.modifyMode?
                            <TextField
                                id="title" 
                                label="ServerName" 
                                name="serverName"
                                onChange={this.onFormChange}
                                style={{flex:"flex-grow",justifyContent:"center", color:"white"}}
                                type="text" 
                                defaultValue={this.state.serverName}
                                variant="filled" 
                                fullWidth
                            /> 
                            :
                            <Typography variant="h3" component="h2">
                                {this.state.serverName}
                            </Typography>
                        }  
                        </Grid> 
                        {
                            !this.state.modifyMode?
                            <Grid container className={classes.serverImage} xs={12} sm={12}>
                                <DetailsTable 
                                    description={this.state.description} 
                                    language={this.state.serverLanguage} 
                                    framework={this.state.serverFramework} 
                                />
                            </Grid>
                            :
                            <div>
                                <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                                    <TextField
                                        id="title" 
                                        label="Language" 
                                        type="text" 
                                        defaultValue={this.state.serverLanguage}
                                        variant="filled"
                                        name="Language"
                                        onChange={this.onFormChange}
                                        fullWidth
                                    /> 
                                </Grid> 
                                <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                                    <TextField
                                        id="Framework" 
                                        label="Framework" 
                                        type="text" 
                                        defaultValue={this.state.serverFramework}
                                        name="Framework"
                                        variant="filled"
                                        onChange={this.onFormChange}
                                        fullWidth
                                    />  
                                </Grid>
                                
                                <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        name="Description"
                                        onChange={this.onFormChange}
                                        multiline
                                        fullWidth
                                        rows={20}
                                        defaultValue={this.state.description}
                                        variant="filled"
                                    /> 
                                </Grid> 
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                            <img style={{height: "auto", width: "100%"}} src={this.state.imageUrl} alt="serverName" /> 
                        </Grid> 
                        {
                            this.state.modifyMode &&
                            <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    id="imageUrl"
                                    defaultValue={this.state.imageUrl}
                                    name="imageUrl"
                                    onChange={this.onFormChange}
                                    label="imageUrl"
                                    variant="filled"
                                /> 
                            </Grid> 
                        }
                    </Grid>
                </Grid>
                <Grid style={{ display: 'flex',justifyContent: 'center'}}  item xs={12} >
                    {
                        this.state.modifyMode ?
                        <ButtonGroup disableElevation style={{marginTop: "20px"}} variant="contained" color="primary">
                            <Button onClick={() => this.handleOpen("modify")} style={{marginRight: "10px"}} >UPDATE</Button>
                            <Button onClick={() => this.setState({modifyMode: false})} style={{marginLeft: "10px"}} >CANCEL</Button>
                        </ButtonGroup>
                        :
                        <ButtonGroup disableElevation style={{marginTop: "20px"}} variant="contained" color="primary">
                            <Button onClick={this.toggleModify} style={{marginRight: "10px"}} >MODIFY</Button>
                            <Button onClick={() => this.handleOpen("delete")} style={{marginLeft: "10px"}} >DELETE</Button>
                            <Button onClick={() => this.props.onRouteChange("MainPage")} style={{marginLeft: "10px"}} >BACK</Button>
                        </ButtonGroup>
                    }
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.openModal}>
                        <div className={classes.paper}>
                            {
                                this.state.modalState === "delete"?
                                <div>
                                    <h4 id="transition-modal-title">Are you sure you want to delete?</h4>
                                    <ButtonGroup disableElevation style={{marginTop: "20px"}} variant="contained" color="primary">
                                        <Button onClick={this.deleteServer} style={{marginRight: "5px"}} >DELETE</Button>
                                        <Button onClick={this.handleClose} style={{marginLeft: "5px"}} >CANCEL</Button>
                                    </ButtonGroup>
                                </div>
                                :
                                this.state.modalState === "deleted"?
                                <div>
                                    <h4 id="transition-modal-title">The server was Deleted Successfully</h4>
                                </div>
                                :
                                this.state.modalState === "modify"?
                                <div>
                                    <h4 id="transition-modal-title">Are you sure you want to update ?</h4>
                                    <ButtonGroup disableElevation style={{marginTop: "20px"}} variant="contained" color="primary">
                                        <Button onClick={this.updateServer} style={{marginRight: "5px"}} >UPDATE</Button>
                                        <Button onClick={this.handleClose} style={{marginLeft: "5px"}} >CANCEL</Button>
                                    </ButtonGroup>
                                </div>
                                :
                                <div>
                                    <h4 id="transition-modal-title">The server was Modified Successfully</h4>
                                </div>
                            }
                        </div>
                    </Fade>
            </Modal>
            </Box>
        );
    }
}

export default withStyles(useStyles)(ServerPage);
