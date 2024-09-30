"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; // Importer useSession et signOut de next-auth
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import {Link as ScrollLink} from 'react-scroll';

const NavBar = () => {
  const { data: session } = useSession(); 
  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogin = () => {
    router.push("/auth/login"); 
  };

  const handleLogout = () => {
    signOut(); // Déconnexion via next-auth
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu
  };

  return (
    <header className='mt-4 w-full fixed top-0 z-10 bg-indigo-600 text-white shadow-md'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={118}
            height={18}
            className='object-contain'
          />
          <span className="ml-3 text-xl font-bold">SenAuto</span>
        </Link>

        <div className='hidden lg:flex space-x-8'>
          <Link href="/" className="hover:text-blue-400 cursor-pointer">
            Accueil
          </Link>
          <ScrollLink to="faq" smooth={true} duration={500}
           className="hover:text-blue-400 cursor-pointer">
              FAQ
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500}
           className="hover:text-blue-400 cursor-pointer">
              Contact
          </ScrollLink>

          {session ? (
            <Link href="/" onClick={handleLogout} 
            className="ml-4 hover:text-blue-400 cursor-pointer">
              Déconnexion
            </Link>
          ) : (
            <Link href="/auth/login" onClick={handleLogin} 
            className="ml-4 hover:text-blue-400 cursor-pointer">
              Connexion
            </Link>
          )}
        </div>

        {/* Menu mobile toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <ImCross /> : <FiMenu />} {/* Toggle icon */}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div className="lg:hidden bg-indigo-600 p-4 space-y-2">
          <Link href="/" className="block text-white hover:text-blue-400" onClick={toggleMenu}>Accueil</Link>
          <Link href="/contact" className="block text-white hover:text-blue-400" onClick={toggleMenu}>Contact</Link>
          <ScrollLink to="faq" smooth={true} duration={500}
           className="hover:text-blue-400 cursor-pointer">
              FAQ
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500}
           className="hover:text-blue-400 cursor-pointer">
              Contact
          </ScrollLink>

          {session ? (
            <Link href="/" 
            onClick={() => { handleLogout(); toggleMenu(); }}
             className="block mt-2 w-full hover:text-blue-400">
              Déconnexion
            </Link>
          ) : (
            <Link href="/auth/login" 
            onClick={() => { handleLogin(); toggleMenu(); }} 
            className="block mt-2 w-full hover:text-blue-400">
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
