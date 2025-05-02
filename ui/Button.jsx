import Link from "next/link";

export default function Button({ href, text, startingLogo, endingLogo, className }) {
    const defaultStyles = "block px-4 py-2 text-center text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center"
    
    return ( 
        <Link
            className={`${defaultStyles} ${className || 'bg-purple-600 hover:bg-purple-700 text-white'}`}
            href={href}
        >
            {startingLogo && <div className="mr-2">{startingLogo}</div>}
            <div>{text}</div>
            {endingLogo && <div className="ml-2">{endingLogo}</div>}
        </Link>
    );
}