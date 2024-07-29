"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Form({ isLogin }: { isLogin: boolean }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const url = isLogin
            ? `${process.env.NEXT_PUBLIC_API_URL}/users/login`
            : `${process.env.NEXT_PUBLIC_API_URL}/users`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                console.error('Erro ao analisar a resposta JSON:', error);
                data = null;
            }

            if (!isLogin) {
                localStorage.setItem('username', formData.username);
            }
            if (response.ok) {
                toast.success(isLogin ? 'Login realizado com sucesso' : 'Cadastro realizado com sucesso');
                setTimeout(() => {
                    router.push(isLogin ? `/dashboard` : `/login`);
                }, 2000);
            } else {
                console.error(data ? data.message : 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            toast.error('Erro ao fazer a requisição. Por favor, tente novamente.');
        }
    };

    return (
        <div className="w-full h-3/4 flex flex-col bg-secondary border-none rounded-md">
            <form method="post" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 '>
                    {!isLogin && (
                        <Input
                            type="text"
                            label="Username"
                            name="username"
                            placeholder="Enter your username"
                            className="dark"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    )}
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
                        {isLogin ? 'Entrar' : 'Registrar'}
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
