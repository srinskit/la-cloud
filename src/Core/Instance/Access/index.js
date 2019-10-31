import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        padding: theme.spacing(1, 0),
    },
    paper: {
        padding: theme.spacing(2),
    },
});

class Access extends Component {
    render() {
        const {classes, instance} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant={"h6"} gutterBottom>
                        SSH to {instance.name}
                    </Typography>
                    <Typography paragraph>
                        ssh root@{instance.IP}:{instance.ssh_port}
                    </Typography>
                    <Typography variant={"caption"}>
                        Note default password is "password".
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Access);