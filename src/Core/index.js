import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {Link, Route, Switch} from "react-router-dom";
import AppContext from "../AppContext";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemLink from "../ListItemLink";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Dashboard';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import ListSubheader from "@material-ui/core/ListSubheader";
import Container from "@material-ui/core/Container";
import Dashboard from "./Dashboard";
import CreateInstance from "./CreateInstance";
import Instance from "./Instance";
import SimpleError from "../SimpleError";

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        width: "100%",
    },
    toolbar: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    container: {
        marginTop: theme.spacing(2),
    },
});

class Core extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            showDrawer: false,
            showEventOptions: false,
            showExhibitOptions: false,
        };
    }

    render() {
        const {classes} = this.props;
        const {showDrawer} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar} color={"inherit"}>
                    <Toolbar>
                        <Hidden smUp>
                            <IconButton
                                onClick={() => this.toggleDrawer()}
                                edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                        </Hidden>
                        <Typography variant="h6" className={classes.title}>
                            La Cloud
                        </Typography>
                        <IconButton component={Link} to={"/"} edge="end">
                            <HomeIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Hidden xsDown>
                    <Drawer
                        className={classes.drawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                    >
                        <div className={classes.toolbar}/>
                        {this.getDrawerContent()}
                    </Drawer>
                </Hidden>
                <Hidden smUp>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        open={showDrawer}
                        onClose={() => this.ctrlDrawer(false)}
                    >
                        {this.getDrawerContent()}
                    </Drawer>
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Container className={classes.container}>
                        <Switch>
                            <Route exact path={"/"} component={Dashboard}/>
                            <Route path={"/new"} component={CreateInstance}/>
                            <Route path={"/instance/:id"} component={Instance}/>
                            <Route path={"/"} component={NotFound}/>
                        </Switch>
                    </Container>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }

    ctrlDrawer(show) {
        this.setState({showDrawer: show});
    }

    toggleDrawer() {
        this.setState(({showDrawer}) => ({showDrawer: !showDrawer}));
    }

    getDrawerContent() {
        const managementItems = [
            {to: "/", label: "Dashboard"},
            {to: "/new", label: "Create Instance"},
        ];
        return (
            <List>
                <ListSubheader>
                    Manage
                </ListSubheader>
                <List onClick={() => this.ctrlDrawer(false)}>
                    {
                        managementItems.map((item, i) => (
                            <ListItemLink key={i} to={item.to}>
                                <ListItemText primary={item.label}/>
                            </ListItemLink>
                        ))
                    }
                </List>
                <Divider/>
                <ListSubheader>
                    Account
                </ListSubheader>
                <List onClick={() => this.ctrlDrawer(false)}>
                    <ListItemLink to={"/profile"}>
                        <ListItemText primary="Profile"/>
                    </ListItemLink>
                    <ListItemLink to={"/logout"}>
                        <ListItemText primary="Logout"/>
                    </ListItemLink>
                </List>
            </List>
        );
    }

    toggleBool(key) {
        this.setState(ps => ({[key]: !ps[key]}));
    }
}

function NotFound() {
    return (
        <Container maxWidth="md">
            <SimpleError message="Page not found!"/>
        </Container>
    );
}

Core.contextType = AppContext;
export default withStyles(styles, {withTheme: true})(Core);