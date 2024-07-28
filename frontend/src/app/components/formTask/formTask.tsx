"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Image from 'next/image';
import check from "../../../assets/images/check.svg";
import trash from "../../../assets/images/trash.svg";

interface Task {
    id: string;
    title: string;
    description: string;
}

export default function FormTask() {
    const router = useRouter();
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    });
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const url = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
                credentials: 'include',
            });

            let data;
            try {
                if (response.headers.get('Content-Length') !== '0') {
                    data = await response.json();
                } else {
                    data = null;
                }
            } catch (error) {
                console.error('Error parsing JSON response:', error);
                data = null;
            }

            if (response.ok) {
                toast.success('Task created successfully');
                fetchTasks();
                setTaskData({ title: '', description: '' });
            } else {
                console.error(data ? data.message : 'Unknown error');
                toast.error(data ? data.message : 'Unknown error');
            }
        } catch (error) {
            console.error('Error making request:', error);
            toast.error('Error making request. Please try again.');
        }
    };

    const fetchTasks = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            let data: Task[];
            try {
                if (response.headers.get('Content-Length') !== '0') {
                    data = await response.json();
                } else {
                    data = [];
                }
            } catch (error) {
                console.error('Error parsing JSON response:', error);
                data = [];
            }

            if (response.ok) {
                setTasks(data);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id: string) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Task deleted successfully');
                fetchTasks();
            } else {
                let data;
                try {
                    if (response.headers.get('Content-Length') !== '0') {
                        data = await response.json();
                    } else {
                        data = { message: 'Unknown error' };
                    }
                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                    data = { message: 'Unknown error' };
                }
                console.error(data.message);
                toast.error(data.message || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Error deleting task. Please try again.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="flex flex-col w-3/4">
            <div>
                <h1 className="text-greenbook text-3xl">Lets create your tasks!</h1>
            </div>

            <div className="flex justify-center pt-10 w-full">
                <form className="flex gap-6 w-full items-center" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Title"
                        name="title"
                        className="dark flex-1"
                        value={taskData.title}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        label="Description"
                        name="description"
                        className="dark flex-1"
                        value={taskData.description}
                        onChange={handleChange}
                    />
                    <Button
                        className="bg-greenbook text-gray-800 shadow-lg text-md shadow-green-600/50 rounded-full flex items-center justify-center"
                        type="submit"
                    >
                        <Image src={check} alt="Add" width={24} height={24} />
                    </Button>
                </form>
            </div>

            <div className="w-full mt-10">
                <h2 className="text-greenbook text-2xl mb-4">Your Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className="text-white p-4 mb-2 rounded-md">
                            <div className='rounded-md bg-secondary p-4 flex justify-between items-center'>
                                <div>
                                    <h3 className="text-xl text-black">Title: {task.title}</h3>
                                    <p className='text-black'>Description: {task.description}</p>
                                </div>
                                <Button
                                    className="bg-red-500 text-gray-800 shadow-lg text-md shadow-red-600/50 rounded-full flex items-center justify-center"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    <Image src={trash} alt="Delete" width={24} height={24} />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <ToastContainer />
        </div>
    );
}
