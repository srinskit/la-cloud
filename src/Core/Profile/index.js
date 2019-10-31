import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

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
                    <Typography variant={"h3"} gutterBottom>
                        Profile
                    </Typography>
                    {
                        user ?
                            <div>
                                <Typography variant={"h6"}>
                                    {user.name}
                                </Typography>
                                <Typography>
                                    Username: {user.username}
                                </Typography>
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