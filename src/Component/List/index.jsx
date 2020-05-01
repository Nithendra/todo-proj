import React from 'react';

import UserInput from "../UserInput";

import './style.css';

export default class List extends React.Component {

    state = {
        openEditPopup: false,
        todoID: '',
        todo: '',
    };

    render() {
        const { toDoList, deleteTodo } = this.props;
        const { openEditPopup } = this.state;
        return (
            <div>
                <table className="table-container">
                    <tr style={{ borderTop: '1px solid grey' }}>
                        <td className="main-td">{toDoList.todo}</td>
                        <td>
                            <tr>
                                <td>
                                    <span>
                                        <button className="delete-btn"
                                                  onClick={() => deleteTodo(toDoList._id)}>
                                            Delete
                                        </button>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <button className="edit-btn"
                                                onClick={() => this.openEditModalPopup(toDoList)}>
                                            Edit
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        </td>
                    </tr>
                </table>
                {
                    openEditPopup  &&
                    <div className="popup-css">
                        <span className="close-css"
                              onClick={this.closePopup}>
                            x
                        </span>
                        <UserInput userInputCB={this.postTodo}
                                   label="Update"
                                   inputValue={this.state.todo}/>
                    </div>
                }
            </div>
        );
    }

    openEditModalPopup = (todoID) => this.setState({ todo: todoID.todo, todoID: todoID._id, openEditPopup: !this.state.openEditPopup });

    postTodo = (todo) => {
        this.props.editTodo({ id: this.state.todoID, todo });
    }

    closePopup = () => this.setState({ openEditPopup: false });
}