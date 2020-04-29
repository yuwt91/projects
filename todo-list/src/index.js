import React from 'react';
import ReactDom from 'react-dom';
import TodoApp from './component/TodoApp';
import TodoService from './service/service';

const service = new TodoService();

ReactDom.render(<TodoApp service={service} />, document.getElementById('root'));