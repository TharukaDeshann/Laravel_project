import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { FaExclamationTriangle, FaTimes, FaTrash } from 'react-icons/fa';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                    <FaExclamationTriangle />
                    Delete Account
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                </p>
            </header>

            <button
                onClick={() => setConfirmingUserDeletion(true)}
                className="bg-red-600 py-2 px-4 text-white rounded-lg shadow-sm hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
            >
                <FaTrash className="text-sm" />
                Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted.
                        Please enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full border-red-300 focus:border-red-500 focus:ring-red-500"
                            isFocused
                            placeholder="Enter your password to confirm"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 text-gray-600 border border-gray-300"
                        >
                            <FaTimes className="text-sm" />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-red-600 py-2 px-4 text-white rounded-lg shadow-sm hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
                        >
                            <FaTrash className="text-sm" />
                            Delete Account
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}