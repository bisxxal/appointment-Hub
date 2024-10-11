import { selectDoctor } from "@/actions/server.actions";
import Appintmemts from "@/components/Appintmemts";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const AppoinmentPage = async() => {
    const hospital = await selectDoctor();

    const user = await currentUser();
    const role  = user?.publicMetadata?.role as string; 

    if(role !== 'admin'){
 return (
    <div className=" w-full h-screen px-10 mt-5 max-md:px-2 max-lg:px-4">
          {hospital && <Appintmemts hospital={hospital} />}
    </div>
  )
    }
    else{
      redirect('/admin')
    }
}

export default AppoinmentPage