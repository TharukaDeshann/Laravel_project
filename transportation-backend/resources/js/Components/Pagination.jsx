import { Link } from "@inertiajs/react";

export default function Pagination({links}){
    return (
        <nav className="text-center mt-4">
            {links.map(link =>(
                <Link 
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className="" 
                dangerouslySetInnerHTML={{__html : link.label}}></Link>
            ))}
        </nav>
    )
}