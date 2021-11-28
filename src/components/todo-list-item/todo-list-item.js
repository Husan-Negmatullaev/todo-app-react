import React, {Component} from 'react';

import './todo-list-item.css';

class TodoListItem extends Component {
    render() {
        const { label, important, done, onDelete, onToggleImportant, onToggleDone } = this.props
        const style = {
            color: important ? 'steelblue' : 'black',
            fontWeight: important ? 'bold' : 'normal',
            textDecoration: done ? 'line-through' : 'none'
        };
        return (
        <span className="todo-list-item">
          <span
              className="todo-list-item-label"
              style={style}
              onClick={onToggleDone}
          >
            {label}
          </span>

          <button type="button"
                  className="btn btn-outline-success btn-sm float-right"
                  onClick={onToggleImportant}>
            <i className="fa fa-exclamation" />
          </button>

          <button type="button"
                  className="btn btn-outline-danger btn-sm float-right"
                  onClick={onDelete}>
            <i className="fa fa-trash-o" />
          </button>
        </span>
        );
    }
};

export default TodoListItem;
