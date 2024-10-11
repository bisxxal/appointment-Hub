"use client";

import { createdAppointment, findDoctor, findSpecialization } from "@/actions/server.actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Appointments({ hospital,}: {hospital: { id: string; name: string }[];}) {
  const [hospitalId, setHospitalId] = useState<string | undefined>(hospital[0]?.id || undefined);
  
  const [special, setSpecial] = useState<any>([]);

  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string
  
  const router = useRouter();
  useEffect(() => { 

    const fetchDoctors = async () => { 
      if (hospitalId ) {
        const res:any = await findSpecialization(hospitalId);
        setSpecial(res); 
      }
    };
    fetchDoctors();
  }, [hospitalId]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const hospitalId = formData.get("hospital") as string;
    const doctorId = formData.get("doctor") as string;
    const res = await createdAppointment({ doctorId, hospitalId ,userId });
    if(res.success === true){
      router.push(`success?appId=${res.id}`)
    }
    
  };

  return (
    <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
    <div>
      <h1>Select Hospital</h1>
      <select
      required
        onChange={(e) => setHospitalId(e.target.value)}
        className="bg-transparent footer inshadow border-y-0 w-60 border-2 border-[#ffffff31] rounded-lg p-2 px-3"
        name="hospital"
        value={hospitalId}
      >
        {hospital.map(({ id, name }) => (
          <option className=" bg-[#0f0a13]" key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>

      <div>
        <h1>Select Disease</h1>
        <select required className="bg-transparent footer inshadow border-y-0 w-60 border-2 border-[#ffffff2b] rounded-lg p-2 px-3" name="spcial">
          {
            special && special.map((item:any)=>{
              return <option className=" bg-[#0f0a13]" key={item.id} value={item.id}>{item.name}</option>
            })
          }
      </select>
      </div>

      <div>
        <h1>Select doctor</h1>
      <select required className="bg-transparent footer inshadow border-y-0 w-60 border-2 border-[#ffffff31] rounded-lg p-2 px-3" name="doctor">
      {
        !special && !hospitalId && <option className=" bg-[#0f0a13]" value="">Select a doctor</option>
      }
        {special && hospitalId && (
          special.flatMap((item: { doctor: { id: string; name: string }[] }) => item?.doctor || [])
            .filter((doc: { id: string }, index: number, self: { id: string }[]) =>
              index === self.findIndex((d: { id: string }) => d.id === doc.id) 
            )
            .map((doc: { id: string; name: string  ,specialization :string}) => (
              <option className=" bg-[#0f0a13]"  key={doc.id} value={doc.id}>{doc.name} ({doc.specialization} )</option>
            ))
        )} 
      </select>
      </div>
 
      <button className=" bg-blue-500 px-4 py-1 w-fit rounded-lg" type="submit">Create Appointment</button>
    </form>
  );
}

export default Appointments;
