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
        this.context = context;
        this.state = {
            images: [],
            cpus: [1, 2, 3, 4,],
            memories: [256, 512, 1024, 2048, 4096,],
            formValues: {
                name: "",
                image: "",
                cpu: 1,
                memory: 256,
            },
            processing: false,
        };
    }

    render() {
        const {classes} = this.props;
        const {formValues, images, cpus, memories, processing} = this.state;
        return (
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
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
                                                    {image.image_name} - {image.actual_name}
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
                            <InputLabel htmlFor="memory-simple">Memory in MB</InputLabel>
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
                                disabled={processing}
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
        this.getImages();
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState(oldValues => ({
            ...oldValues,
            formValues: {...oldValues.formValues, [name]: value},
        }));
    };

    createInstance = (instance) => {
        this.setState({processing: true});
        this.context.snack("info", "Creating instance...");
        fetch(`${this.context.server.url}/start_instance/`, {
            mode: this.context.server.mode,
            method: "POST",
            body: JSON.stringify({...instance, username: this.context.username})
        })
            .then(res => {
                this.setState({processing: false});
                if (res.ok)
                    return res.json();
                return res.json().then(({message}) => {
                    throw Error(message)
                })
            })
            .then((result) => {
                this.context.snack("success", "Created!");
                this.props.history.push(`/instance/${result.instance_id}`);
            })
            .catch(err => {
                this.context.snack("error", err.message);
            });
    };

    getImages() {
        fetch(`${this.context.server.url}/list_images/`, {
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
                this.setState({images: result.images});
            })
            .catch(err => {
                this.context.snack("error", err.message);
            });
    }
}

CreateInstance.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(CreateInstance);