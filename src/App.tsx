import { useState } from 'react';
import './App.css';
import { Todolist } from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'RTK Query', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }

        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskId: string) => {
        const filteredTasks  = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks)
    };

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist addTask={addTask} changeFilter={changeFilter} removeTask={removeTask} title="What to learn" tasks={tasksForTodolist}/>
        </div>
    );
}

export default App;
