import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Home = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        console.log('products');
        fetch('https://swiftstar-server-side-production.up.railway.app/cars')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products]);

    console.log(products);

    // useEffect(() => {
    //     fetch('https://swift-star-server-side-2sypcd2hd-mdtohid.vercel.app/cars')
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, []);

    if (!products) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-center pt-10 px-10 lg:px-14'>
            <div className='w-11/12 lg:w-9/12 grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-10'>
                {
                    products.map(product =>
                        <Link to={`/${product.id}`}  key={product.id} className='text-center hover:shadow-2xl py-10 rounded-lg px-2'>
                            <img src={product.asset} alt="" />
                            <h3 className='text-black text-lg font-semibold'>{product.title}</h3>
                            <p className='underline decoration-slate-500 hover:decoration-2 hover:decoration-black !text-slate-500 underline-offset-2'>Order</p>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Home;
