import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";
import MaterialTable from "material-table";
import ManageIcon from "@material-ui/icons/OpenInNew";
import CopyIcon from "@material-ui/icons/FileCopy";

const styles = theme => ({});

class Dashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.context = context;
        this.state = {
            instances: null,
        }
    }

    render() {
        const {instances} = this.state;
        return (
            <div>
                <MaterialTable
                    columns={[
                        {title: 'Name', field: 'name',},
                        {
                            title: 'Status', field: 'status',
                            lookup: {CR: "created", RU: "running", SP: "stopped"},
                        },
                        {title: 'IP', field: 'IP',},
                        {title: 'SSH Port', field: 'ssh_port',},
                    ]}
                    isLoading={instances == null}
                    actions={[
                        {
                            icon: 'refresh',
                            tooltip: 'Refresh instances',
                            isFreeAction: true,
                            onClick: () => this.getInstances()
                        },
                        {
                            icon: 'add',
                            tooltip: 'Create instance',
                            isFreeAction: true,
                            onClick: () => this.props.history.push("/new")
                        },
                        {
                            icon: () => <CopyIcon/>,
                            tooltip: 'Copy SSH info',
                            onClick: (_, {IP, ssh_port}) => this.saveToClipboard(`${IP}:${ssh_port}`)
                        },
                        {
                            icon: () => <ManageIcon/>,
                            tooltip: 'Manage',
                            onClick: (_, {id}) => this.props.history.push(`instance/${id}`)
                        },
                    ]}
                    options={{
                        showFirstLastPageButtons: false,
                        actionsColumnIndex: -1,
                        showTitle: false,
                        searchFieldAlignment: "left",
                        paging: false,
                    }}
                    localization={{
                        body: {emptyDataSourceMessage: "No instances"}
                    }}
                    data={instances || []}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getInstances();
    }

    getInstances() {
        this.setState({instances: null});
        fetch(`${this.context.server.url}/list_instances/${this.context.username}`, {
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
                this.setState({instances: result.instances});
            })
            .catch(err => {
                this.context.snack("error", err.message);
            });
    }

    saveToClipboard(content) {
        navigator.clipboard.writeText(content);
        this.context.snack("success", "Copied");
    }
}

Dashboard.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Dashboard);