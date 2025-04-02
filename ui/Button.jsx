import Link from "next/link";

export default function Button(props) {
    return ( 
        <Link
            className="block rounded-3xl bg-green-400 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10 flex items-center justify-center"
            href={props.href}
        >
            {props.startingLogo && <div>{props.startingLogo}</div>}
            <div className="px-2">{props.text}</div>
            {props.endingLogo && <div>{props.endingLogo}</div>}
        </Link>
    );
}