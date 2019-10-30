import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Chart from "react-google-charts";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
});

class Monitor extends Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'dogs'],
                            [0, 0],
                            [1, 10],
                            [2, 23],
                            [3, 17],
                            [4, 18],
                            [5, 9],
                            [6, 11],
                            [7, 27],
                            [8, 33],
                            [9, 40],
                            [10, 32],
                            [11, 35],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'CPU usage',
                                viewWindow: {min: 0, max: 100}
                            },
                            legend: "none"
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'dogs'],
                            [0, 0],
                            [1, 10],
                            [2, 23],
                            [3, 17],
                            [4, 18],
                            [5, 9],
                            [6, 11],
                            [7, 27],
                            [8, 33],
                            [9, 40],
                            [10, 32],
                            [11, 35],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Memory usage',
                                viewWindow: {min: 0, max: 100}
                            },
                            legend: "none"
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Monitor);