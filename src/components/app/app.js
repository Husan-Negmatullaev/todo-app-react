import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemList from '../add-item-list'

import './app.css';

export default class App extends Component {
    maxId = 100

    state = {
        todoData: [
            this.createTodos('Drink Coffee'),
            this.createTodos('Make Awesome App'),
            this.createTodos('Have a lunch'),
        ],
        term: '',
        status: 'all' // all, active, done
    }

    createTodos(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    onDeleteItem = (id) => {
        // const filterData = this.state.todoData.filter(el => el.id !== id)
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id)

            const before = todoData.slice(0, idx)
            const after = todoData.slice(idx + 1)

            return {
                todoData: [...before, ...after]
            }
        })
    }

    onAddList = (value) => {
        this.setState(({todoData}) => {
            const item = this.createTodos(value)
            return {
                todoData: [...todoData, item]
            }
        })
    }

    toggleOptions(data, id, option) {
        const idx = data.findIndex(el => el.id === id)

        const oldItem = data[idx]
        const newItem = {...oldItem, [option]: !oldItem[option]}
        const newArr = [
            ...data.slice(0, idx),
            newItem,
            ...data.slice(idx + 1)
        ]
        return {
            todoData: [...newArr]
        }
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return this.toggleOptions(todoData, id, 'important')
        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return this.toggleOptions(todoData, id, 'done')
        })
    }

    onSearchInput = (term) => {
        this.setState({term})
    }

    search(data, term) {
        if (!term) {
            return data
        }
        return data.filter(item => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onStatusChange = (status) => {
        this.setState({status})
    }

    status(data, option) {
        switch (option) {
            case 'all':
                return data
            case 'done':
                return data.filter(el => el.done)
            case 'active':
                return data.filter(el => !el.done)
            default:
                return data
        }
    }

    render() {
        const {todoData, term, status} = this.state
        const countDone = todoData.filter(el => el.done).length
        const countTodo = todoData.length - countDone

        const statusTodo = this.status(this.search(todoData, term), status)
        return (
            <div className="todo-app">
                <AppHeader toDo={countTodo} done={countDone} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearchInput} />
                    <ItemStatusFilter onStatusChange={this.onStatusChange} status={status} />
                </div>

                <TodoList todos={statusTodo}
                          onDeleteItem={this.onDeleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}
                />

                <AddItemList onAddList={this.onAddList} />
            </div>
        );
    }
}