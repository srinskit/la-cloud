import React, {Component} from "react";
import {LinearProgress, withStyles} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog/index';
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogContentText from "@material-ui/core/DialogContentText/index";
import DialogActions from "@material-ui/core/DialogActions";
import AppContext from "../AppContext";

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
    },
});


class Logout extends Component {
    constructor(props, context) {
        super(props, context); this.context = context;
    }

    render() {
        return (
            <Dialog open={true} fullWidth maxWidth="xs">
                <DialogTitle>Logging out</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please wait</DialogContentText>
                </DialogContent>
                <DialogContent>
                    <LinearProgress/>
                </DialogContent>
                <DialogActions/>
            </Dialog>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            localStorage.removeItem("username");
            window.location.href = "/";
        }, 1000);
    }
}

Logout.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Logout);