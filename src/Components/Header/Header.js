import React from 'react';
import loginImg from '../../Image/user.png';
import logoutImg from '../../Image/logout.png';
import homeImg from '../../Image/home.png';
import addCart from '../../Image/add-cart.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const [signOut, loading1, error1] = useSignOut(auth);

    if (loading || loading1) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-between items-center py-3 glass px-10 lg:px-14 sticky top-0'>
            <Link to='/' className='text-2xl font-semibold'>SwiftStar</Link>
            <div className='flex gap-1 md:gap-x-3 '>
                <Link to='/' className="tooltip tooltip-bottom px-3 md:px-5 py-2 rounded-lg hover:bg-zinc-100" data-tip="Home">
                    <div>
                        <img src={homeImg} alt="" />
                    </div >
                </Link>

                <Link to='/addCart' className="tooltip tooltip-bottom px-3 md:px-5 py-2 rounded-lg hover:bg-zinc-100" data-tip="Add cart">
                    <div>
                        <img src={addCart} alt="" />
                    </div >
                </Link>

                {
                    user ?
                        <Link onClick={async () => await signOut()} className="tooltip tooltip-bottom px-3 md:px-5 py-2 rounded-lg hover:bg-zinc-100" data-tip="Logout">
                            <div>
                                <img src={logoutImg} alt="" />
                            </div>
                        </Link>
                        :
                        <Link to='/login' className="tooltip tooltip-bottom px-3 md:px-5 py-2 rounded-lg hover:bg-zinc-100" data-tip="Login">
                            <div >
                                <img src={loginImg} alt="" />
                            </div>
                        </Link>
                }
            </div>
        </div>
    );
};

export default Header;