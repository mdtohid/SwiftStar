import React, { useEffect } from 'react';
import google from '../../Image/google.ico';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import github from '../../../src/image/github.ico';
// import './Signup.css';
// import auth from '../../firebase.init';
// import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
// import SignWithOthers from '../SignWithOthers/SignWithOthers';
// import Loading from '../Loading/Loading';
// import useToken from '../../Hooks/useToken';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    // const [token] = useToken(user);

    const [updateProfile, updating, error1] = useUpdateProfile(auth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    };

    useEffect(() => {
        if (user || gUser) {
            reset();
            navigate('/');
        }
    }, [user, gUser, reset, navigate]);

    if (loading || updating || gLoading) {
        return <Loading></Loading>
    }

    return (
        <form className='flex flex-col gap-9 items-center justify-center w-full mb-10' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-8/12 md:w-4/12 mt-14'>
                <h1 className='text-2xl text-blue-400'>Trs</h1>
                <p className='text-lg'>Welcome to! Signup first</p>
            </div>
            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='text'
                    placeholder='Enter your name'
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name?.type === 'required' && <p role="alert"> Name is required</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='email'
                    placeholder='Enter your email'
                    {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='password'
                    placeholder='Enter your password'
                    {...register("password", { required: "Password must be required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input type="submit" value='Signup' className='btn btn-outline w-full' />
                <p><Link to='/login'>Already have a account?</Link></p>
            </div>

            <div className="divider w-8/12 md:w-4/12 mx-auto">OR</div>

            <button className='w-8/12 md:w-4/12 flex items-center justify-center bg-cyan-100 px-2 py-3 rounded-lg gap-4' onClick={() => signInWithGoogle()}>
                <img className='w-7' src={google} alt="" srcset="" />
                <p className=' text-sm'>Sign in with google</p>
            </button>
        </form>
    );
};

export default Signup;