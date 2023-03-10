import React from 'react';
import './css/CreateTodoButton.css';

function CreateTodoButton(props) {
    const onClickButton = (msg) => {
        alert(msg);
    }
  return (
    <button className="CreateTodoButton"
    onClick={() => {onClickButton('Create Todo')}}>+</button>
  );
}

export { CreateTodoButton };