'use server'

import { Button, Input, Image } from "@nextui-org/react";
import check from "../../assets/images/check.svg"
export default async function Dashboard() {
    return (
        <main className="bg-primary min-h-screen flex justify-center pt-6 w-full">
            <div className="flex flex-col w-3/4">

                <div>
                    <h1 className="text-greenbook text-3xl">Vamos cadastrar suas atividades!</h1>
                </div>

                <div className="flex justify-center pt-10 w-full">
                    <form className="flex gap-6 w-full">
                        <Input type="text" label="Title" className="dark flex-1" />
                        <Input type="text" label="Description" className="dark flex-1" />
                        <Button
                            className="bg-greenbook text-gray-800 shadow-lg text-md shadow-green-600/50 rounded-full"
                            type="submit"
                        >
                        </Button>
                        <Image src={check} alt="Add" width={24} height={24} />
                    </form>
                </div>
            </div>
        </main>
    );
}
