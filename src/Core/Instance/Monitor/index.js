import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Chart from "react-google-charts";
import Grid from "@material-ui/core/Grid";
import AppContext from "../../../AppContext";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
    root: {
        padding: theme.spacing(1, 0),
    },
});

class Monitor extends Component {
    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.state = {
            cpu_data: [0],
            mem_data: [0],
        };
    }

    render() {
        const {classes} = this.props;
        const {cpu_data, mem_data} = this.state;
        let _cpu_data = [['t', '%']];
        for (let i = 0; i < cpu_data.length; ++i)
            _cpu_data.push([i, cpu_data[i]]);
        let _mem_data = [['t', '%']];
        for (let i = 0; i < mem_data.length; ++i)
            _mem_data.push([i, mem_data[i]]);
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Chart
                            width={'100%'}
                            height={'400px'}
                            chartType="LineChart"
                            loader={<div><LinearProgress/></div>}
                            data={_cpu_data}
                            options={{
                                hAxis: {
                                    title: 'Time in seconds',
                                },
                                vAxis: {
                                    title: 'CPU usage %',
                                    viewWindow: {min: 0, max: 100}
                                },
                                legend: "none",
                                series: {
                                    0: {curveType: 'function'},
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Chart
                            width={'100%'}
                            height={'400px'}
                            chartType="LineChart"
                            loader={<div><LinearProgress/></div>}
                            data={_mem_data}
                            options={{
                                hAxis: {
                                    title: 'Time in seconds',
                                },
                                vAxis: {
                                    title: 'Memory usage %',
                                    viewWindow: {min: 0, max: 100}
                                },
                                legend: "none",
                                series: {
                                    0: {curveType: 'function'},
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        this.timer = setInterval(this.updateChart.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateChartRandom() {
        this.setState(prevState => {
            let old_cpu_data = prevState.cpu_data;
            let cpu_data = old_cpu_data.slice(Number(old_cpu_data.length >= 16));
            cpu_data.push(Math.random() * 100);
            let old_mem_data = prevState.mem_data;
            let mem_data = old_mem_data.slice(Number(old_mem_data.length >= 16));
            mem_data.push(Math.random() * 100);
            return {...prevState, cpu_data, mem_data};
        });
    }

    updateChart() {
        fetch(`${this.context.server.url}/resource_monitor/${this.props.instance.id}`, {
            mode: this.context.server.mode,
            method: "GET",
        })
            .then(res => {
                if (res.ok)
                    return res.json();
                return res.json().then(({message}) => {
                    throw Error(message)
                })
            })
            .then((result) => {
                this.setState(prevState => {
                    let old_cpu_data = prevState.cpu_data;
                    let cpu_data = old_cpu_data.slice(Number(old_cpu_data.length >= 16));
                    cpu_data.push(Number(result.cpu));
                    let old_mem_data = prevState.mem_data;
                    let mem_data = old_mem_data.slice(Number(old_mem_data.length >= 16));
                    mem_data.push(Number(result.memory));
                    return {...prevState, cpu_data, mem_data};
                });
            })
            .catch(err => {
                this.context.snack("error", err.message);
            });
    }
}

Monitor.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Monitor);