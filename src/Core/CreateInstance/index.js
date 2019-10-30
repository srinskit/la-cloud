import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
});

class CreateInstance extends Component {
    constructor(props, context) {
        super(props, context);
        this.server = context.server;
        this.snack = context.snack;
        this.state = {
            images: [
                {id: 0, name: "Ubuntu 18.04", description: "This is Ubuntu 18.04"},
                {id: 1, name: "Ubuntu 19.04", description: "This is Ubuntu 19.04"},
            ],
            cpus: [
                1, 2, 3, 4, 5, 6, 7, 8
            ],
            memories: [1, 2, 3, 4],
            formValues: {
                name: "",
                image: "",
                cpu: "",
                memory: "",
            },
        }
    }

    render() {
        const {classes} = this.props;
        const {formValues, images, cpus, memories} = this.state;
        return (
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name={"name"}
                            type={"text"}
                            label={"Instance name"}
                            value={formValues.name}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="image-simple">Image</InputLabel>
                            <Select
                                value={formValues.image}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'image',
                                    id: 'image-simple',
                                }}
                            >
                                {
                                    images.map((image, i) => (
                                        <MenuItem value={image.id} key={i}>
                                            <div>
                                                <Typography variant={"h6"}>
                                                    {image.name}
                                                </Typography>
                                                <Typography variant={"body2"}>
                                                    {image.description}
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="cpu-simple">CPU</InputLabel>
                            <Select
                                value={formValues.cpu}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'cpu',
                                    id: 'cpu-simple',
                                }}
                            >
                                {
                                    cpus.map((cpu, i) => (
                                        <MenuItem value={cpu} key={i}>
                                            {cpu}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="memory-simple">Memory</InputLabel>
                            <Select
                                value={formValues.memory}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'memory',
                                    id: 'memory-simple',
                                }}
                            >
                                {
                                    memories.map((memory, i) => (
                                        <MenuItem value={memory} key={i}>
                                            {memory}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} dir={"rtl"}>
                        <Button variant={"contained"} color={"primary"}
                                onClick={() => this.createInstance(formValues)}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
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

    createInstance(val) {
        console.log(val);
    }
}

CreateInstance.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(CreateInstance);