import { useState } from 'react';
import './App.css';
import { Todolist } from "./Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'TypeScript', isDone: false},
        {id: 6, title: 'RTK Query', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (taskId: number) => {
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
            <Todolist changeFilter={changeFilter} removeTask={removeTask} title="What to learn" tasks={tasksForTodolist}/>
        </div>
    );
}

export default App;
