
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const SignIn = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false ) {     // data.success is from the file error inside the util file 
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/');
            toast.success("User SignIn Successfully!");
            
        } catch (error) {
            setLoading(false);
            setError(error.message);
            toast.error("User SignIn Field !");
        }
    };
    
    

    return (
        <div className='p-3 max-w-lg mx-auto' >
            <h1 className='text-3xl text-center font-semibold my-7' >Sign Ip</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
                <input type="email" placeholder='email' id='email' onChange={handleChange} className='border p-3 rounded-lg gap-4' />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className='border p-3 rounded-lg gap-4' />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80  ' >{loading ? 'Loading...' : 'Sign Ip'}</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't Have an account?</p>
                <Link to='/sign-up' >
                    <span className="text-blue-700 ">Sign Up</span>
                </Link>
            </div>
            {error && <p className="text-red-500" >{error}</p>}
        </div>
    )
}

export default SignIn
