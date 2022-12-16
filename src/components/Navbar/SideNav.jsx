import { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import LoginModal from '../Modals/LoginModal';
import SignUpModal from '../Modals/SignUpModal';
import ForgotPasswordModal from '../Modals/ForgotPasswordModal';
import OptionsModal from '../Modals/OptionsModal';
import { SignedIn } from './SignedIn';
import { SignedOff } from './SignedOff';
import { auth } from '../../firebase-config'
import { signOut } from "firebase/auth";
import { UserContext } from '../../contexts/Contexts'; 

export default function SideNav({toggleMenu}) {
    
    // const [showNav, setShowNav] = useState(false);
    const userState = useContext(UserContext)
    const {user} = userState
    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showFPModal, setShowFPpModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false);

    const closeLoginModal = () => {
        setShowLoginModal(false);
    }

    const closeSignUpModal = () => {
        setShowSignUpModal(false);
    }

    const closeFPModal = () => {
        setShowFPpModal(false);
    }

    const closeOptionsModal = () => {
        setShowOptionsModal(false);
    }

    const openOptionsModal = () => {
        setShowOptionsModal(true);
    }
    
    const toggleSignUpModal = () => {
        setShowSignUpModal(prev => !prev);
    }

    
    //TODO: move func to authfuncs
    const logOff = () => {
        signOut(auth)
            .then((res) => {
                userState.setUser(null)
            })
            .catch((error)=> {
                console.log("we had an error")
                console.log(error)
            })
    }

    const closeMenuOnLinkClick = () => {
        let menuElement = document.querySelector("#nav-toggle-btn")
        menuElement.checked = false;
        toggleMenu();
    }
    
    //TODO: is this useeffect necessary?
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {

        });

        return () => {
            unsubscribe();
          };

    }, [user]);

  return (
        <div className='my-2 h-full flex flex-col justify-between'>
            <div>
                <ul className="text-center">
                    {/* <button className='border' type='button' onClick={() => console.log(user, auth?.currentUser?.displayName)}>
                            check user
                    </button>    */}
                    
                    <li onClick={() => closeMenuOnLinkClick()}>
                        <p className='text-lg mb-2 underline'><Link to={"/"}>HOME</Link></p>
                    </li>
                    <li onClick={() => closeMenuOnLinkClick()}>
                    <p className='text-lg mb-2 underline'> <Link to={"/list"}>LIST</Link></p>
                    </li>
                    <li onClick={() => closeMenuOnLinkClick()}>
                    <p className='text-lg mb-2 underline'><Link to={"/about"}>ABOUT</Link></p>
                    </li>
                </ul>
            </div>
            <div className='auth-btns'>
            {user ? 
                <SignedIn 
                    logOff={logOff}
                    openOptionsModal={openOptionsModal}
                    setShowOptionsModal={setShowOptionsModal}
                /> : <SignedOff 
                        setShowSignUpModal={setShowSignUpModal}
                        setShowLoginModal={setShowLoginModal}
                />
            }
            </div>
            
            {/* if modal state is set to true, show the modal, otherwise show nothing */}
            {showLoginModal ? 
                <LoginModal 
                    closeLoginModal={closeLoginModal}
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}
                    setShowFPpModal={setShowFPpModal}
                /> 
            : null}

            {showSignUpModal ? 
                <SignUpModal
                    closeSignUpModal={closeSignUpModal}
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}
                 /> 
            : null}
            
            {showOptionsModal ? 
                <OptionsModal
                    closeOptionsModal={closeOptionsModal}
                    setShowOptionsModal={setShowOptionsModal}
                 /> 
            : null}

            {showFPModal ? <ForgotPasswordModal closeFPModal={closeFPModal}/> : null}
        </div>
       
  )
}
