import React, { useState } from 'react';
import Swal from 'sweetalert2';
const TodoList = () => {
    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { name, status };
        setTasks([...tasks, newTask]);
        setName('');
        setStatus('');
        Swal.fire(
            'Task Added!',
            'Your task has been successfully added.',
            'success'
        );
    };

    const handleCheckboxChange = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status = 'completed';
        setTasks(updatedTasks);
    };

    const filterTasks = () => {
        if (show === 'all') {
            return tasks;
        } else {
            return tasks.filter(task => task.status === show);
        }
    };

    const sortedTasks = filterTasks().sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') {
            return 1;
        } else {
            return 0;
        }
    });

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTasks = [...tasks];
                updatedTasks.splice(index, 1);
                setTasks(updatedTasks);
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        });
    };

    const handleClearAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to clear all tasks!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, clear all!'
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks([]);
                Swal.fire(
                    'Cleared!',
                    'All tasks have been cleared.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Task </h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => setShow('all')}>All</button>
                                </li>

                                <li className="nav-item">
                                    <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => setShow('completed')}>Completed</button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button className='btn btn-outline-danger' onClick={handleClearAll}>Clear All </button>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td> <input type="checkbox" name="complete" checked={task.status === 'completed'} onChange={() => handleCheckboxChange(index)} /> </td>
                                    <td> <button onClick={() => handleDelete(index)} className='btn btn-danger'>Delete</button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
