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
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Profile Information Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden">
                        <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                            <h2 className="text-xl font-semibold text-[#373a36]">Profile Information</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Update your account's profile information and email address.
                            </p>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {/* Password Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden">
                        <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                            <h2 className="text-xl font-semibold text-[#373a36]">Security Settings</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Ensure your account is using a secure password.
                            </p>
                        </div>
                        <UpdatePasswordForm />
                    </div>

                    {/* Delete Account Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden">
                        <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                            <h2 className="text-xl font-semibold text-[#373a36] ">Danger Zone</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Permanently delete your account and all its associated data.
                            </p>
                        </div>
                        <div className="p-6">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}