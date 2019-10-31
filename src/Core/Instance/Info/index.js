import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        padding: theme.spacing(1, 0),
    },
});

class Info extends Component {
    render() {
        const {classes, instance} = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{"Name"}</TableCell>
                                <TableCell align="right">{instance.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">{"Status"}</TableCell>
                                <TableCell align="right">{instance.status}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">{"IP"}</TableCell>
                                <TableCell align="right">{instance.IP}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">{"SSH Port"}</TableCell>
                                <TableCell align="right">{instance.ssh_port}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Info);