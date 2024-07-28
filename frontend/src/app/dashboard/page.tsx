'use server'

import FormTask from "../components/formTask/formTask";



export default async function Dashboard() {

    const response = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'Title',
            description: 'Description',
        }),
    });

    return (
        <main className="bg-primary min-h-screen flex justify-center pt-6 w-full">
            <FormTask />
        </main>
    );
}
