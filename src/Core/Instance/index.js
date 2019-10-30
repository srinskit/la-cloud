import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import Info from "./Info";
import Monitor from "./Monitor";
import Access from "./Access";

const styles = theme => ({});

class Instance extends Component {
    constructor(props, context) {
        super(props, context);
        this.server = context.server;
        this.snack = context.snack;
        this.state = {
            tabValue: 1,
            instance: null,
        }
    }

    render() {
        const {classes} = this.props;
        const {tabValue, instance} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={tabValue} onChange={this.handleTabChange.bind(this)}>
                        <Tab label="Info"/>
                        <Tab label="Monitor"/>
                        <Tab label="Access"/>
                    </Tabs>
                </AppBar>
                {!instance ? <LinearProgress/> : getTab(tabValue, instance)}
            </div>
        );
    }

    componentDidMount() {
        this.getInstance();
    }

    handleTabChange(event, newValue) {
        this.setState({tabValue: newValue});
    }

    getInstance() {
        this.setState({instance: null});
        let instance = {
            name: "instance-one", status: "running",
        };
        setTimeout(() => this.setState({instance}), 500);
    }
}

function getTab(tabValue, instance) {
    switch (tabValue) {
        case 0:
            return <Info instance={instance}/>;
        case 1:
            return <Monitor instance={instance}/>;
        case 2:
            return <Access instance={instance}/>;
        default:
            return null;
    }
}

Instance.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Instance);