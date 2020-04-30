import React from 'react';
import {observer} from 'mobx-react';

import Create from './Create';
import Todo from'./Todo';
import Filter from'./Filter';

@observer
export default class Root extends React.Component {
  constructor(props) {
    super(props);
    // this.service = new TodoService();
    // this.state = {filter:'uncompleted'}
  }

  handleCreate(event) {
    // console.log('eventtargetvalue=', event.target.value);
    this.props.service.create(event.target.value);
    //this.setState({todos: this.service.todos});
  }

  handleCheckdChange(event,key) {
    this.props.service.setTodoState(key, event.target.checked);
    //this.setState({todos: this.service.todos});
  }

  handleCondChange(value){
    this.props.service.setFilterState(value);
  }

  render(){
    return (
      <div>
        <Create onCreate={this.handleCreate.bind(this)} />
        <Filter onChange={this.handleCondChange.bind(this)}/>
        <hr />

        {this.props.service.todos.map(item => <Todo onChange={this.handleCheckdChange.bind(this)} key={item.key} todo={item} />)}
      </div>);
  }
}