export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-[#373a36] ${className}`}
        >
            {value ? value : children}
        </label>
    );
}

