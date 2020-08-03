import React from 'react';

class Users extends React.Component {
    state = {
        users: {
            1: { name: 'Wendy Kinsella', email: 'wkinsella@fortsask.ca' },
            2: { name: 'Leo Orutia', email: 'lorutia@fortsask.ca' },
        },
    };
    renderUser (userID) {
        const user = this.state.users[userID];
        return (
            <div className="list-group-item list-group-item-action" key={ userID }>
                { user.name } ({ user.email })
                <form class="form-inline">
                    <div className="form-group">
                        <input type="text" name="name" value={ user.name } className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" value={ user.email} className="form-control" />
                    </div>
                    <input type="submit" value="Update" className="btn btn-primary" />
                </form>
            </div>
        );
    };
    render () {
        return (
            <>
                <h2>Manage Users</h2>
                <p>Create and manage administrator accounts.</p>
                <div className="list-group">
                    { Object.keys(this.state.users).map(userID => this.renderUser(userID)) }
                    <div className="list-group-item list-group-item-action">
                        + New User
                    </div>
                </div>
            </>
        );
    };
}

export default Users;
