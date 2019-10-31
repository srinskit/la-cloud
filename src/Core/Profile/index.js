import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";

const styles = theme => ({});

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.state = {}
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
            </div>
        );
    }

    componentDidMount() {
    }
}

Profile.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Profile);