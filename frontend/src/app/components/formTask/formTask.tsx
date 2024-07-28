"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Image from 'next/image';
import check from "../../../assets/images/check.svg";

export default function FormTask() {
    const router = useRouter();
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    });

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

            console.log(response);

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
                setTimeout(() => {
                    router.push(`/`);
                }, 2000);
            } else {
                console.error(data ? data.message : 'Unknown error');
                toast.error(data ? data.message : 'Unknown error');
            }
        } catch (error) {
            console.error('Error making request:', error);
            toast.error('Error making request. Please try again.');
        }
    };

    return (
        <div className="flex flex-col w-3/4">

            <div>
                <h1 className="text-greenbook text-3xl"> Lets create your tasks!</h1>
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
            <ToastContainer />
        </div>
    );
}
