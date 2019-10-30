import React from "react";
import {withStyles} from "@material-ui/core";
import {grey, green, amber, red} from "@material-ui/core/es/colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import InfoSnackIcon from '@material-ui/icons/Info';
import SuccessSnackIcon from '@material-ui/icons/CheckCircle';
import WarningSnackIcon from '@material-ui/icons/Warning';
import ErrorSnackIcon from '@material-ui/icons/Error';

const styles = theme => ({
    snackMessage: {
        display: 'flex',
        alignItems: 'center',
    },
    snackIcon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    infoSnack: {
        backgroundColor: grey[600],
    },
    successSnack: {
        backgroundColor: green[600],
    },
    warnSnack: {
        backgroundColor: amber[700],
    },
    errorSnack: {
        backgroundColor: red[700],
    },
});

function Snack(props) {
    const {classes, messages, onClose} = props;
    return (
        [
            <Snackbar
                key={0}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={messages["info"] != null}
                onClose={onClose.bind(null, "info")}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={classes.infoSnack}
                    message={
                        <span className={classes.snackMessage}>
                            <InfoSnackIcon className={classes.snackIcon}/>{messages["info"]}
                        </span>
                    }
                />
            </Snackbar>,
            <Snackbar
                key={1}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={messages["success"] != null}
                onClose={onClose.bind(null, "success")}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={classes.successSnack}
                    message={
                        <span className={classes.snackMessage}>
                            <SuccessSnackIcon className={classes.snackIcon}/>{messages["success"]}
                        </span>
                    }
                />
            </Snackbar>,
            <Snackbar
                key={2}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={messages["warning"] != null}
                onClose={onClose.bind(null, "warning")}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={classes.warnSnack}
                    message={
                        <span className={classes.snackMessage}>
                            <WarningSnackIcon className={classes.snackIcon}/>{messages["warning"]}
                        </span>
                    }
                />
            </Snackbar>,
            <Snackbar
                key={3}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={messages["error"] != null}
                onClose={onClose.bind(null, "error")}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={classes.errorSnack}
                    message={
                        <span className={classes.snackMessage}>
                            <ErrorSnackIcon className={classes.snackIcon}/>{messages["error"]}
                        </span>
                    }
                />
            </Snackbar>,
        ]
    );
}

export default withStyles(styles, {withTheme: true})(Snack);