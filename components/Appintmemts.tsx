"use client";

import { createdAppointment, findDoctor, findSpecialization } from "@/actions/server.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

 

function Appointments({
  hospital,
}: {
  hospital: { id: string; name: string }[];
}) {
  const [hospitalId, setHospitalId] = useState<string | undefined>(
    hospital[0]?.id || undefined
  );
  const [doctors, setDoctors] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const [special, setSpecial] = useState<any>(
    []
  );
  const router = useRouter();
  useEffect(() => {
    // console.log(hospitalId);

    const fetchDoctors = async () => {
      // if (hospitalId && special) {
      //   const res:any = await findDoctor(hospitalId);
      //   setDoctors(res);
      //   // console.log(doctors);
      // }
      if (hospitalId ) {
        const res:any = await findSpecialization(hospitalId);
        setSpecial(res);
        // console.log(res);
      }
    };
    fetchDoctors();
  }, [hospitalId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const hospitalId = formData.get("hospital");
    const doctorId = formData.get("doctor");
    const res = await createdAppointment({ doctorId, hospitalId });

    if(res.success === true){
      router.push(`success?appId=${res.id}`)
    }
    
    console.log(doctorId, hospitalId);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
      required
        onChange={(e) => setHospitalId(e.target.value)}
        className="bg-transparent footer border-2 border-[#ffffff31] rounded-lg p-2 px-3"
        name="hospital"
        value={hospitalId}
      >
        {hospital.map(({ id, name }) => (
          <option className=" bg-[#0f0a13]" key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select required className="bg-transparent footer border-2 border-[#ffffff31] rounded-lg p-2 px-3" name="spcial">
          {
            special && special.map((item:any)=>{
              return <option className=" bg-[#0f0a13]" key={item.id} value={item.id}>{item.name}</option>
            })
          }
      </select>
  
   
  <select required className="bg-transparent footer border-2 border-[#ffffff31] rounded-lg p-2 px-3" name="doctor">
    {
      !special && !hospitalId && <option className=" bg-[#0f0a13]" value="">Select a doctor</option>
    }
  {special && hospitalId && (
    special.flatMap((item: { doctor: { id: string; name: string }[] }) => item?.doctor || [])
      .filter((doc: { id: string }, index: number, self: { id: string }[]) =>
        index === self.findIndex((d: { id: string }) => d.id === doc.id) 
      )
      .map((doc: { id: string; name: string }) => (
        <option className=" bg-[#0f0a13]"  key={doc.id} value={doc.id}>{doc.name}</option>
      ))
  )}
  {/* {special && hospitalId && (
    special.flatMap(item => item?.doctor || [])
      .filter((doc, index, self) =>
        index === self.findIndex(d => d.id === doc.id) 
      )
      .map(doc => (
        <option className=" bg-[#0f0a13]"  key={doc.id} value={doc.id}>{doc.name}</option>
      ))
  )} */}
</select>
 
      <button className=" bg-blue-500 px-4 py-1 rounded-lg" type="submit">Submit</button>
    </form>
  );
}

export default Appointments;
