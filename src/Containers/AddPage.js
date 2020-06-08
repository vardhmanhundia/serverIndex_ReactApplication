import React from 'react';
import {TextField, Grid, Button, ButtonGroup} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SubHeading from '../Components/SubHeading/subHeading';

const useStyles = theme => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
});

class AddPage extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
            modifyMode: true,
            imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-cloud-icons/512/cloud_status-512.png",
            serverName: "",
            description:"",
            serverLanguage: "",
            framework: ""
        }
    }

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
                this.setState({framework: event.target.value})
                break;
            default:
                return;
        }
    }

    addServer = () => {

        const data = {
            "serverName": this.state.serverName,
            "serverLanguage": this.state.serverLanguage,
            "serverFramework": this.state.serverFramework,
            "description": this.state.description,
            "imageUrl": this.state.imageUrl
        }

        console.log(data);

        fetch("http://localhost:9090/server/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response)
        })
        .then(()=> this.props.onRouteChange("MainPage"))
        .catch((err) => console.log(err));
        
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
            <Grid style={{padding:"20px", display: 'flex', justifyContent: 'center'}} container spacing={2} className={classes.serverImage} >
                    <SubHeading subHead="ADD SERVER" subDes= "You can add your server" />
            </Grid>
            <Grid style={{padding:"20px"}} container spacing={2} className={classes.serverImage} >
                <Grid item xs={12} sm={12} lg={6}>
                    <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="serverName"
                            name="serverName"
                            onChange={this.onFormChange}
                            label="Server Name"
                            variant="filled"
                        />  
                    </Grid> 
                    <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="Language"
                            name="Language"
                            onChange={this.onFormChange}
                            label="Language"
                            variant="filled"
                        />  
                    </Grid> 
                    <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="Framework"
                            name="Framework"
                            onChange={this.onFormChange}
                            label="Framework"
                            variant="filled"
                        />  
                    </Grid>
                    
                    <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        <TextField
                            required
                            multiline
                            rows={20}
                            fullWidth
                            id="Description"
                            name="Description"
                            onChange={this.onFormChange}
                            label="Description"
                            variant="filled"
                        />  
                    </Grid> 
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        <img style={{height: "auto", width: "100%"}} src={this.state.imageUrl} alt="serverName" /> 
                    </Grid> 
                    <Grid style={{padding:"20px"}} item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="imageUrl"
                            name="imageUrl"
                            defaultValue={this.state.imageUrl}
                            onChange={this.onFormChange}
                            label="imageUrl"
                            variant="filled"
                        /> 
                    </Grid> 
                </Grid>
            </Grid>
            <Grid style={{ display: 'flex',justifyContent: 'center'}}  item xs={12} >
                <ButtonGroup disableElevation style={{marginTop: "20px"}} variant="contained" color="secondary">
                    <Button onClick={() => this.addServer()} style={{marginRight: "20px"}} >ADD ITEM</Button>
                    <Button onClick={() => this.props.onRouteChange("MainPage") } style={{marginLeft: "20px"}} >CANCEL</Button>
                </ButtonGroup>
            </Grid>
        </div>
            
        );
    }
}

export default withStyles(useStyles)(AddPage);