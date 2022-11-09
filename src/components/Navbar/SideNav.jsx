import { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import LoginModal from '../Modals/LoginModal';
import SignUpModal from '../Modals/SignUpModal';
import { SignedIn } from './SignedIn';
import { SignedOff } from './SignedOff';
import { auth } from '../../firebase-config'
import { signOut } from "firebase/auth";
import { UserContext } from '../../contexts/Contexts'; 

export default function SideNav() {
    
    const [showNav, setShowNav] = useState(false);
    const userState = useContext(UserContext)
    const user = userState.user
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const closeLoginModal = () => {
        setShowLoginModal(false);
    }

    const closeSignUpModal = () => {
        setShowSignUpModal(false);
    }
    
    //TODO: move func to authfuncs
    const logOff = () => {
        signOut(auth)
            .then((res) => {
                userState.setUser(null)
                // setShowNav(false)
            })
            .catch((error)=> {
                console.log("we had an error")
                console.log(error)
            })
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
        <div className='my-2'>
            
            <ul className="text-center">
                <li>
                    <Link to={"/list"}>list</Link>
                </li>
                <li>
                    <Link to={"/about"}>about</Link>
                </li>
            </ul>
            {user ? <SignedIn logOff={logOff}/> : <SignedOff 
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}
                />
            }
            {/* if modal state is set to true, show the modal, otherwise show nothing */}
            {showLoginModal ? <LoginModal closeLoginModal={closeLoginModal}/> : null}
            {showSignUpModal ? <SignUpModal closeSignUpModal={closeSignUpModal}/> : null}
        </div>
       
  )
}
