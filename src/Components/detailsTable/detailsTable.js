import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
    expansionPanel:{
    }
}));

export default function ControlledExpansionPanels({ language, framework, description}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <div >
                <ExpansionPanel className={classes.expansionPanel} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>Language</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                            <Typography>
                                {language}
                            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expansionPanel} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    >
                    <Typography className={classes.heading}>Framework</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        {framework}
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expansionPanel} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>Description</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                            <Typography>
                                {description}
                            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    );
}