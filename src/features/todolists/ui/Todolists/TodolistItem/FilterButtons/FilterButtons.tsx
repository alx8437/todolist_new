import React from 'react';
import {Box, Button} from "@mui/material";
import {TaskFilterType} from "../../../../model/tasks-reducer";
import {changeTodolistFilterAC, TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks";
import {containerSx} from "../../../../../../common/styles";

type FilterButtonsPropsType = {
    todolist: TodolistType
}

const FilterButtons = ({todolist}: FilterButtonsPropsType) => {
    const dispatch = useAppDispatch();
    const {id, filter} = todolist;

    const changeTodolistFilter = (value: TaskFilterType) => {
        const action = changeTodolistFilterAC({id, filter: value});
        dispatch(action)
    }

    return (
        <div>
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeTodolistFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeTodolistFilter("active")}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeTodolistFilter("completed")}>Completed</Button>
            </Box>
        </div>
    );
};

export default FilterButtons;