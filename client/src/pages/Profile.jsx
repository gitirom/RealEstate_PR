import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../FireBase';


const Profile = () => {
    const {currentUser} = useSelector(state => state.user);
    const profileRef = useRef();
    const [file, setFile] = useState(null);
    console.log(file);
    //firestore Rules
    // allow read;
    // allow write: if
    // request.resource.size < 2 * 1024 * 1024 &&
    // request.resource.contentType.matches('image/.*')

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name; //create a file name with new date if there is tow files contains the same name take a diff date   
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {  //This is an arrow function that will be executed when the state_changed event is triggered.
                let progress = (
                    snapshot.bytesTransferred / 
                    snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done'); //determine the number of bytes that have been uploaded and the total number of bytes to be uploaded
            }
        );
    }





    return (
        <div className='p-3 max-w-lg mx-auto' >
            <h1 className='text-3xl font-semibold text-center ' >Profile</h1>
            <form className='flex flex-col gap-4 mt-24'  >
                <input 
                    type="file" ref={profileRef} hidden accept='image/*'
                    onChange={(e) => setFile(e.target.files[0])}
                    />  
                <img onClick={() => profileRef.current.click()} 
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
                    src={currentUser.avatar} alt="profile"
                />
                <input className='border p-3 rounded-lg ' type="text" placeholder='username' id='username' />
                <input className='border p-3 rounded-lg ' type="email" placeholder='email' id='email' />
                <input className='border p-3 rounded-lg ' type="text" placeholder='password' id='password' />
                <button 
                    className='bg-slate-700 p-3 hover:opacity-95 text-white font-bold rounded-lg disabled:opacity-80 uppercase'>
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className='text-red-700 cursor-pointer font-bold' >Delete account</span>
                <span className='text-red-700 cursor-pointer font-bold'  >Sign Out</span>
            </div>
        </div>
    )
}

export default Profile
