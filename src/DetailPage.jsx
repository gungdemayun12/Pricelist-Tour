import { useState, useEffect, useRef } from 'react'
import { companyInfo } from './data'

function DetailPage({ tour, onBack }) {
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const timelineRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0')
            entry.target.classList.remove('opacity-0', 'translate-x-8')
          }
        })
      },
      { threshold: 0.2 }
    )
    timelineRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  if (!tour) return null

  const prevImg = () => setActiveImg((p) => (p === 0 ? tour.gallery.length - 1 : p - 1))
  const nextImg = () => setActiveImg((p) => (p === tour.gallery.length - 1 ? 0 : p + 1))

  return (
    <main className="pt-20 md:pt-24">
      {/* HEADER */}
      <section className="bg-cream py-8 md:py-12 border-b border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <button onClick={onBack} className="group flex items-center gap-2 text-gold hover:text-gold-dark font-medium mb-6 transition-colors" id="btn-back">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span>Back to Packages</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                  <span className="text-secondary-text text-sm">{tour.location}</span>
                </div>
                {tour.isExclusive && (
                  <span className="px-3 py-1 bg-gold text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-gold-sm">Exclusive Tour</span>
                )}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark-text">{tour.name}</h1>
            </div>
            <div className="text-left md:text-right">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-gold">{tour.price}</div>
              <div className="text-secondary-text text-sm">{tour.priceNote} &middot; {tour.duration}</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY CAROUSEL */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-gold-lg group cursor-pointer" onClick={() => setLightbox(true)}>
            <img src={tour.gallery[activeImg]} alt={`${tour.name} - ${activeImg + 1}`} className="w-full h-64 sm:h-80 md:h-[450px] object-cover transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              📷 Click to enlarge
            </div>
            {/* Arrows */}
            <button onClick={(e) => { e.stopPropagation(); prevImg() }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-white text-dark-text transition-all opacity-0 group-hover:opacity-100" id="gallery-prev">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImg() }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-white text-dark-text transition-all opacity-0 group-hover:opacity-100" id="gallery-next">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
            {tour.gallery.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === activeImg ? 'border-gold shadow-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`} id={`thumb-${i}`}>
                <img src={img} alt={`Thumb ${i + 1}`} className="w-14 h-10 sm:w-20 sm:h-14 object-cover" />
              </button>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {tour.gallery.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`rounded-full transition-all duration-300 ${i === activeImg ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-gold/30 hover:bg-gold/60'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10" onClick={() => setLightbox(false)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImg() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <img src={tour.gallery[activeImg]} alt={`Fullscreen ${activeImg + 1}`} className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); nextImg() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {tour.gallery.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i) }} className={`rounded-full transition-all ${i === activeImg ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} />
            ))}
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Information</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark-text mb-6">About This Package</h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-gold border border-gold/5 mb-10">
            {tour.description.split('\n\n').map((p, i) => (
              <p key={i} className="text-dark-text leading-relaxed text-sm sm:text-base mb-4 last:mb-0">{p}</p>
            ))}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-green-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:w-28 group-hover:h-28" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-dark-text">Price Includes</h3>
                </div>
                <ul className="space-y-3">
                  {tour.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary-text text-sm sm:text-base">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Excludes */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-red-50 border-gold/5 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50/50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:w-28 group-hover:h-28" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white shadow-lg shadow-gray-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-dark-text">Price Excludes</h3>
                </div>
                <ul className="space-y-3">
                  {tour.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary-text text-sm sm:text-base">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🕐', label: 'Duration', val: tour.duration },
              { icon: '💰', label: 'Fixed Price', val: tour.price },
              { icon: '📍', label: 'Location', val: tour.location.split(',')[0] },
            ].map((h, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center border border-gold/10 shadow-sm">
                <div className="text-2xl mb-1">{h.icon}</div>
                <div className="text-xs text-secondary-text">{h.label}</div>
                <div className="font-heading font-bold text-dark-text text-sm mt-1">{h.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY TIMELINE */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Schedule</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark-text mb-10">Tour Itinerary</h2>

          <div className="relative">

            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold/20" />

            <div className="space-y-8">
              {tour.itinerary.map((item, i) => (
                <div key={i} ref={(el) => (timelineRefs.current[i] = el)} className="opacity-0 translate-x-8 transition-all duration-700 ease-out" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex gap-4 sm:gap-6 items-start">

                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold z-10">
                      <span className="text-white font-heading font-bold text-sm sm:text-base">{item.day}</span>
                    </div>
                    {/* Content card */}
                    <div className="flex-1 bg-cream rounded-xl p-5 sm:p-6 border border-gold/10 hover:border-gold/30 hover:shadow-gold transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <span className="text-xs font-bold text-gold uppercase tracking-wider">Stop {item.day}</span>
                        <span className="hidden sm:inline text-gold/30">—</span>
                        <h3 className="font-heading text-lg font-bold text-dark-text group-hover:text-gold transition-colors">{item.title}</h3>
                      </div>
                      <p className="text-secondary-text text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 md:py-16 bg-cream border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark-text mb-3">Interested in this package?</h2>
          <p className="text-secondary-text mb-8">Contact us now for booking and more information.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello Bali Tour Package, I would like to book the ${tour.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Book via WhatsApp
            </a>
            <button onClick={onBack} className="px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold rounded-full transition-all duration-300">← View Other Packages</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DetailPage
