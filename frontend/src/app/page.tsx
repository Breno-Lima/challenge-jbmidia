import Image from "next/image";
import todo from "../assets/images/vectortodo.svg";
import { Button, Input } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-greenbook text-3xl mb-4 break-words">
            Se cadastre para gerenciar sua vida do jeito que ela merece
          </h1>
          <Image
            src={todo}
            alt="Ilustração de uma pessoa com várias ideias"
            width={400}
            height={400}
          />
        </div>
        <div className="w-full md:w-1/2 p-5 h-3/4 flex flex-col bg-secondary border-none rounded-md gap-4">
          <Input type="text" label="Username" placeholder="Enter your username" className="dark" />
          <Input type="email" label="Email" placeholder="Enter your email" className="dark" />
          <Input type="password" label="Password" placeholder="Enter your password" className="dark" />
          <Button className="bg-greenbook text-gray-800 shadow-lg text-md shadow-green-600/50">
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}
