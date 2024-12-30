import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden">
                <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                    <h2 className="text-xl font-semibold text-[#373a36] flex items-center gap-2">
                        <FaUser className="text-[#d48166]" />
                        Create Account
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Join us by creating your account
                    </p>
                </div>

                <form onSubmit={submit} className="p-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-[#373a36]" />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaUser className="w-4 h-4" />
                            </span>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full pl-10 border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-[#373a36]" />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaEnvelope className="w-4 h-4" />
                            </span>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full pl-10 border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-[#373a36]" />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaLock className="w-4 h-4" />
                            </span>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full pl-10 border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-[#373a36]"
                        />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaLock className="w-4 h-4" />
                            </span>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full pl-10 border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#d48166]/10">
                        <Link
                            href={route('login')}
                            className="text-[#d48166] hover:text-[#d48166]/80 transition-colors duration-200 flex items-center gap-2"
                        >
                            <FaSignInAlt className="w-4 h-4" />
                            Already registered?
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                        >
                            <FaUser className="w-4 h-4" />
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}