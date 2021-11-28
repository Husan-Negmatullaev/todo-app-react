import React, {Component} from 'react';

export default class AddItemList extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
        this.onChangeInput = (value) => {
            const query = value.target.value
            this.setState({
                query
            })
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            const value = this.state.query
            if (value.trim()) {
                this.props.onAddList(value)
                this.setState({
                    query: ''
                })
            }
            else {
                alert('Write something down')
            }
        }
    }
    render() {
        const {query} = this.state
        return (
            <form className="d-flex mt-2"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control mr-2"
                       placeholder="Add item"
                       onChange={this.onChangeInput}
                       value={query}/>
                <button className="btn btn-outline-secondary">Button</button>
            </form>
        );
    }
}