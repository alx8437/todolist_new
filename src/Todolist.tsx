import React from "react";

export function Todolist() {
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input type="text"/>
                <button>+</button>
                <ul>
                    <li><input type="checkbox" checked={true}/>
                        <span>CSS</span>
                    </li>
                    <li><input type="checkbox" checked={true}/>
                        <span>HTML</span>
                    </li>
                    <li><input type="checkbox" checked={false}/>
                        <span>REACT</span>
                    </li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}