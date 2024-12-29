import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUser } from 'react-icons/fa';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#373a36] flex items-center gap-2">
                        <FaUser className="text-[#d48166]" />
                        Profile Settings
                        <span className="text-[#d48166]">-</span>
                        <span className="text-[#d48166]">{auth.user.name}</span>
                    </h2>
                </div>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}