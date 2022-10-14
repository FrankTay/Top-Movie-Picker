import { useState } from 'react'
import Modal from './Modal';

export default function NavBar() {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-neutral-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                neutral Color
            </a>
            {/* <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                <span className="block relative w-6 h-px rounded-sm bg-white">jjj</span>
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1">nnnn</span>
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1">;;;</span>
                ibibiub
            </button> */}
            </div>
            <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                    {/* <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo"
                    >
                    Modal button
                    </a> */}
                    <button onClick={() => setShowModal(true)} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                        >
                    Small
                    </button>
                </li>
                <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                    Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                    Setting
                    </a>
                </li>
            </ul>
            </div>
        </div>
        {showModal ? <Modal closeModal={closeModal}/> : null}
        </nav>
    );
}