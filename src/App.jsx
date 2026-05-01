import { useState, useEffect } from 'react'
import { tourPackages, companyInfo } from './data'
import HomePage from './HomePage'
import DetailPage from './DetailPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedTour, setSelectedTour] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle URL Routing
  useEffect(() => {
    const handleRouting = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/tour/')) {
        const id = parseInt(hash.split('/').pop())
        const tour = tourPackages.find(p => p.id === id)
        if (tour) {
          setSelectedTour(tour)
          setCurrentPage('detail')
          setIsMobileMenuOpen(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }
      // Default to home
      setCurrentPage('home')
      setSelectedTour(null)
      setIsMobileMenuOpen(false)
      // Only scroll to top if we were on a detail page
      if (currentPage === 'detail') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    handleRouting()
    window.addEventListener('hashchange', handleRouting)
    return () => window.removeEventListener('hashchange', handleRouting)
  }, [currentPage])

  const navigateToDetail = (tour) => {
    window.location.hash = `#/tour/${tour.id}`
  }

  const navigateToHome = () => {
    window.location.hash = '#/'
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }


  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden'
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = isMobileMenuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen font-body text-dark-text">


      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || currentPage !== 'home' ? 'bg-white/95 backdrop-blur-md border-b border-gold/10 shadow-sm py-0' : 'bg-transparent py-2 md:py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <button
              onClick={navigateToHome}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-gold">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className={`font-heading text-xl md:text-2xl font-bold transition-colors ${isScrolled || currentPage !== 'home' ? 'text-dark-text' : 'text-white'}`}>
                BALI<span className="text-gold"> TOUR PACKAGE</span>
              </span>
            </button>

            {/* Nav Links – Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={navigateToHome}
                className={`text-sm font-medium transition-colors ${currentPage === 'home' && !isScrolled ? 'text-white/90 hover:text-white' : (currentPage === 'home' ? 'text-gold' : 'text-secondary-text hover:text-gold')}`}
              >
                Home
              </button>
              <a
                href="#packages"
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault()
                    navigateToHome()
                    setTimeout(() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }), 100)
                  }
                }}
                className={`text-sm font-medium transition-colors ${isScrolled || currentPage !== 'home' ? 'text-secondary-text hover:text-gold' : 'text-white/90 hover:text-white'}`}
              >
                Tours
              </a>
            </div>

            {/* CTA Button – Desktop */}
            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Bali Tour Package, I'm interested in booking a tour.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-white text-sm font-bold rounded-full hover:from-gold-dark hover:to-gold-dark shadow-gold hover:shadow-gold-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </a>

            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled || currentPage !== 'home' ? 'text-gold hover:bg-gold/10' : 'text-white bg-black/20 hover:bg-black/30'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
                }
              </svg>
            </button>
          </div>
        </div>
      </nav>


      <div
        className={`fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[210] w-[280px] sm:w-[320px] bg-white/80 backdrop-blur-xl shadow-2xl
          flex flex-col transition-transform duration-500 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-heading text-base font-bold text-dark-text tracking-tight">
              BALI<span className="text-gold"> TOUR</span>
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            aria-label="Close menu"
            className="p-2 rounded-lg text-secondary-text hover:text-gold hover:bg-gold/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
          <button
            onClick={() => { navigateToHome() }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-heading font-semibold text-base transition-all
              ${currentPage === 'home'
                ? 'bg-gold/10 text-gold'
                : 'text-dark-text hover:bg-gold/5 hover:text-gold'}`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>

          <a
            href="#packages"
            onClick={(e) => {
              toggleMobileMenu()
              if (currentPage !== 'home') {
                e.preventDefault()
                navigateToHome()
                setTimeout(() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }), 300)
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-heading font-semibold text-base text-dark-text hover:bg-gold/5 hover:text-gold transition-all"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tours
          </a>

          <div className="pt-6">
            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Bali Tour Package, I have a question about your tour packages.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMobileMenu}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-gold-dark text-white font-bold rounded-2xl shadow-gold hover:shadow-gold-lg transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.856L.054 23.428a.5.5 0 00.518.572l5.704-1.453A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.032-1.387l-.36-.214-3.733.951.986-3.626-.235-.373A9.797 9.797 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
              </svg>
              Book via WhatsApp
            </a>
          </div>
        </nav>


        <div className="px-6 py-6 bg-gray-50 border-t border-gold/10">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-4 font-bold">Connect With Us</p>
          <div className="flex justify-center gap-6">
            {Object.entries(companyInfo.social).map(([s]) => (
              <div
                key={s}
                className="w-10 h-10 rounded-full bg-white border border-gold/20 flex items-center justify-center text-secondary-text transition-all duration-300 shadow-sm"
              >
                <span className="sr-only">{s}</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {s === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28-.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  )}
                  {s === 'facebook' && (
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  )}
                  {s === 'tiktok' && (
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.47 6.47 0 01-1.84-1.63v7.9c-.04 2.1-.81 4.23-2.39 5.61-1.55 1.43-3.79 2-5.87 1.62-2.1-.34-4.08-1.71-5.02-3.62-1.04-2.01-.93-4.57.25-6.49 1.15-1.91 3.32-3.21 5.56-3.24.16 0 .31 0 .47.01v4.06c-1.4-.04-2.88.52-3.67 1.69-.74 1.05-.72 2.48-.05 3.5.7 1.07 1.99 1.74 3.28 1.63 1.25-.07 2.42-.92 2.78-2.12.11-.32.16-.65.16-.98V.02z" />
                  )}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>


      {currentPage === 'home' && <HomePage tours={tourPackages} onSelectTour={navigateToDetail} />}
      {currentPage === 'detail' && <DetailPage tour={selectedTour} onBack={navigateToHome} />}

      <footer id="footer" className="bg-dark-text text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-heading text-xl font-bold uppercase tracking-tight">
                  BALI<span className="text-gold"> TOUR PACKAGE</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                Experience the authentic heart of Bali with our curated traditional tours and professional local guides. Customer satisfaction is our top priority.
              </p>
              <div className="flex items-center gap-4">
                {Object.entries(companyInfo.social).map(([s]) => (
                  <div
                    key={s}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      {s === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28-.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                      {s === 'facebook' && <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />}
                      {s === 'tiktok' && <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.47 6.47 0 01-1.84-1.63v7.9c-.04 2.1-.81 4.23-2.39 5.61-1.55 1.43-3.79 2-5.87 1.62-2.1-.34-4.08-1.71-5.02-3.62-1.04-2.01-.93-4.57.25-6.49 1.15-1.91 3.32-3.21 5.56-3.24.16 0 .31 0 .47.01v4.06c-1.4-.04-2.88.52-3.67 1.69-.74 1.05-.72 2.48-.05 3.5.7 1.07 1.99 1.74 3.28 1.63 1.25-.07 2.42-.92 2.78-2.12.11-.32.16-.65.16-.98V.02z" />}
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div id="contact-footer">
              <h4 className="font-heading text-lg font-semibold text-gold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>{companyInfo.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="leading-relaxed">{companyInfo.address}</span>
                </li>
              </ul>
            </div>
          </div>


          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} {companyInfo.shortName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App