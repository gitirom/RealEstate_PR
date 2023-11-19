import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {app} from '../FireBase';
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);     //GoogleAuthProvider and signInWithPopup methods from the Firebase Authentication SDK to authenticate the user with Google. 
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),  //After a successful sign-in, it sends the user's name, email, and photo to a server using a POST request
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
            toast.success("User SignIn with Google Successfully!");
            
        } catch (error) {
            console.log("Could Not SignIn with Google!", error);
            toast.error("User SignIn with Google Field !");
        }
    }




    return (
        //type button for getting no submitting the form cause i want to see a popUP
        <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 ' >
            Continue With Google
        </button>
    )
}

export default OAuth
