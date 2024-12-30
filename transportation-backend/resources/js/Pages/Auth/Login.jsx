import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden">
                <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                    <h2 className="text-xl font-semibold text-[#373a36] flex items-center gap-2">
                        <FaSignInAlt className="text-[#d48166]" />
                        Welcome Back
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                {status && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-500">
                        <p className="text-sm font-medium text-green-600">{status}</p>
                    </div>
                )}

                <form onSubmit={submit} className="p-6 space-y-6">
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
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-[#d48166]/20 text-[#d48166] focus:ring-[#d48166]"
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-[#d48166] hover:text-[#d48166]/80 transition-colors duration-200"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#d48166]/10">
                        <Link
                            href={route('register')}
                            className="flex items-center gap-2 text-[#d48166] hover:text-[#d48166]/80 transition-colors duration-200"
                        >
                            <FaUserPlus className="w-4 h-4" />
                            Create account
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                        >
                            <FaSignInAlt className="w-4 h-4" />
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}