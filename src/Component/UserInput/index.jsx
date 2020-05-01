import React from 'react';

import './style.css';

export default class UserInput extends React.Component {

    state = {
        todo: '',
        inputValue: '',
    };

    componentDidMount() {
        if (this.props.inputValue) {
            this.setState({ inputValue: this.props.inputValue })
        }
    }

    render() {
        const { inputValue } = this.state;
        const { label } = this.props;
        return(
            <div>
                <input type="text"
                       className="input-div"
                       placeholder="Enter todo"
                       value={inputValue}
                       onChange={(e) => this.userinputOnChange(e)}/>
                       <button className="add-button"
                               onClick={this.AddTodoBtnClick}>
                           {label}
                       </button>
            </div>
        );
    }

    userinputOnChange = e => this.setState({ todo: e.target.value, inputValue: e.target.value });

    AddTodoBtnClick = () => {
        this.props.userInputCB(this.state.todo);
        this.setState({ inputValue: '' })
    };
}