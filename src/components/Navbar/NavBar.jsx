import { useState, useContext } from 'react'
import LoginModal from '../Modals/LoginModal';
import SignUpModal from '../Modals/SignUpModal';
import { SignedIn } from './SignedIn';
import { SignedOff } from './SignedOff';
import { db, auth } from '../../firebase-config'
import { signOut } from "firebase/auth";
import { UserContext } from '../../auth/UserContext'; 

export default function NavBar() {
    const user = useContext(UserContext)
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const closeLoginModal = () => {
        setShowLoginModal(false);
    }

    const closeSignUpModal = () => {
        setShowSignUpModal(false);
    }

    const logOff = () => {
        signOut(auth)
            .then(() => {
                console.log("user signed off")
            })
            .catch((error)=> {
                console.log(error)
            })
    }

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-neutral-500">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#">
                        Top Movie Picker
                    </a>
                </div>
                <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                {/* if user is logged in, show user options, else show sign in/up buttons  */}
                {user ? <SignedIn logOff={logOff}/> : <SignedOff 
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}

                />
                
                }
                </div>
            </div>
            {/* if modal state is set to true, show the modal, otherwise show nothing */}
            {showLoginModal ? <LoginModal closeLoginModal={closeLoginModal}/> : null}
            {showSignUpModal ? <SignUpModal closeSignUpModal={closeSignUpModal}/> : null}
        </nav>
    );
}



