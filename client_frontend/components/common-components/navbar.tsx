// components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MapPin, Phone, Clock, ChevronDown, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '#'},
    { name: 'Services', href: '#'},
    { name: 'Testimonials', href: '/testimonials' },
    { 
      name: 'Menu List', 
      href: '/menu',
      submenu: [
        { name: 'Why Choose Us?', href: '#' },
        { name: 'How We Recruit?', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'VSF Resource Library', href: '#' },
        { name: 'VSF Three Divisions', href: '#' },
        { name: 'VSF Goes Nationwide!', href: '#' },
        { name: 'Employment', href: '#' },
      ]
    },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Employment Application', href: '/careers/apply' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleMobileSubmenu = (itemName: string) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === itemName ? null : itemName);
  };

  return (
    <>
      {/* Main Header with all elements in one row */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md py-2 shadow-xl' 
          : 'bg-black/50 backdrop-blur-sm py-1'
      }`}>
        <div className="container mx-auto px-4">
          {/* Top Row: Contact Info - Logo - Business Hours & Social */}
          <div className="flex items-center justify-between py-1 border-b border-gray-700">
            {/* Left Side - Address & Phone */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300 text-sm"><a 
                  href="https://maps.app.goo.gl/uSR8odXD56PMeaNC7" target='_blank' 
                  className="text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                >7544 Diplomat Dr #101, Manassas, VA 20109</a></span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <a 
                  href="tel:8007860395" 
                  className="text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                >
                  (800) 786-0395
                </a>
              </div>
            </div>

            {/* Logo - Center with responsive sizing */}
            <div className="">
              <Link href="/" className="flex items-center">
                <div className="relative">
                  {/* Desktop: Large Logo */}
                  <div className="hidden lg:block relative w-100 h-auto">
                    <Image 
                      src="/images/logo.png" 
                      alt="Company Logo"  
                      className="w-full"
                      priority
                      width={500}
                      height={40}
                    />
                  </div>
                  
                  {/* Mobile: Small Logo */}
                  <div className="lg:hidden relative w-60 h-auto">
                    <Image 
                      src="/images/logo.png" 
                      alt="Company Logo" 
                      className="object-contain"
                      priority
                       width={300}
                      height={40}
                    />
                  </div>
                  
                  {/* Logo Glow Effect */}
                  <div className="absolute inset-0 bg-yellow-500/10 blur-xl rounded-lg -z-10"></div>
                </div>
              </Link>
            </div>

            {/* Right Side - Business Hours & Social Media */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Mon - Fri: 9AM - 6PM</span>
              </div>
              
               <ul className="flex justify-start lg:justify-center gap-6">
        <li>
            <a
                href="https://www.facebook.com/pages/VSF/160758390617323?__mref=message_bubble"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/images/facebook-img.png"
                    alt="Facebook"
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                />
            </a>
        </li>

        <li>
            <a
                href="https://twitter.com/vsfus"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/images/twitter-img.png"
                    alt="Twitter"
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                />
            </a>
        </li>

        <li>
            <a
                href="https://www.linkedin.com/company/virginia-surveillance-force"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/images/linkedin-img.png"
                    alt="LinkedIn"
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                />
            </a>
        </li>

        <li>
            <a
                href="https://www.youtube.com/channel/UCHi7o-he252fKlxkMGloQtw"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/images/youtube-img.png"
                    alt="YouTube"
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                />
            </a>
        </li>
    </ul>
            </div>

            {/* Mobile Menu Button Only */}
            <div className="flex lg:hidden items-center ml-auto">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation - Centered */}
          <div className="hidden lg:flex justify-center py-4">
            <nav className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group" ref={mobileMenuRef}>
                  {item.submenu ? (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center px-4 py-2 text-gray-200 hover:text-yellow-400 transition-all duration-200 font-medium text-sm uppercase tracking-wider"
                    >
                      {item.name}
                      {item.submenu && (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 text-gray-200 hover:text-yellow-400 transition-all duration-200 font-medium text-sm uppercase tracking-wider"
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {item.submenu && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 top-full pt-2 transition-all duration-200 ${
                      activeDropdown === item.name 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      <div className="bg-black/95 backdrop-blur-sm border border-yellow-500/20 rounded-lg shadow-2xl py-2 min-w-[220px]">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-5 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors duration-150 text-sm"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Request A Quote Button - Desktop Only */}
              <Link
                href="/request-quote"
                className="ml-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                Request A Quote
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - FIXED VERSION */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setIsMenuOpen(false);
              setMobileOpenSubmenu(null);
            }}
          />
          
          {/* Menu Panel - Scrollable Container */}
          <div className="absolute top-0 left-0 h-full w-full max-w-sm overflow-hidden">
            <div className="relative h-full w-full bg-black/95 border-r border-yellow-500/20 shadow-2xl flex flex-col">
              {/* Fixed Header Section */}
              <div className="flex-shrink-0 p-6 border-b border-yellow-500/20 bg-black/95">
                {/* Mobile Menu Header - Logo and Close Button */}
                <div className="flex items-center justify-between">
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMobileOpenSubmenu(null);
                    }}
                    className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 pt-0">
                  {/* Mobile Contact Info */}
                  <div className="mb-6 pb-6 border-b border-gray-800/50">
                  

                    
                  </div>

                  {/* Mobile Menu Items */}
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <div key={item.name} className="border-b border-gray-800/30 last:border-0">
                        {item.submenu ? (
                          <div className="py-3">
                            <button
                              onClick={() => toggleMobileSubmenu(item.name)}
                              className="flex items-center justify-between w-full text-left text-gray-300 hover:text-yellow-400 transition-colors text-base font-medium"
                            >
                              <span>{item.name}</span>
                              <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
                                mobileOpenSubmenu === item.name ? 'rotate-90' : ''
                              }`} />
                            </button>
                            
                            {/* Mobile Submenu - Only opens on click */}
                            <div className={`overflow-hidden transition-all duration-200 ${
                              mobileOpenSubmenu === item.name ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="ml-4 space-y-1 pb-1">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block py-2 text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setMobileOpenSubmenu(null);
                                    }}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="py-3">
                            <Link
                              href={item.href}
                              className="flex items-center justify-between w-full text-gray-300 hover:text-yellow-400 transition-colors text-base font-medium"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setMobileOpenSubmenu(null);
                              }}
                            >
                              {item.name}
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <a 
                          href="https://maps.app.goo.gl/uSR8odXD56PMeaNC7" target='_blank' 
                          className="text-gray-300 text-sm hover:text-yellow-400 font-medium"
                        >
                          7544 Diplomat Dr #101, Manassas, VA 20109
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <a 
                          href="tel:8007860395" 
                          className="text-gray-300 text-sm hover:text-yellow-400 font-medium"
                        >
                          (800) 786-0395
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Mon - Fri: 9:00 AM - 6:00 PM
                        </span>
                      </div>
                    </div>
                    

                  {/* Mobile Request Quote Button */}
                  <div className="mt-8 pb-6">
                    <Link
                      href="/request-quote"
                      className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold px-6 py-3 rounded-full text-sm uppercase tracking-wider text-center transition-all duration-200"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenSubmenu(null);
                      }}
                    >
                      Request A Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;