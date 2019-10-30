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

class Signup extends Component {
    constructor(props, context) {
        super(props, context);
        this.server = context.server;
        this.snack = context.snack;
        this.state = {
            formValues: {
                name: "",
                email: "",
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
                                Signup
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name={"email"}
                                type={"email"}
                                label={"Email"}
                                value={formValues.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name={"name"}
                                type={"name"}
                                label={"Name"}
                                value={formValues.name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name={"username"}
                                type={"username"}
                                label={"Username"}
                                value={formValues.username}
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
                                    onClick={() => this.Signup(formValues)}
                            >
                                Signup
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

    Signup = (formValues) => {
        console.log(formValues);
        fetch(`${this.server.url}/auth/signup/`, {
            mode: "cors",
            method: "POST",
            body: {"user_details": formValues},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        }).then(res => {
            if (res.ok)
                return res.json();
            return res.json().then(({message}) => {
                throw Error(message);
            })
        }).then((val) => {
            this.snack("success", val.message);
        }).catch(err => {
            this.snack("error", err.message);
        });
    }
}

Signup.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Signup);