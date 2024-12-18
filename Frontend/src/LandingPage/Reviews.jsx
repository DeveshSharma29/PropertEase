import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

const Reviews = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]); // Adjust opacity based on scroll

    return (

        <motion.div
            style={{ opacity }}
            className='flex flex-col h-[90vh]'>
            <div className='flex h-[10%] pt-[5rem] justify-center text-center items-center'>
                <h1 className='font-extrabold text-[3.72rem] text-[#5f5f5f]'>Review Blog</h1>
            </div>
            <div className='flex h-[90%] justify-evenly items-center'>
                <div className='flex flex-col w-[25%] h-[70%] bg-[#e2e2e2] text-center gap-3 hover:bg-[#4a73a1a3] hover:text-white items-center pt-[3rem] rounded-2xl border-2 hover:scale-[103%] ease-in-out duration-100'>
                    <img className='h-[35%] rounded-full' src="1.jpg" alt="picture_1" />
                    <span className='font-bold text-[1.5rem]'>Samantha Patel</span>
                    <p className='w-[70%]'>Finding my dream home was easy! Detailed listings and a supportive team made the process smooth.</p>
                    <div className='text-yellow-400'>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                </div>
                <div className='flex flex-col w-[25%] h-[70%] bg-[#e2e2e2] text-center gap-3 hover:bg-[#4a73a1a3] hover:text-white items-center pt-[3rem] rounded-2xl border-2 hover:scale-[103%] ease-in-out duration-100'>
                    <img className='h-[35%] rounded-full' src="2.jpg" alt="picture_2" />
                    <span className='font-bold text-[1.5rem]'>Marcus Thompson</span>
                    <p className='w-[70%]'>Renting a property was quick and hassle-free. The filters helped me find the perfect place</p>
                    <div className='text-yellow-400'>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                </div>
                <div className='flex flex-col w-[25%] h-[70%] bg-[#e2e2e2] text-center gap-3 hover:bg-[#4a73a1a3] hover:text-white items-center pt-[3rem] rounded-2xl border-2 hover:scale-[103%] ease-in-out duration-100'>
                    <img className='h-[35%] rounded-full' src="3.jpg" alt="picture_3" />
                    <span className='font-bold text-[1.5rem]'>Emily Rodriguez</span>
                    <p className='w-[70%]'>Selling my property was a breeze! Great advice and multiple offers came in quickly.</p>
                    <div className='text-yellow-400'>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Reviews