import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FaSave, FaTimes } from 'react-icons/fa';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        image: null,
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            {/* Image Preview Section */}
            <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                <div className="flex items-center gap-6">
                    {user.image_path && (
                        <div className="w-32 h-32 rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={user.image_path}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <InputLabel 
                            htmlFor="user_image_path" 
                            value="Profile Picture"
                            className="text-[#373a36] mb-2"
                        />
                        <TextInput
                            id="user_image_path"
                            type="file"
                            name="image"
                            className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                            onChange={(e) => setData('image', e.target.files[0])}
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Form Fields Section */}
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-[#373a36]" />
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused={true}
                            autoComplete="name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-[#373a36]" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="text-sm text-gray-600">
                        Your email address is unverified.
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="ml-2 text-[#d48166] hover:text-[#d48166]/80 underline"
                        >
                            Click here to re-send the verification email.
                        </Link>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-[#e6e2dd] border-t border-[#d48166]/10 flex justify-end gap-4">
                <Link
                    href={route("dashboard")}
                    className="bg-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 text-gray-600"
                >
                    <FaTimes className="text-sm" />
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                >
                    <FaSave className="text-sm" />
                    Save Changes
                </button>
            </div>
        </form>
    );
}