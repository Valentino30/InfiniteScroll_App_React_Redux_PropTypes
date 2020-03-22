import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import InfiniteScroll from "react-infinite-scroller";
import PulseLoader from "react-spinners/PulseLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

export default class UsersList extends Component {
  renderPageLoader() {
    return (
      <BounceLoader
        size={40}
        color={"#60D8B8"}
        loading={this.props.showPageLoader}
        css={{ margin: "auto", top: "calc(40vh)" }}
      />
    );
  }

  renderListLoader() {
    return (
      <div className="loader" key={0}>
        <PulseLoader
          size={5}
          color={"#60D8B8"}
          css={{ marginTop: "20px", marginBottom: "20px" }}
        />
      </div>
    );
  }

  renderUsers() {
    return this.props.users.map(user => (
      <ListItem key={uuid()} button>
        <ListItemAvatar>
          <Avatar>{user.first_name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          id={user.id}
          primary={`${user.first_name} ${user.last_name}`}
          secondary={user.email}
        />
      </ListItem>
    ));
  }

  renderUsersList() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.props.loadMoreUsers}
        hasMore={this.props.hasMore && !this.props.loading}
      >
        {this.renderUsers()}
        {this.props.loading ? this.renderListLoader() : null}
        {this.props.hasMore ? null : this.renderEndMessage()}
      </InfiniteScroll>
    );
  }

  renderEndMessage() {
    return (
      <Fab
        size="small"
        onClick={this.props.scrollToTop}
        style={{ margin: "20px", color: "#FFFFFF", backgroundColor: "#60D8B8" }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    );
  }

  render() {
    return (
      <Container style={{ width: "300px", marginTop: "70px" }}>
        {this.props.showPageLoader
          ? this.renderPageLoader()
          : this.renderUsersList()}
      </Container>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  scrollToTop: PropTypes.func.isRequired,
  loadMoreUsers: PropTypes.func.isRequired,
  showPageLoader: PropTypes.bool.isRequired
};
