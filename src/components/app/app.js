import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'
import './app.css';

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ]
  }

  createTodoItem(label) {
    return {
      label,
      importnant: false,
      done: false,
      id: this.maxId++
    }
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newData = [
        ...todoData, newItem
      ]

      return {
        todoData: newData
      }
    })
  }


  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id)

      const newData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]

      return {
        todoData: newData
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  render() {
    const { todoData } = this.state
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};