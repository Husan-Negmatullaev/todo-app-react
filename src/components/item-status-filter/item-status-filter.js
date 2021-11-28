import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  buttons = [
      {name: 'all', label: 'All'},
      {name: 'active', label: 'Active'},
      {name: 'done', label: 'Done'},
  ]
  render() {
      const {status, onStatusChange} = this.props
      const button = this.buttons.map(({label, name}) => {
          const isActive = status === name ? 'btn btn-info' : 'btn btn-outline-secondary'
          return (
              <button key={name}
                      type="button"
                      onClick={() => onStatusChange(name)}
                      className={isActive}>
                  {label}
              </button>
          )
      })
      return (
          <div className="btn-group">
              {button}
          </div>
      );
  }
};
