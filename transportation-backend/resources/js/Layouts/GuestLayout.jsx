import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-[#e6e2dd]">
            <div className="bg-white rounded-full p-4 shadow-sm border border-[#d48166]/10">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-[#d48166]" />
                </Link>
            </div>

            <div className="w-full sm:max-w-2xl mt-8">
                <div className="bg-white overflow-hidden shadow-sm border border-[#d48166]/10 rounded-lg">
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center m-6 mt-6 text-sm text-[#373a36]/60">
                    <p>&copy; {new Date().getFullYear()}<span className=" text-base sm:text-sm font-semibold text-primary"> FMS</span> All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}