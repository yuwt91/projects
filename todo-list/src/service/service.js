import store from 'store';
import { observable } from 'mobx';

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

    @observable _todos = new Map();

    @observable filter = 'uncomoleted';

    get todos() {
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

        this.todos.set(todo.key, todo);
        store.set(todo.key, todo);

        let temp = this.todos;
        this._todos = {};
        this._todos = temp;

        return todo;
    }

    setTodoState(key, checked) {
        let todo = this.todos.get(key);
        todo.completed = checked;

        // 同步到LocalStorage
        store.set(key, todo);

        let temp = this.todos;
        this._todos = {};
        this._todos = temp;

    }

    setFilterState(value) {
        this.filter = value;
    }
}




