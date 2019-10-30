import React, {Component} from "react";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
});

class Access extends Component {
    render() {
        return (
            <div>
                Access
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Access);