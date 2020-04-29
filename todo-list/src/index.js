import React from 'react';
import ReactDom from 'react-dom';

import Create from './component/Create';
import TodoService from './sevice/service';
import Todo from'./component/Todo';
import Filter from'./component/Filter';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.service = new TodoService();
    this.state = {todos:this.service.todos, filter:'uncompleted'}
  }

  handleCreate(event) {
    // console.log('eventtargetvalue=', event.target.value);
    this.service.create(event.target.value);
    this.setState({todos: this.service.todos});
  }

  handleCheckdChange(event,key) {
    this.service.setTodoState(key, event.target.checked);
    this.setState({todos: this.service.todos});
  }


  handleCondChange(value){
    this.setState({filter:value});
  }

  render(){
    return (
      <div>
        <Create onCreate={this.handleCreate.bind(this)} />
        <Filter onChange={this.handleCondChange.bind(this)}/>
        <hr />
        {/*每条todo的显示*/}

        {[...this.service.todos.values()]
        .filter(item => {
          let fs = this.state.filter;
          if (fs === 'all') {
            return true;
          } else if (fs === 'completed') {
            if (item.completed === true) return true;
            else return false;
          } else if (fs === 'uncompleted') {
            if (item.completed === false) return true;
            else return false;
          }   
        })
        .map(item => <Todo onChange={this.handleCheckdChange.bind(this)} key={item.key} todo={item} />)}
      </div>);
  }
}

ReactDom.render(<Root />, document.getElementById('root'));