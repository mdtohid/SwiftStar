import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

const AddCart = () => {
    const [cartCars, setCartCars] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/addCart')
            .then(res => res.json())
            .then(data => setCartCars(data))
    }, []);

    console.log(cartCars);

    if (!cartCars) {
        return <Loading></Loading>
    }

    return (
        <div className='px-10 lg:px-14'>
            {
                cartCars.map(car =>
                    <div className='w-full md:w-8/12  mx-auto flex flex-col md:flex-row gap-5 pt-5 bg-zinc-100 hover:bg-purple-100 rounded-lg p-5 my-5'>
                        <div className='w-full lg:w-6/12 rounded-lg'>
                            <img className='w-full' src={car.asset} alt="" />
                        </div>

                        <div className=''>
                            <h3 className='text-lg mb-1 font-semibold'>{car.name}</h3>
                            <h3 className='text-lg mb-1 font-semibold'>{car.color} color paint</h3>
                            <h3 className='text-lg mb-1 font-semibold'>{car.motorDetail}</h3>
                            <h3 className='text-lg mb-1 font-semibold'>{car.price}</h3>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default AddCart;