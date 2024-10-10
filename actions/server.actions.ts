'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const Allappointments = async (page: number ) => {
    try {
      const [users ,totalAppointments] = await prisma.$transaction([
        prisma.appointment.findMany({
          take:6,
          skip:6*(page-1) ,
          select: {
            id: true,
            createdAt: true,
            status: true,
            schedule:true,
            doctor: {
              select: {
                id: true,
                name: true,
                hospital: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }),
        prisma.appointment.count()
       ]);

      return { users: users || [], totalAppointments };  
    } catch (error) {
      return { users: [], totalAppointments: 0 }; 
    }
  };
export const userAppointments = async (page: number ,   userId:string) => {
    try {
    
      
      if(!userId){
        // console.log("in server " , userId);
        return { users: [], totalAppointments: 0 }; 
      }
      

      const [users , totalAppointments] = await prisma.$transaction([
        prisma.appointment.findMany({
          take:6,
          skip:6*(page-1) ,
          where:{
            userId:userId
          },
          select: {
            id: true,
            createdAt: true,
            status: true,
            schedule:true,
            doctor: {
              select: {
                id: true,
                name: true,
                hospital: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }),
        prisma.appointment.count()
      ])
      
      return { users: users || [], totalAppointments }; 
    } catch (error) {
      return { users: [], totalAppointments: 0 }; 
    }
  };
  


export const createdAppointment = async ({doctorId , hospitalId} :{doctorId : any , hospitalId :any} ) => {
    try {
        // console.log(doctorId ,  hospitalId);        
        const appointment = await prisma.appointment.create({
            data: {
              hospitalId: hospitalId, 
              userId: '6706a0ab86b63338a36c44d6',
              doctorId: doctorId,
              status: 'pending',
              cancelled: false,
            },
          });
        return {success : true , id: appointment.id};
        
      } catch (error) {
        return {success : false};
        // return false;       
    }
}
export const findAppointment = async (id: string|null) => {
  try {
    if(!id){return}
    const appointment = await prisma.appointment.findUnique({
      where:{
        id: id
      },
      select:{
        createdAt:true,
         doctor:true,
         status:true
        }
    })
    return appointment
  } catch (error) {
    
  }
}
export const selectDoctor = async () => {
    try {
        const hospital = await prisma.hospital.findMany({
            select: {
                id: true,
                name: true,
               
            }
        })
        return hospital;

    } catch (error) {
        
    }
}

export const findDoctor = async (id: string) => {
    try {
        const doctor = await prisma.doctor.findMany({
            where: {
                hospitalId: id
            },
            select: {
                id: true,
                name: true,
                hospital: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return doctor;
    } catch (error) {
        
    }
}
export const findSpecialization = async (id: string) => {
    try {
        const disease = await prisma.disease.findMany({
          where:{
            hospitalId:id
          },
          select:{
            id:true,
            name:true,

            doctor:{
              select:{
                id:true,
                name:true,
                specialization:true
              }
            }
          }
        })

        return disease;
    } catch (error) {
        
    }
}
 
export const scheduleAppointment = async ({ userId, appointmentId, schedule }: { appointmentId: string; userId: string; schedule: any }) => {
  try {
    console.log(userId, schedule, appointmentId);

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      console.log('Appointment not found');
      return;
    }

    if (appointment.userId !== userId) {
      console.log('User ID does not match the appointment');
      return;
    }

   const app =  await prisma.appointment.update({
      where: {
        id: appointmentId,
        // userId: userId,
      },
      data: {
        status: 'scheduled',
        schedule: schedule,
      },
    });
    
    // console.log(app , 'Scheduled');
    revalidatePath('/admin')
  } catch (error) {
    console.error('Error updating appointment:', error);
  }
};

export const CancelAppointment = async ({ userId , appointmentId ,status } : { appointmentId :string , userId : string , status : string , schedule : any}) => {  

  try {
    await prisma.appointment.update({
      where:{
        id: appointmentId,
        userId: userId 
      },
      data:{
        status: status,
        schedule: null
      }
    })
  } catch (error) {

  }
}

interface uerProps {
  user: {
    clerkId: string;
    email: string;
    username: string;
  }
}
export const createUser = async (user:any) => {  

  try {
    const newUser = await prisma.user.create({
      data:{
        username:user.username,
        email:user.email,
        clerkId:user.clerkId 
      }
    })
    console.log(newUser);
    
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.log('error when creating user' , error);
    
  }
}