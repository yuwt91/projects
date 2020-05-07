import store from 'store';
import { observable,computed } from 'mobx';
import Axios from 'axios';

export default class TodoService {
    constructor() {
        this.load();
    }
    // 从 LocalStorage 中读取数据
    load() {
        store.each((value, key) => {
            if (key.startsWith(TodoService.NAMESPACE))
                this._todos.set(key, value);
        });
    }

    static NAMESPACE = "todo::"; // prefix + str = key 给 key 名称加前缀
    static STATES = {
        all: 'all',
        completed:'completed',
        uncompleted:'uncompleted',
    }

    @observable _todos = new Map();

    @observable filter = TodoService.STATES.uncompleted;

    @computed get todos() {
        return [...this._todos.values()]
            .filter(item => {
                let fs = this.filter;
                if (fs === 'all') {
                    return true;
                } else if (fs === 'completed') {
                    if (item.completed === true) return true;
                    else return false;
                } else if (fs === 'uncompleted') {
                    if (item.completed === false) return true;
                    else return false;
                }
            });
    }

    create(title) { // title 是代办内容，由用户创建并提交, 字符串

        const todo = { // 代办字段：时间戳，内容，完成与否
            key: TodoService.NAMESPACE + (new Date()).valueOf(),
            title: title,
            completed: false
        };

        this._todos.set(todo.key, todo);
        store.set(todo.key, todo); // 访问数据库 =》 web 服务器 =》 http

        let temp = this._todos;
        this._todos = {};
        this._todos = temp;

        return todo;
    }

    cc (title) {
        const todo = { // 代办字段：时间戳，内容，完成与否
            key: TodoService.NAMESPACE + (new Date()).valueOf(),
            title: title,
            completed: false
        };

        // url + method => restful
        // post => add; put => modify
        
        axios.post('/api/todo', todo)
        .then(function(response){
            console.log(response)
        })
        
    }

    setTodoState(key, checked) {
        let todo = this._todos.get(key);
        todo.completed = checked;

        // 同步到LocalStorage
        store.set(key, todo);

        let temp = this._todos;
        this._todos = {};
        this._todos = temp;

    }

    setFilterState(value) {
        this.filter = TodoService.STATES[value];
    }
}




