import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, user }) {
    

    return (
        <GuestLayout 
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              {`User "${user?.model || 'Unknown Model'}"`} 
            </h2>
            }>
        <Head title={`User "${user.name}"`} />


        <div className="py-12">
                <div className="mx-auto max-w-7xl  lg:px-8">
                  <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                 
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        
                        <div className="grid gap-10 grid-cols-2 ">
                            <div>
                                <div>
                                    <label className="font-bold text-lg">User ID</label>
                                    <p className="mt-1">{user.id}</p>
                                </div>
                                <div className="mt-8"> 
                                    <label className="font-bold text-lg">User Name</label>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                
                               
                            
                          
        
                            </div>
                            
                            <div>
                        <div>
                            <label className="font-bold text-lg">Email</label>
                            <p className="mt-1">{user.email}</p>
                        </div>
                        
                        <div className="mt-8">
                            <label className="font-bold text-lg">Create Date</label>
                            <p className="mt-1">{user.created_at}</p>
                        </div>


                          
        
                            </div>


                            <div>
                        
                        
                        <div className="mt-8">
                            <label className="font-bold text-lg">Role</label>
                            <p className="mt-1">{user.role}</p>
                        </div>


                          
        
                            </div>
                            
                        </div>
                        <div className="mt-8 flex justify-start">
                                <Link
                                    href={route("vehicle.index")}
                                    className="inline-block bg-gray-100 text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                        

                        </div>
                        </div>
                        </div>
          
        </GuestLayout>
    );
}