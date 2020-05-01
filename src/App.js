import React from 'react';
import './App.css';
import TodoList from '../src/Component/List';
import UserInput from '../src/Component/UserInput';

export default class App extends React.Component {

  componentWillMount() {
    this.fetchUserDetails();
  }

  state = {
    todoList: [],
  };

  render() {
    const { todoList } = this.state;
    console.log('todoList===>>>', todoList)
    return (
        <div className="app-container">
          <div>{`Todo(s) : `}</div>
          <div><UserInput userInputCB={this.postTodo} label="Add" /></div>
          {
            todoList.map(itm => <TodoList toDoList={itm}
                                          deleteTodo={this.deleteTodo}
                                          editTodo={this.editTodo} />)
          }
        </div>
    );
  }

  fetchUserDetails = () => {
    fetch('http://localhost:4000/getTodos', { method: 'get' })
        .then(res => res.json())
        .then(res => this.setState({ todoList: res }))
  }

  deleteTodo = (id) => {
    fetch('http://localhost:4000/deleteTodo/' + id,
        { method: 'DELETE' })
        .then(res => console.log('delete response ui===>>>', res))
        .then(this.fetchUserDetails())
  };

  editTodo = (todoMeta) => {
    console.log('edit to do meta=>>>', todoMeta);
    fetch('http://localhost:4000/updateTodo/' + todoMeta.id,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ todo: todoMeta.todo }) })
        .then(res => console.log('update response ui', res))
        .then(this.fetchUserDetails())
  };

  postTodo = todo => {
    fetch('http://localhost:4000/insertTodo',
        { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: todo })})
        .then(data => console.log('post response ui===>>>>', data))
        .then(this.fetchUserDetails())
  }
}

