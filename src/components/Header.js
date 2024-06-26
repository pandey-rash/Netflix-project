import {signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {auth} from '../utils/firebase';
import {useDispatch} from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import {onAuthStateChanged } from "firebase/auth";
import {useEffect} from 'react';


const Header = () => {
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
            navigate('/error');
          });
    }

    useEffect(() => {
        
      const unsubscribe =   onAuthStateChanged(auth, (user) => {
            if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL: photoURL}));
            navigate('/browse');
            // ...
            } else {
            // User is signed out
            // ...
             dispatch(removeUser());
             navigate('/');
         }
        });

        return () => unsubscribe();
    }, []);


    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-40" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo-netflix"/>
            { user && <div className="flex p-2">
            <img className="w-12 h-12"  src={user?.photoURL} alt="user-icon"/>
            <button onClick={handleSignOut} className="text-white font-bold">(Sign Out)</button>
            </div>}
        </div>
        );
}

export default Header;