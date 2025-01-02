import React from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";

export const Footer = () => {
  return (
    <footer className='bg-tertiary w-full mt-10'>
      <div className='w-[80%] lg:w-full mx-auto flex lg:justify-around flex-wrap py-10 lg:py-20 gap-10'>
        <div className='flex flex-col gap-4 w-full lg:w-1/2'>
          <div className='font-bold text-xl'>Contact Us</div>
          <div className='flex gap-2 items-center'>
            <Mail size={20} className='min-w-[20px] min-h-[20px]' />
            <span>contact@kmoove.com</span>
          </div>
          <div className='flex gap-2 items-start'>
            <MapPin size={20} className='min-w-[20px] min-h-[20px]' />
            <span className='line-clamp-3'>
              Kmoove 16 rue Cuvier Lyon 69006
            </span>
          </div>
          {/* <div className='flex gap-2 items-center'>
            <Phone size={20} className='min-w-[20px] min-h-[20px]' />
            <span>+02 5421234560</span>
          </div> */}
        </div>
        {/* <div className='flex flex-col gap-4 w-full lg:w-[25%]'>
          <div className='font-bold text-xl'>Newsletter</div>
          <form className='flex h-[30px] lg:h-[50px] text-xs lg:text-lg rounded-sm'>
            <input
              type='text'
              className='bg-white pl-2 lg:text-md focus:outline-none rounded-tl-sm rounded-bl-sm'
              placeholder='Enter email address'
            />
            <button type='submit' className='px-2 lg:px-4 bg-black h-full'>
              Subscribe
            </button>
          </form>
          <div className='w-full flex gap-4'>
            <Twitter size={20} />
            <Facebook size={20} />
            <Instagram size={20} />
            <Youtube size={20} />
          </div>
        </div> */}
        <div className='relative flex items-center w-full lg:w-auto'>
          <Image
            src={Logo}
            alt='logo'
            className='w-full h-auto max-w-[200px]'
          />
        </div>
      </div>
    </footer>
  );
};
