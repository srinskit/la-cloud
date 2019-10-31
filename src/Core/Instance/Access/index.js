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
                    <Typography variant={"body1"}>
                        Use the following command to SSH into the instance:
                    </Typography>
                    <pre>
                    <Paper className={classes.paper}>
                        <Typography>
                            <code>
                                ssh root@{instance.IP} -p {instance.ssh_port}
                            </code>
                        </Typography>
                    </Paper>
                    </pre>
                    <Typography variant={"caption"}>
                        Note default username is "root" and default password is "password". It is recommended to change
                        these credentials on first login.
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Access);