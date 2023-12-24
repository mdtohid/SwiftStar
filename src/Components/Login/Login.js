import React, { useEffect } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import google from '../../Image/google.ico';
// import SignWithOthers from '../SignWithOthers/SignWithOthers';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user || gUser) {
            navigate('/');
        }
    }, [user, gUser, navigate])

    if (loading || gLoading) {
        return <Loading></Loading>
    }

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
        console.log(email, password);
    };



    return (
        <form className='flex flex-col gap-9 min-h-screen items-center justify-center w-full px-10 lg:px-14' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-10/12 md:w-4/12 mt-14'>
                <h1 className='text-2xl text-blue-400 mb-2'>SwiftStar</h1>
                <p className='text-lg'>Welcome to! Please Login</p>
            </div>

            <div className='w-10/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='email'
                    placeholder='Enter your email'
                    {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
            </div>

            <div className='w-10/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='password'
                    placeholder='Enter your password'
                    {...register("password", { required: "Password must be required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>

            <div className='w-10/12 md:w-4/12'>
                <p className='text-left mb-2'>
                    {error?.message === 'Firebase: Error (auth/user-not-found).' && 'User not found'}
                    {error?.message === 'Firebase: Error (auth/wrong-password).' && 'Wrong password.Try again'}
                </p>
                <input type="submit" value='Login' className='btn btn-outline w-full' />
                <p><Link to='/signup'>Create a account?</Link></p>
            </div>

            <div className="divider w-10/12 md:w-4/12 mx-auto">OR</div>

            <button className='w-10/12 md:w-4/12 flex items-center justify-center bg-cyan-100 px-2 py-3 rounded-lg gap-4' onClick={() => signInWithGoogle()}>
                <img className='w-7' src={google} alt="" srcset="" />
                <p className=' text-sm'>Sign in with google</p>
            </button>

            <div className="mockup-code w-10/12 md:w-4/12 bg-zinc-100	 text-black mb-10">
                <pre className='text-lg mb-2 font-semibold'>User Email and Password</pre>
                <pre data-prefix=">"><code>user@mail.com</code></pre>
                <pre data-prefix=">"><code>123456</code></pre>
            </div>
        </form>
    );
};

export default Login;

