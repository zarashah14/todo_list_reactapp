import { keyboard } from '@testing-library/user-event/dist/keyboard';
import './App.css';
import {useState, useRef} from 'react';

function App() {

    const [todoList, setTodoList] = useState([]);
    const [currentTask, setCurrentTask] = useState("");

    const  inputTask = useRef(null)

    const addTask = () =>{
      setTodoList([...todoList, {task: currentTask, completed: false}]);
      inputTask.current.value ="";
      setCurrentTask("");
    };
    const deleteTask = (TaskTodoDelete)=>{
       setTodoList(todoList.filter((task)=>{
       return  task.task !== TaskTodoDelete
       
      }))

    };
   
    const completeTask = (taskToComplete)=>{
      setTodoList(
      todoList.map((task)=>{
      return  task.task == taskToComplete 
      ? {task: taskToComplete, completed: true}
      : {task: task.task, completed: task.completed ? true:false};
     })
     );

   };


  return (
    <div className="App">
       <h1>Todo List</h1>
       <div>
       <input 
       ref ={inputTask}
       type="text" 
       placeholder='Task...' 
       onKeyDownCapture={(event)=>{if (event.keyCode == 13) addTask();
      
      }}
       onChange={(event)=>{
       setCurrentTask(event.target.value);
        }}
        />
         
       <button onClick={addTask}> Add Task</button>
            <hr />
            <ul>
              {todoList.map((val, key)=>{
                return (
                  <div id="task"> 
                  <li key={key}> {val.task}</li>
                  <button onClick={()=> completeTask(val.task)}>Complete</button>

                  <button onClick={()=> deleteTask(val.task)}>x</button>
                  {val.completed? 
                  <h1>Task Completed</h1>:<h1>Task Not Competed</h1>}
                  
                  </div>
                );
              })}
            </ul>
       </div>
    </div>
  );
} 

export default App;
