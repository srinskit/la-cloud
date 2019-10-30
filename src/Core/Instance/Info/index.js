import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
});

class Info extends Component {
    render() {
        const {classes, instance} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography>
                            Name: {instance.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            status: {instance.status}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Info);