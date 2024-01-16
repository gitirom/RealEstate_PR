import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../FireBase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signInFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
// import { LinearProgressWithLabel } from '@material-ui/core/LinearProgress';


const Profile = () => {
    const {currentUser, loading, error} = useSelector(state => state.user);
    const profileRef = useRef();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const dispatch = useDispatch();
    
    console.log(formData);
    console.log(filePerc);
    console.log(fileUploadError);
    

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);


    const handleFileUpload = () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name; //create a file name with new date if there is tow files contains the same name take a diff date   
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );
        };


    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value});
    };

    

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if(data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            toast.success("User Credentials Updated!");

        } catch (error) {
            dispatch(updateUserFailure(error.message));
            toast.error("Error, Not Updated!");
        }
        

    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());

            const res = await fetch(`api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            
            const data = await res.json();
            if(data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }

            dispatch(deleteUserSuccess(data));
            toast.success('User Has Been Deleted!');

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
            toast.error("User Not Deleted!");
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signOut');
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }

            dispatch(deleteUserSuccess(data));
            toast.success('SignOut Successful!');

        } catch (error) {
            dispatch(deleteUserFailure(data.message));
            toast.error('Error SignOut!');
        }
    }




    return (
        <div className='p-3 max-w-lg mx-auto' >
            <h1 className='text-3xl font-semibold text-center ' >Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-24'  >
                <input 
                    type="file" ref={profileRef} hidden accept='image/*'
                    onChange={(e) => setFile(e.target.files[0])}
                    />  
                <img onClick={() => profileRef.current.click()} 
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
                    src={currentUser.avatar} alt="profile"
                />
                    {/* <LinearProgressWithLabel value={progress} /> */}
                <input defaultValue={currentUser.userName} className='border p-3 rounded-lg ' type="text" placeholder='username' id='username' onChange={handleChange} />
                <input defaultValue={currentUser.email} className='border p-3 rounded-lg ' type="email" placeholder='email' id='email' onChange={handleChange} />
                <input className='border p-3 rounded-lg ' type="password" placeholder='password' id='password' onChange={handleChange} />
                <button 
                    disabled={loading}
                    className='bg-slate-700 p-3 hover:opacity-95 text-white font-bold rounded-lg disabled:opacity-80 uppercase'
                >
                        {loading ? 'Loading...' : 'Update'}
                </button>
                <Link className='bg-green-700 text-white p-3 rounded-lg text-center uppercase font-bold hover:opacity-95' to={"/create-listing"} >
                    Create Listing
                </Link>

            </form>
            <div className="flex justify-between mt-5">
                <span className='text-red-700 cursor-pointer font-bold' onClick={handleDelete} >Delete account</span>
                <span className='text-red-700 cursor-pointer font-bold' onClick={handleSignOut}  >Sign Out</span>
            </div>
            <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        </div>
    )
}

export default Profile
