import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Container from "@material-ui/core/Container";

import AppContext from "./AppContext";
import SimpleError from "./SimpleError";
import Snack from "./Snack";
import Core from "./Core";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";

const MuiTheme = {
    "dark": createMuiTheme({
        palette: {
            type: "dark",
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

// const prod_domain = ".tronixnitk.in";
const API_SERVER = {
    url: `http://localhost:8000/api`,
    // mode: (window.location.hostname.slice(-prod_domain.length) === prod_domain) ? undefined : "cors",
    mode: undefined,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.server = API_SERVER;
        this.state = {
            snacks: {},
            user: null,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={MuiTheme["dark"]}>
                <React.Fragment>
                    <CssBaseline/>
                    <AppContext.Provider value={
                        {
                            snack: this.snack.bind(this),
                            server: API_SERVER,
                        }
                    }>
                        <Snack messages={this.state.snacks} onClose={this.handleCloseSnack.bind(this)}/>
                        <Router>
                            <div className={classes.app}>
                                <Switch>
                                    <Route path="/login" component={Login}/>
                                    <Route path="/logout" component={Logout}/>
                                    <Route path="/signup" component={Signup}/>
                                    <Route path="/" component={Core}/>
                                    <Route path="/" component={NotFound}/>
                                </Switch>
                            </div>
                        </Router>
                    </AppContext.Provider>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }

    componentDidMount() {
    }


    handleCloseSnack(type) {
        this.setState(prevState => ({...prevState, snacks: {...prevState.snacks, [type]: null}}));
    }

    snack(type, msg) {
        this.setState(prevState => ({...prevState, snacks: {...prevState.snacks, [type]: msg}}));
    }
}

function NotFound() {
    return (
        <Container maxWidth="md">
            <SimpleError message="Page not found!"/>
        </Container>
    );
}

export default withStyles(styles, {withTheme: true})(App);
