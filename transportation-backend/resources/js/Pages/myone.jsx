import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('myone'));
    };

    return (
        <>
            <Head title="myone" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <div className="mb-4">
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Name"
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                        </div>
                        {/* Similar input fields for email, password */}
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-[#FF2D20] text-white py-2 rounded"
                        >
                            Register
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link 
                            href={route('login')} 
                            className="text-blue-500 hover:underline"
                        >
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}