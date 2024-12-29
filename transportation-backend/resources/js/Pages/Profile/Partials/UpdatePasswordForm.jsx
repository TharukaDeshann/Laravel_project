import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword}>
            <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                <h2 className="text-xl font-semibold text-[#373a36]">Update Password</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="current_password" value="Current Password" className="text-[#373a36]" />
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                            autoComplete="current-password"
                        />
                        <InputError message={errors.current_password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="New Password" className="text-[#373a36]" />
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="md:col-span-2">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-[#373a36]" />
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>
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
                    Update Password
                </button>
            </div>
        </form>
    );
}