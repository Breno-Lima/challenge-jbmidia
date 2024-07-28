"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Form() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const registerUser = async (e: any) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success('Mensagem de sucesso');
            setTimeout(() => {
                const params = new URLSearchParams();
                params.set('data', JSON.stringify(data));
                router.push(`/login`);
            }, 2000);
        } else {
            toast.error(data.message || 'Ocorreu um erro');
            console.error(data.message);
            return { success: false, message: data.message };
        }

        return { success: true, data };
    };

    return (
        <div className="w-full h-3/4 flex flex-col bg-secondary border-none rounded-md">
            <form method="post" onSubmit={registerUser}>
                <div className='flex flex-col gap-4'>
                    <Input
                        type="text"
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        className="dark"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        className="dark"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        className="dark"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        className="bg-greenbook text-gray-800 shadow-lg text-md shadow-green-600/50 w-full"
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
