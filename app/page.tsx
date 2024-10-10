import { selectDoctor } from "@/actions/server.actions";
import Appintmemts from "@/components/Appintmemts";
import Image from "next/image";

export default async function Home() {
  const hospital = await selectDoctor();
  // console.log(hospital);
  
  return (
    <main className=" w-1/2 mx-auto bg-">
      {hospital && <Appintmemts hospital={hospital} />}
    </main>
  );
}
