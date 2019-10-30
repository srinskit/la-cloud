import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import React from "react";

function ListItemLink(props) {
    return <ListItem {...props} button component={Link} to={props.to}/>;
}

export default ListItemLink;