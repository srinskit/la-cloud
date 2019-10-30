import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../AppContext";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
});

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.server = context.server;
        this.snack = context.snack;
        this.state = {
            formValues: {
                username: "",
                password: "",
            },
        }
    }

    render() {
        const {classes} = this.props;
        const {formValues} = this.state;
        return (
            <Container maxWidth={"sm"}>
                <Paper className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"}>
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name={"username"}
                                type={"username"}
                                label={"Username"}
                                value={formValues.name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name={"password"}
                                type={"password"}
                                label={"Password"}
                                value={formValues.password}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant={"contained"} color={"primary"}
                                    onClick={() => this.login(formValues)}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }

    componentDidMount() {
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState(oldValues => ({
            ...oldValues,
            formValues: {...oldValues.formValues, [name]: value},
        }));
    };

    login = ({username, password}) => {
        fetch(`${this.server.url}/auth/login/`, {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({username, password})
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                }
            )
            .catch(err => {
            this.snack("error", err.message);
        });
    }

    // login = ({username, password}) => {
    //     const form = new FormData()
    //     form.append('username', username)
    //     form.append('password', password)
    //     fetch(`${this.server.url}/auth/login/`, {
    //         mode: "cors",
    //         method: "POST",
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //         body: form
    //     }).then((res) => {
    //         console.log(res.json())
    //         if (!res.ok)
    //             throw Error(res.message);
    //         this.snack("success", "Deleted!");
    //     }).catch(err => {
    //         this.snack("error", err.message);
    //     });
    // }

}

Login.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Login);
