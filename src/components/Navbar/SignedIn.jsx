export const SignedIn = ({logOff}) => {
    return (
        <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#">
                    <button onClick={() => logOff()} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Log off
                    </button>
                </a>    
            </li>
            <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#">
                    <button onClick={() => console.log("user options")} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    User options
                    </button>
                </a>
            </li>
        </ul>
    )
}