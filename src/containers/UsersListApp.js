import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchUsers } from "../actions/users";
import UsersList from "../components/UsersList";

class UsersListApp extends Component {
  state = {
    showPageLoader: true,
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.props.fetchUsers(3);
  }

  componentDidUpdate(prevProps) {
    const users = this.props.users.users;
    if (prevProps.users.users !== users) {
      this.setState({ loading: false });
      if (users.length !== 0) this.showPageLoader(false);
      if (users.length > 30) this.stopLoadingUsers();
    }
  }

  showPageLoader = loading => {
    this.setState({ showPageLoader: loading });
  };

  loadMoreUsers = () => {
    this.setState({ loading: true });
    this.props.fetchUsers(0);
  };

  stopLoadingUsers = () => {
    this.setState({ hasMore: false });
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    return (
      <UsersList
        loading={this.state.loading}
        hasMore={this.state.hasMore}
        scrollToTop={this.scrollToTop}
        users={this.props.users.users}
        loadMoreUsers={this.loadMoreUsers}
        showPageLoader={this.state.showPageLoader}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: payload => dispatch(fetchUsers(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListApp);

UsersListApp.propTypes = {
  users: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired
};