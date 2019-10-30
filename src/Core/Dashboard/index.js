import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import AppContext from "../../AppContext";
import MaterialTable from "material-table";
import ManageIcon from "@material-ui/icons/OpenInNew";

const styles = theme => ({});

class Dashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.server = context.server;
        this.snack = context.snack;
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
                        {title: 'Status', field: 'status',},
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
                            icon: () => <ManageIcon/>,
                            tooltip: 'Manage',
                            onClick: (_, {name}) => this.props.history.push(`instance/${name}`)
                        }
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
        let instances = [
            {
                name: "instance-one", status: "running",
            },
            {
                name: "instance-two", status: "running",
            },
            {name: "instance-three", status: "running",}
        ];
        setTimeout(() => this.setState({instances}), 2000);
    }
}

Dashboard.contextType = AppContext;

export default withStyles(styles, {withTheme: true})(Dashboard);