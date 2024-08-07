'use server'
import Image from "next/image";
import todo from "../assets/images/vectortodo.svg";
import { Button, Input } from "@nextui-org/react";
import Link from 'next/link'
import Form from "./components/form/form";


export default async function Home() {
  return (
    <main className="bg-primary min-h-screen flex justify-center items-center md:p-0 p-4">
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
        <div className="w-full md:w-1/2 p-5 h-3/4 flex flex-col bg-secondary border-none rounded-md">
          <p className="flex justify-end mr-4 pb-2 text-greebook">Já tem uma conta? <Link href="/login" className="ml-2 text-blue-200">Conecte-se</Link></p>
          <Form isLogin={false} />
        </div>
      </div>
    </main>
  );
}
