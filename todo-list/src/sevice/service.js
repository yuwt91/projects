import store from 'store';

export default class TodoService {
    constructor(){

        this.load();

    }
    // 从 LocalStorage 中读取数据
    load(){
        store.each((value, key) => {
            if (key.startsWith(TodoService.NAMESPACE))
                this.todos.set(key, value);
        });
    }

    static NAMESPACE = "todo::"; // prefix + str = key 给 key 名称加前缀
    
    todos = new Map();

    create(title) { // title 是代办内容，由用户创建并提交, 字符串
        
        const todo = { // 代办字段：时间戳，内容，完成与否
            key: TodoService.NAMESPACE + (new Date()).valueOf(),
            title: title,
            completed: false
        };

        this.todos.set(todo.key, todo);
        store.set(todo.key, todo);

        return todo;
    }

    setTodoState(key, checked) {
        let todo = this.todos.get(key);
        todo.completed = checked;
        
        // 同步到LocalStorage
        store.set(key, todo);

    }

}




