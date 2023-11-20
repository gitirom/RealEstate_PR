import {useSelector} from 'react-redux';


const Profile = () => {
    const {currentUser} = useSelector(state => state.user);

    return (
        <div className='p-3 max-w-lg mx-auto' >
            <h1 className='text-3xl font-semibold text-center ' >Profile</h1>
            <form className='flex flex-col gap-4 mt-24'  >
                <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt="profile" />
                <input className='border p-3 rounded-lg ' type="text" placeholder='username' id='username' />
                <input className='border p-3 rounded-lg ' type="email" placeholder='email' id='email' />
                <input className='border p-3 rounded-lg ' type="text" placeholder='password' id='password' />
                <button className='bg-slate-700 p-3 hover:opacity-95 text-white font-bold rounded-lg disabled:opacity-80 uppercase'>Update</button>
            </form>
            <div className="flex justify-between mt-5">
                <span className='text-red-700 cursor-pointer font-bold' >Delete account</span>
                <span className='text-red-700 cursor-pointer font-bold'  >Sign Out</span>
            </div>
        </div>
    )
}

export default Profile
