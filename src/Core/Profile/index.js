import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import ProfileIcon from "@material-ui/icons/AccountBox";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
});

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.state = {user: null}
    }

    render() {
        const {classes} = this.props;
        const {user} = this.state;
        return (
            <div>
                <Paper className={classes.paper}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant={"h4"} gutterBottom>
                            Profile
                        </Typography>
                        <ProfileIcon fontSize={"large"}/>
                    </div>
                    {
                        user ?
                            <div>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">{"Name"}</TableCell>
                                            <TableCell align="right">{user.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">{"Username"}</TableCell>
                                            <TableCell align="right">{user.username}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">{"Email"}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div> : null
                    }
                </Paper>
                {!user ? <LinearProgress/> : null}
            </div>
        );
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        fetch(`${this.context.server.url}/profile/${this.context.username}`, {
            mode: this.context.server.mode,
            method: "GET",
        })
            .then(res => {
                if (res.ok)
                    return res.json();
                return res.json().then(({message}) => {
                    throw Error(message)
                })
            })
            .then((result) => {
                this.setState({user: result.user});
            })
            .catch(err => {
                this.context.snack("error", err.message);
            });
    }
}

Profile.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Profile);