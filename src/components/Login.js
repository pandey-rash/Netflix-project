import Header from './Header';
import {useState, useRef} from 'react';
import {Validate} from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {addUser, removeUser} from '../utils/userSlice';

const Login = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

   


    const handleSignInForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleValidation = () => {
      const msg = Validate(email.current.value,password.current.value,name.current.value);
      setErrorMessage(msg);

      if(msg) return;

      //sign in-sign up

      if(!isSignIn){
          //sign up logic
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
         
          .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {displayName: name.current.value, photoURL: "https://i.pinimg.com/564x/5b/50/e7/5b50e75d07c726d36f397f6359098f58.jpg"})
          .then(() => {
            // Profile updated!
            // ...
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL: photoURL}));
    
            
          }).catch((error) => {
            // An error occurred
            // ...
            setErrorMessage(error.message);
          });
          console.log(user);
         
          // ...
        })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });
      }
      else{
          //sign in logic
          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
         

         .then((userCredential) => {
         // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
         .catch((error) => {
         const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
  });
      }
    }
    return (
        <div>
            <Header/>
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_medium.jpg"
                     alt="background-netflix-img"
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 absolute text-white bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignIn ? "Sign In": "Sign Up"}</h1>
                {!isSignIn &&
                <input 
                    ref={name}
                    type="text" 
                    placeholder="Full Name" 
                    className="p-4 my-4 w-full bg-gray-700 rounded-lg"
                />
                }
                <input 
                    ref={email}
                    type="text" 
                    placeholder="Email address" 
                    className="p-4 my-4 w-full bg-gray-700 rounded-lg"
                />
                <input 
                    ref={password}
                    type="password" 
                    placeholder="Password" 
                    className="p-4 my-4 w-full bg-gray-700 rounded-lg"
                />
                <p className="text-red-600">{errorMessage}</p>
                <button className="p-4 my-4 bg-red-700 w-full rounded-lg cursor-pointer" onClick={handleValidation}>{isSignIn ? "Sign In": "Sign Up"}</button>
                <p className ="cursor-pointer" onClick={handleSignInForm}>{isSignIn ? "New to Netflix? Sign up now.":"Already logged in Sign In"}</p>
            </form>
        </div>
        )
}

export default Login;