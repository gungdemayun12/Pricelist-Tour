import { useEffect, useRef, useState } from 'react'
import { companyInfo } from './data'

function HomePage({ tours, onSelectTour }) {
  const packagesRef = useRef(null)
  const cardsRef = useRef([])
  const [counts, setCounts] = useState({ tours: 0, rating: 0 })
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    cardsRef.current.forEach((card) => { if (card) observer.observe(card) })


    const duration = 2000;
    const tourTarget = tours.length;
    const ratingTarget = 4.9;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounts({
        tours: Math.floor(progress * tourTarget),
        rating: (progress * ratingTarget).toFixed(1)
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);

    return () => observer.disconnect()
  }, [tours.length, selectedCategory])

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const filteredTours = selectedCategory === 'all'
    ? tours
    : tours.filter(t => t.category === selectedCategory);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" id="hero">
        <div className="absolute inset-0">
          <img src="/cover.webp" alt="Bali Traditional Culture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs sm:text-sm font-body tracking-[0.3em] uppercase font-medium">Authentic Bali Travel</span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-white">Discover The</span><br />
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">Magic of Bali</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.6s' }}>
            Find your dream destination with us. Best tour packages with premium services for an unforgettable travel experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button onClick={scrollToPackages} className="group px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-white font-bold rounded-full hover:from-gold-dark hover:to-gold-dark shadow-gold-lg hover:shadow-gold-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2" id="hero-cta">
              <span>View Tour Packages</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <button onClick={scrollToPackages} className="px-8 py-4 border-2 border-gold/50 text-gold hover:bg-gold hover:text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105" id="hero-cta-secondary">Explore Tours</button>
          </div>

          <div className="mt-16 flex justify-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="text-center px-10">
              <div className="text-gold font-heading text-4xl sm:text-5xl font-bold">{counts.tours}+</div>
              <div className="text-gray-400 text-sm sm:text-base mt-1 uppercase tracking-widest font-medium">Unique Tours</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button onClick={scrollToPackages} className="text-gold/60 hover:text-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section ref={packagesRef} id="packages" className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Best Destinations</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark-text mb-4">Choose Your <span className="text-gold">Tour Category</span></h2>
            <p className="text-secondary-text max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-10">Choose the travel package that fits your dreams. Each package is designed with a premium experience.</p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'all', label: 'All Tours' },
                { id: 'package', label: 'Package Tour' },
                { id: 'non-package', label: 'Non-Package' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat.id
                    ? 'bg-gold text-white shadow-gold-lg'
                    : 'bg-white text-secondary-text border border-gold/20 hover:border-gold hover:text-gold'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredTours.map((tour, index) => (
              <div key={tour.id} ref={(el) => (cardsRef.current[index] = el)} className="opacity-0 translate-y-8 transition-all duration-700 ease-out h-full" style={{ transitionDelay: `${index * 150}ms` }}>
                <TourCard tour={tour} onSelect={onSelectTour} />
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-16 md:py-24 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-gold/10 shadow-gold-sm animate-fade-in max-w-4xl mx-auto px-6">
              {selectedCategory === 'non-package' ? (
                <>
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-dark-text mb-4">Customized & Non-Package Tours</h3>
                  <p className="text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                    We understand that every journey is unique. For non-package tours, feel free to discuss your travel plans with us. We are ready to arrange destinations according to your wishes and needs to make your Bali experience truly personal and unforgettable.
                  </p>
                  <a
                    href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Bali Tour Package, I'm interested in a custom tour!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    <span>Customize Your Tour</span>
                  </a>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">📭</div>
                  <h3 className="font-heading text-xl font-bold text-dark-text mb-2">No tour packages available</h3>
                  <p className="text-secondary-text text-sm">Sorry, this category doesn't have any tours yet. Please try another category.</p>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="mt-6 text-gold font-bold hover:underline"
                  >
                    View All Packages
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>


      <WhyUsSection />


      <CtaBanner onViewPackages={scrollToPackages} />
    </main>
  )
}

function TourCard({ tour, onSelect }) {
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-gold hover:shadow-gold-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gold/5 hover:border-gold/20 flex flex-col h-full" onClick={() => onSelect(tour)} id={`tour-card-${tour.id}`}>
      <div className="relative overflow-hidden h-32 sm:h-52 flex-shrink-0">
        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5">
          <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md flex items-center gap-1 sm:gap-1.5 w-fit">
            <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            <span className="text-[10px] sm:text-xs font-bold text-dark-text">{tour.location.split(',')[0]}</span>
          </div>
          {tour.isExclusive && (
            <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gold text-white rounded-full shadow-gold-sm flex items-center gap-1 w-fit">
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tighter">Exclusive Tour</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-0.5 sm:px-3 sm:py-1 bg-gold/90 text-white rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
          {tour.category}
        </div>
      </div>
      <div className="p-3 sm:p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-sm sm:text-xl font-bold text-dark-text mb-1 sm:mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2 min-h-[2.5em] sm:min-h-0">{tour.name}</h3>
        <p className="text-secondary-text text-[11px] sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed hidden sm:block">{tour.description.substring(0, 80)}...</p>
        <div className="mt-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-3 sm:mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="font-heading text-base sm:text-2xl font-bold text-gold leading-tight">{tour.price}</div>
              <span className="text-[10px] sm:text-xs text-secondary-text">{tour.priceNote}</span>
            </div>
            <button className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gold to-gold-dark text-white text-[10px] sm:text-sm font-bold rounded-full hover:from-gold-dark hover:to-gold-dark shadow-gold hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center gap-1" id={`btn-detail-${tour.id}`}>
              <span>Details</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhyUsSection() {
  const features = [
    { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, title: 'Expert Guide & Driver', desc: 'Highly experienced local drivers and professional guides for a safe journey.' },
    { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />, title: 'Maximum Service', desc: 'Dedicated hospitality and top-notch service to ensure your ultimate satisfaction.' },
    { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />, title: 'Affordable Price', desc: 'Premium tour experiences at accessible rates.' },
  ]
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Why Choose Us</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark-text">Our <span className="text-gold">Advantages</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div key={i} className="group text-center p-8 rounded-2xl bg-cream/50 hover:bg-cream border border-gold/5 hover:border-gold/20 hover:shadow-gold-lg transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold-light/20 to-gold/20 flex items-center justify-center text-gold group-hover:from-gold group-hover:to-gold-dark group-hover:text-white transition-all duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-dark-text mb-3">{item.title}</h3>
              <p className="text-secondary-text text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner({ onViewPackages }) {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 mb-12 md:mb-20">
      <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden shadow-gold-xl">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1200&auto=format&fit=crop" alt="CTA background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
        </div>
        <div className="relative z-10 py-16 md:py-24 max-w-3xl mx-auto text-center px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Ready For Your <span className="text-gold">Next Adventure?</span></h2>
          <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">Contact us now and get special offers for your dream journey in Bali.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Bali Tour Package, I'm interested in your tour offers!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:from-green-600 hover:to-green-700 shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              <span>WhatsApp Us</span>
            </a>
            <button onClick={onViewPackages} className="px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105">View All Packages</button>
          </div>
        </div>
      </div>
    </section>
  )
}


export default HomePage

