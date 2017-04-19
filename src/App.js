import React, { Component } from 'react';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import uuid from 'uuid';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showAddUserForm : false,
          isEditMode : false,
          editUserData:{},
          users : []
        }
    }

    componentWillMount(){
        this.getUsers();
    }

    getUsers(){
        this.setState({users: [
          {
            id:uuid.v4(),
            e_name: 'Joe',
            e_email: 'joe.loise@yahoo.in',
            e_phone: '8155940980',
            e_department: 'IT'
          },
          {
            id:uuid.v4(),
            e_name: 'Steve',
            e_email: 'stevedevis@gmail.com',
            e_phone: '9898989696',
            e_department: 'Marketting'
          }

        ]});
      }

      showAddUserForm() {
        this.setState({ showAddUserForm: true });
      }
      addUser(user) {
        let users = this.state.users;
        users.push(user);
        this.setState({users:users});
        this.setState({isEditMode: false});
        this.setState({ showAddUserForm:false});
      }

      deleteUser(id){
        let users = this.state.users;
        let index = users.findIndex(x => x.id === id);
        users.splice(index, 1);
        this.setState({users:users});
      }

      editUserAction(id){
        let users = this.state.users;
        let index = users.findIndex(x => x.id === id);
        this.setState({editUserData:users[index]});
        this.setState({isEditMode: true});



      }

      editUser(user,id) {
        let users = this.state.users;
        let index = users.findIndex(x => x.id === id);
        users[index] = user;
        this.setState({users:users});
        this.setState({isEditMode: false});
        this.setState({ showAddUserForm:false});
      }

      render() {

              return (

<div className="App">
	<div className="container">
		<button type="button" onClick={this.showAddUserForm.bind(this)} className="btn btn-primary" style={{margin:20 + 'px', float:'right'}}>Add User</button>
                      { this.state.showAddUserForm === true ?
		<AddUser addUser={this.addUser.bind(this)}  /> : null }
                      { this.state.isEditMode === true ?
		<EditUser editUser={this.editUser.bind(this)} user={this.state.editUserData} /> : null }

		<Users users={this.state.users} onDelete={this.deleteUser.bind(this)} onEdit={this.editUserAction.bind(this)} />
	</div>
</div>

          );
      }
}

export default App;
