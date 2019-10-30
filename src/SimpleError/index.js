import React from "react";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
});

function SimpleErrorComponent(props) {
    const {classes, message} = props;
    return (
        <Paper className={classes.paper}>
            <Grid justify="space-between" container>
                <Hidden xsDown>
                    <Grid item>
                        <Typography variant="h4">
                            {message}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ErrorIcon fontSize="large"/>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid item>
                        <Typography variant="body1">
                            {message}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ErrorIcon fontSize="default"/>
                    </Grid>
                </Hidden>
            </Grid>
        </Paper>
    );
}

export default withStyles(styles, {withTheme: true})(SimpleErrorComponent);