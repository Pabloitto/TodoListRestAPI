export class TodoService {
    
    private _todos: Array<any>;

    constructor() {
        this._todos = [];
    }

    public postTodo(todo: any) {
        this._todos.push(todo);
        return this._todos;
    }

    public getTodos() {
        return this._todos;
    }

    public deleteTodo(desc:string) {
        this._todos = this._todos.filter(item => item.description !== desc);
        return this._todos;
    }

    public updateTodo(todo:any) {
        let todoToUpdate = this._todos.filter(item => item.description === todo.description)[0];
        todoToUpdate.isDone = todo.isDone;
        return todoToUpdate;
    }
}