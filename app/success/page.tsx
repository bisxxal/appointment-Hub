// 'use client';
// import { findAppointment } from '@/actions/server.actions';
// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react'

// function Successpage() {

//   const p = useSearchParams();
//   const appointmentId = p.get('appId');
//   console.log(appointmentId);

//   const [data , setData] = useState<any>([])
//   useEffect(() => {
//     const fetchAppointment = async () => {
//        const res:any = await findAppointment(appointmentId)
//         setData(res)
//       }
      
//       fetchAppointment()
      
//     }, [appointmentId])
    
//     console.log("res",data?.doctor);
//   return (
//     <div className=' min-h-screen w-1/2 mx-auto  flex flex-col justify-center gap-10  '>
        
//         <div className=' flex flex-col items-center justify-center '>
//             <p className=' font-semibold text-3xl text-center w-5/6'>Your Your <span className=' text-[#f694ff]  '>appointment</span> request has
//                 been successfully submitted!
//                 </p>
//                 <p className=' text-gray-500 font-semibold mt-2'>
//                 We II be in touch shortly to confirm. 
//                 </p>

//                 <p className=' mt-2 bg-[skyblue] text-blue-500 font-semibold p-1 rounded-2xl px-4'>{data?.status}</p>
//         </div>

//         <div className=' border-y-2 h-20 flex justify-between items-center border-[#9e9e9e1f] p-2 '>
//             <p>Requested <span className=' text-[#f694ff]  '>appointment</span> details:</p>
//             <div className=' border rounded-xl border-[#ffffff3d] p-4 '>{data?.doctor?.name}</div>
//             <p>{data?.createdAt ? new Intl.DateTimeFormat("en-IN").format(new Date(data.createdAt)) : ''}</p>
//         </div>
//     </div>
//   )
// }

// export default Successpage

'use client';
import { findAppointment } from '@/actions/server.actions';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Successpage() {
  const p = useSearchParams();
  const appointmentId = p.get('appId');
  console.log(appointmentId);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (appointmentId) {
        const res: any = await findAppointment(appointmentId);
        setData(res);
      }
    };
    
    fetchAppointment();
  }, [appointmentId]);

  console.log("res", data?.doctor);

  return (
    <div className='min-h-screen w-1/2 mx-auto flex flex-col justify-center gap-10'>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-semibold text-3xl text-center w-5/6'>
          Your <span className='text-[#f694ff]'>appointment</span> request has
          been successfully submitted!
        </p>
        <p className='text-gray-500 font-semibold mt-2'>
          We will be in touch shortly to confirm.
        </p>
        <p className='mt-2 bg-[skyblue] text-blue-500 font-semibold p-1 rounded-2xl px-4'>
          {data?.status}
        </p>
      </div>

      <div className='border-y-2 h-20 flex justify-between items-center border-[#9e9e9e1f] p-2'>
        <p>Requested <span className='text-[#f694ff]'>appointment</span> details:</p>
        <div className='border rounded-xl border-[#ffffff3d] p-4'>{data?.doctor?.name}</div>
        <p>{data?.createdAt ? new Intl.DateTimeFormat("en-IN").format(new Date(data.createdAt)) : ''}</p>
      </div>
    </div>
  );
}

// Wrap your Successpage in a Suspense boundary
export default function WrappedSuccessPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Successpage />
    </React.Suspense>
  );
}
