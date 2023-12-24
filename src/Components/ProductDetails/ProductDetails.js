import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProductDetails.css';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productDetailsId } = useParams();

    const [selectedCar, setSelectedCar] = useState({});
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedSize, setSelectedSize] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/cars')
            .then(res => res.json())
            .then(data => {
                const selectedCar = data.filter(car => car.id === productDetailsId);
                setSelectedCar(selectedCar[0]);
                setSelectedColor(selectedCar[0].colorVariation[0])
                setSelectedSize(selectedCar[0].motorSizeVariation[0])
            })

    }, [productDetailsId]);

    const handleColorPaint = async (color) => {
        const selectedColor = await selectedCar.colorVariation.filter(car => car.id === color);
        setSelectedColor(selectedColor[0]);
    }

    const handleMotorSize = async (size) => {
        console.log(size)
        const selectedSize = await selectedCar.motorSizeVariation.filter(car => car.id === size);
        setSelectedSize(selectedSize[0]);
    }

    const handleAddCart = () => {
        const selectCar = {
            name: selectedCar.title,
            asset: selectedColor.asset,
            color: selectedColor.id,
            motorDetail: selectedSize.detail,
            price: selectedSize.price
        }

        fetch(`http://localhost:5000/addCart`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectCar),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // reset();
                // refetch();
                // toast.success("Add Item success");
            });

        // console.log(selectCar);
    }

    if (!selectedCar || !selectedColor || !selectedSize) {
        return <Loading></Loading>
    }



    return (
        <div className='flex flex-col lg:flex-row items-center lg:items-start lg:justify-between pt-5 px-10 lg:px-14'>
            <div className='w-10/12 lg:w-8/12'>
                <img className='w-full' src={selectedColor.asset} alt="" />
                <div>
                    {/* <p className='text-xl font-semibold'>
                    {selectedColor.id} awesome car</p> */}
                    <p className='text-xl font-semibold text-center md:text-start'>
                        {selectedSize.detail}</p>
                </div>
            </div>

            <div className='w-10/12 md:w-8/12 lg:w-3/12'>
                <h3 className='text-4xl font-semibold text-center'>{selectedCar.title}</h3>

                <div className='mt-14 flex flex-col items-center'>
                    <h3 className='text-3xl font-semibold '>Paint</h3>
                    <div className='mt-5 mb-1'>
                        <button className={`w-fit border-4 ${selectedColor.id === "White" && 'border-[#3e6ae1]'} focus:border-[#3e6ae1] p-1 rounded-full`} onClick={() => handleColorPaint("White")}>
                            <p className='w-10 h-10 bg-[#cccccc] rounded-full'>
                            </p>
                        </button>

                        <button className='w-fit border-4 focus:border-[#3e6ae1] p-1 rounded-full' onClick={() => handleColorPaint("Black")}>
                            <p className='w-10 h-10 bg-[#08080a] rounded-full'>
                            </p>
                        </button>

                        <button className='w-fit border-4 focus:border-[#3e6ae1] p-1 rounded-full' onClick={() => handleColorPaint("Red")}>
                            <p className='w-10 h-10 bg-red-700 rounded-full'>
                            </p>
                        </button>
                    </div>
                    <p className='text-lg font-semibold'>{selectedColor.id}</p>
                </div>

                <div className='mt-14 flex flex-col items-center'>
                    <h3 className='text-3xl font-semibold '>Motor size</h3>
                    {
                        selectedCar.motorSizeVariation?.map((carMotor, index) =>
                            <div className='w-full my-5'>
                                <p className='font-semibold mb-1'>{carMotor.title}</p>
                                <button key={index}
                                    className={`flex justify-between w-full border-4 border-slate-500 border-rounded text-slate-500 focus:border-[#3e6ae1] focus:text-black`} onClick={() => handleMotorSize(carMotor.id)}>
                                    <span>{selectedCar.title}</span>
                                    <span>{carMotor.price}</span>
                                </button>
                            </div>
                        )
                    }
                </div>

                <div className='mt-14 flex flex-col items-center'>
                    <h3 className='text-3xl font-semibold '>Order Your {selectedCar.title}</h3>
                    <button className='w-full bg-[#3e6ae1] hover:bg-[#0a45e4] my-5 text-white' onClick={handleAddCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );


};

export default ProductDetails;


/* <div className='w-full my-5'>
    <p className='font-semibold'>Average Motor size</p>
    <button className={`flex justify-between w-full border-4  border-rounded ${selectedSize.id === "littleMotor" ? 'border-[#3e6ae1] text-black' : 'border-slate-500 text-slate-500'}  focus:border-[#3e6ae1] focus:text-black`} onClick={() => handleMotorSize("littleMotor")}>
        <span>Model S</span>
        <span>$71090</span>
    </button>
</div>
<div className='w-full my-5'>
    <p className='font-semibold'>Big Motor size</p>
    <button className='flex justify-between w-full border-4 border-slate-500 border-rounded text-slate-500 focus:border-[#3e6ae1] focus:text-black' onClick={() => handleMotorSize("bigMotor")}>
        <span>Model S</span>
        <span>$81090</span>
    </button>
</div> */