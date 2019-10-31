import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppContext from "./AppContext";
import Snack from "./Snack";
import Core from "./Core";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import {blue} from "@material-ui/core/colors";

const MuiTheme = {
    "dark": createMuiTheme({
        palette: {
            type: "dark",
            primary: blue,
            background: {
                default: "#222",
                paper: "#333",
            },
        },
        typography: {
            useNextVariants: true,
        },
        styles: {},
        overrides: {}
    }),
};

const styles = theme => ({
    app: {},
    progress: {
        zIndex: 1000,
    }
});

const API_SERVER = {
    url: `http://localhost:8000/api`,
    mode: "cors",
};

class App extends Component {
    constructor(props) {
        super(props);
        this.server = API_SERVER;
        this.state = {
            snacks: {},
            username: null,
        };
    }

    render() {
        const {classes} = this.props;
        const {username} = this.state;
        return (
            <MuiThemeProvider theme={MuiTheme["dark"]}>
                <React.Fragment>
                    <CssBaseline/>
                    <AppContext.Provider value={
                        {
                            snack: this.snack.bind(this),
                            server: API_SERVER,
                            username: username,
                        }
                    }>
                        <Snack messages={this.state.snacks} onClose={this.handleCloseSnack.bind(this)}/>
                        <Router>
                            <div className={classes.app}>
                                <Switch>
                                    <Route path="/logout" component={Logout}/>
                                    <Route path="/signup" component={Signup}/>
                                    <Route path="/" component={username ? Core : Login}/>
                                </Switch>
                            </div>
                        </Router>
                    </AppContext.Provider>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }

    componentDidMount() {
        let username = localStorage.getItem('username');
        this.setState({username});
    }


    handleCloseSnack(type) {
        this.setState(prevState => ({...prevState, snacks: {...prevState.snacks, [type]: null}}));
    }

    snack(type, msg) {
        this.setState(prevState => ({...prevState, snacks: {...prevState.snacks, [type]: msg}}));
    }
}

export default withStyles(styles, {withTheme: true})(App);