'use client';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever mainTask changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, completed: false }]);
    setTitle('');
    setDesc('');
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const toggleComplete = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].completed = !copyTask[i].completed;
    setMainTask(copyTask);
  };

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>
        Suraj's Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 text-black m-5 px-4 py-2 '
          placeholder='Enter Your task here'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 text-black m-5 px-4 py-2 '
          placeholder='Enter Description here'
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className='bg-black m-8 px-4 py-2 rounded font-bold text-white'>
          Add Task
        </button>
      </form>
      <hr />
      <div className='p-8 bg-slate-200 '>
      {mainTask.length === 0 ? (
          <h2 className="text-center text-xl">No Task Available</h2>
        ) : (
        <ul>
          {mainTask.map((task, i) => (
            <li
              key={i}
              className={`flex items-center justify-between mb-5 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              <div className='flex justify-between mb-5 w-2/3'>
                <h5 className='text-2xl font-semibold'>{task.title}</h5>
                <h6 className='text-lg font-medium'>{task.desc}</h6>
              </div>
              <button
                onClick={() => toggleComplete(i)}
                className={`${
                  task.completed ? 'bg-green-400' : 'bg-yellow-400'
                } text-white px-4 py-2 rounded font-bold mr-2`}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteHandler(i)}
                className='bg-red-400 text-white px-4 py-2 rounded font-bold'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        )}
      </div>
    </>
  );
};

export default Page;

