import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: 'Terminator', isDone: false},
        {id: 2, title: 'XXX', isDone: true},
        {id: 2, title: 'American Pie', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Movies" tasks={tasks2}/>
        </div>
    );
}

export default App;
