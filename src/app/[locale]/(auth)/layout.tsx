import Image from "next/image";
import React, { PropsWithChildren } from "react";

const AuthPagesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=' flex  min-h-svh  items-center justify-start  '>
      <div className=' lg:w-2/5 justify-center  flex w-full '>{children}</div>
      <div className='fixed top-0 overflow-hidden right-0 w-full lg:w-3/5 -z-10   h-svh  '>
        <div className='relative w-full h-full'>
          <Image
            fill
            src='/assets/images/auth/Auth_page_image.jpeg'
            alt='Auth page background image'
            className='object-cover'
            priority
          />
          <div className='absolute h-1/2 w-full    -bottom-10 bg-black/70  blur-3xl' />
          <div className='text-white hidden lg:flex justify-end w-full bottom-0 text-3xl absolute'>
            <div className=' flex flex-col justify-end p-12 text-white'>
              <div className='max-w-md text-end'>
                <h1 className='text-4xl text-end font-bold mb-4'>
                  Delicious food, delivered to your door
                </h1>
                <p className='text-lg text-white/90 mb-6 tex'>
                  Order from your favorite restaurants and get fresh, hot meals
                  delivered in minutes.
                </p>
                <div className='flex items-center justify-end space-x-6  text-sm'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span>Fast Delivery</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                    <span>Fresh Food</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
                    <span>Best Prices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPagesLayout;
