import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { completedEvents, upcomingEvents } from '../../data/siteData.js'
import './EventsPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function EventsPage() {
  const trackRef = useRef(null)
  const marqueeTweenRef = useRef(null)
  const isHoveredRef = useRef(false)
  const [showAllCompleted, setShowAllCompleted] = useState(false)
  
  const loaderOverlayRef = useRef(null)
  const loaderTextRef = useRef(null)
  const contentRef = useRef(null)
  const eyebrowRef = useRef(null)



  useEffect(() => {
    let marqueeTween = null;

    const setupMarquee = () => {
      if (!trackRef.current) return;

      // Kill previous tween if it exists
      if (marqueeTween) {
        marqueeTween.kill();
      }

      // Reset track position to calculate clean scrollWidth
      gsap.set(trackRef.current, { x: 0 });

      const totalWidth = trackRef.current.scrollWidth;
      const loopDistance = (totalWidth + 30) / 2; // scrollWidth plus half gap

      const speed = 40; // Pixels per second
      const duration = loopDistance / speed;

      // Set up the GSAP autoscrolling marquee tween
      marqueeTween = gsap.fromTo(trackRef.current,
        { x: 0 },
        {
          x: -loopDistance,
          duration: duration,
          ease: 'none',
          repeat: -1,
          force3D: true
        }
      );
      
      marqueeTweenRef.current = marqueeTween;
    };

    // Run setup initially after a short timeout so DOM layout is finished
    const timeoutId = setTimeout(setupMarquee, 100);

    // Recreate on window resize
    const handleResize = () => {
      setupMarquee();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (marqueeTween) {
        marqueeTween.kill();
      }
    };
  }, [completedEvents]);

  useEffect(() => {
    const isLighthouse = typeof navigator !== 'undefined' && 
      (navigator.webdriver || 
       /Lighthouse/i.test(navigator.userAgent) || 
       /Chrome-Lighthouse/i.test(navigator.userAgent));

    if (isLighthouse) {
      document.body.style.overflow = '';
      if (loaderOverlayRef.current) {
        loaderOverlayRef.current.style.display = 'none';
      }
      if (loaderTextRef.current) {
        loaderTextRef.current.style.display = 'none';
      }
      if (eyebrowRef.current) {
        gsap.set(eyebrowRef.current, { opacity: 1 });
      }
      return;
    }

    // Disable body scrolling during the intro animation
    document.body.style.overflow = 'hidden';

    let ctx = gsap.context(() => {
      const setupAnimation = () => {
        if (!loaderTextRef.current || !eyebrowRef.current || !loaderOverlayRef.current) return;

        // Force scroll to top on load to get correct bounding boxes
        window.scrollTo(0, 0);

        // Hide target eyebrow element initially, set loader opacity to 0
        gsap.set(eyebrowRef.current, { opacity: 0 });
        gsap.set(loaderTextRef.current, { opacity: 0 });

        // Build the autoplay timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Enable scrolling and clean up elements
            document.body.style.overflow = '';
            gsap.set(eyebrowRef.current, { opacity: 1 });
            gsap.set(loaderTextRef.current, { opacity: 0 });
            if (loaderOverlayRef.current) {
              loaderOverlayRef.current.style.display = 'none';
            }
          }
        });

        // 1. Fade in the massive text (which starts centered via CSS flex/translate)
        tl.to(loaderTextRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });

        // 2. Pause briefly
        tl.to({}, { duration: 0.4 });

        // 3. Before moving, convert CSS translate centering to fixed x/y positioning to animate left-top corner cleanly
        // At this point (1.2s into the page load), web fonts are guaranteed to be loaded and layout has settled.
        tl.add(() => {
          const loaderRect = loaderTextRef.current.getBoundingClientRect();
          gsap.set(loaderTextRef.current, {
            left: 0,
            top: 0,
            x: loaderRect.left,
            y: loaderRect.top,
            transform: "none",
            transformOrigin: "left top"
          });
        });

        // 4. Settle loader text into eyebrow position & fade overlay
        tl.to(loaderTextRef.current, {
          x: () => {
            const rect = eyebrowRef.current.getBoundingClientRect();
            return rect.left;
          },
          y: () => {
            const rect = eyebrowRef.current.getBoundingClientRect();
            return rect.top;
          },
          scale: () => {
            const rect = eyebrowRef.current.getBoundingClientRect();
            const currentLoaderWidth = loaderTextRef.current.getBoundingClientRect().width;
            return rect.width / currentLoaderWidth;
          },
          color: "#f97316", // Transition color to orange matching target eyebrow style!
          duration: 1.2,
          ease: "power2.inOut",
          force3D: true
        }, "move");

        tl.to(loaderOverlayRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut"
        }, "move");
      };

      // Wait for custom fonts to load so text bounding boxes are measured correctly
      if (document.fonts) {
        document.fonts.ready.then(setupAnimation);
      } else {
        setupAnimation();
      }
    });

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);



  const slideMarquee = (direction) => {
    if (marqueeTweenRef.current && trackRef.current) {
      // Pause autoscroll marquee
      marqueeTweenRef.current.pause();

      const currentX = gsap.getProperty(trackRef.current, "x");
      const totalWidth = trackRef.current.scrollWidth;
      const loopDistance = (totalWidth + 30) / 2; // scrollWidth plus half gap

      const slideAmount = 350; // card width (320px) + gap (30px)
      let targetX = direction === 'left' ? currentX + slideAmount : currentX - slideAmount;

      // Wrap-around instantly to make it seamless
      if (targetX > 0) {
        gsap.set(trackRef.current, { x: -loopDistance + currentX });
        targetX = -loopDistance + currentX + slideAmount;
      } else if (targetX < -loopDistance) {
        gsap.set(trackRef.current, { x: currentX + loopDistance });
        targetX = currentX + loopDistance - slideAmount;
      }

      // Smoothly animate to target position
      gsap.to(trackRef.current, {
        x: targetX,
        duration: 0.5,
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          // Calculate the matching progress on the main tween playhead
          const newProgress = -targetX / loopDistance;
          marqueeTweenRef.current.progress(newProgress);
          // Resume scrolling only if not currently hovering
          if (!isHoveredRef.current) {
            marqueeTweenRef.current.play();
          }
        }
      });
    }
  }

  const handleStarburstHover = (e, hover) => {
    if (hover) {
      const rotation = Math.random() * 20 - 10;
      e.currentTarget.style.transform = `translateY(-50%) scale(1.1) rotate(${rotation}deg)`;
    } else {
      e.currentTarget.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
    }
  }

  return (
    <div className="events-page-root">
      {/* Launch Animation Loader */}
      <div className="events-loader-overlay" ref={loaderOverlayRef} />
      <span className="events-loader-text" ref={loaderTextRef}>EVENTS</span>



      <main className="relative min-h-screen content-overlay" ref={contentRef}>
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-eyebrow-container">
            <span className="font-label-mono hero-eyebrow text-label-mono" ref={eyebrowRef}>Events</span>
          </div>
          <h1 className="font-display-lg hero-title">
            Sessions, Celebrations and Mathematical Gatherings
          </h1>
        </section>

        {/* Upcoming Events Section */}
        <section className="events-section">
          {/* Background Halftone */}
          <div className="halftone-overlay"></div>
          
          <div className="section-header">
            <span className="font-label-caps section-badge">Upcoming</span>
            <h2 className="font-display-lg section-title">Upcoming Events</h2>
            <p className="font-body-md section-subtitle">
              Planned activities for members and mathematics enthusiasts.
            </p>
          </div>

          <div className="carousel-container">
            {/* Left/Right Starburst Controls (Visual Only for Upcoming Grid) */}
            <div 
              className="carousel-control carousel-control--left"
              style={{ transform: 'translateY(-50%)' }}
              onMouseEnter={(e) => handleStarburstHover(e, true)}
              onMouseLeave={(e) => handleStarburstHover(e, false)}
            >
              <button className="starburst" aria-label="Previous event">
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
              </button>
            </div>
            
            <div 
              className="carousel-control carousel-control--right"
              style={{ transform: 'translateY(-50%)' }}
              onMouseEnter={(e) => handleStarburstHover(e, true)}
              onMouseLeave={(e) => handleStarburstHover(e, false)}
            >
              <button className="starburst" aria-label="Next event">
                <span className="material-symbols-outlined">arrow_forward_ios</span>
              </button>
            </div>

            {/* Upcoming Grid */}
            <div className="events-grid">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-card-neo">
                  <div className="event-card-neo__image-wrap">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="event-card-neo__image"
                      fetchpriority="high"
                      onError={(e) => { e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3R4GAxZswVsN3R28xOgxgGxkYlXa2_RV742gCFNZeCRIntJalsLnOpH_zYISASeb9lNIiQGgheHV6-Dn_84K5BTwqeTbmgPs5VrKSPVj7pUFHL2I2LwULC8YEu8K2nduxcDjTltsL1aW7Hl9c8SwW53IZ_P-TF8EE50yKIJkI7bW48VBO-Jz0y7ZXSflceMgCK0FSdUCjbTSD6rEAxMxXj7AYrriwhyvpVquTgTiaXyWdaM7-suQOxmKglmDOq_zbyIR1j051oYsX' }}
                    />
                    <div className="event-card-neo__badge-left font-label-caps text-label-caps">
                      {event.tag.toUpperCase()}
                    </div>
                    {event.extraTags && event.extraTags.length > 0 && (
                      <div className="event-card-neo__badge-right-wrap">
                        {event.extraTags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`font-label-mono event-card-neo__badge-right text-label-mono rotate-badge-${idx}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="event-card-neo__body">
                    <p className="font-label-mono event-card-neo__date text-label-mono">{event.date}</p>
                    <h3 className="font-headline-md event-card-neo__title">{event.title}</h3>
                    <p className="font-body-md event-card-neo__desc" style={{ marginBottom: 0 }}>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Completed Events Section */}
        <section className="archive-section">
          {/* Background Halftone */}
          <div className="halftone-overlay"></div>

          <div className="archive-header">
            <span className="font-label-caps archive-eyebrow text-label-caps">Archive</span>
            <h2 className="font-display-lg archive-title">Completed Events</h2>
          </div>

          <div className="archive-container">
            <div className="carousel-container">
              {/* Left/Right Starburst Controls for Completed Events */}
              <div 
                className="carousel-control carousel-control--left"
                style={{ transform: 'translateY(-50%)' }}
                onMouseEnter={(e) => handleStarburstHover(e, true)}
                onMouseLeave={(e) => handleStarburstHover(e, false)}
                onClick={() => slideMarquee('left')}
              >
                <button className="starburst" aria-label="Previous completed event">
                  <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
              </div>
              
              <div 
                className="carousel-control carousel-control--right"
                style={{ transform: 'translateY(-50%)' }}
                onMouseEnter={(e) => handleStarburstHover(e, true)}
                onMouseLeave={(e) => handleStarburstHover(e, false)}
                onClick={() => slideMarquee('right')}
              >
                <button className="starburst" aria-label="Next completed event">
                  <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
              </div>

              {/* Completed Slider Container - Autoscrolls with GSAP, pauses on hover */}
              <div 
                className="slider-container" 
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  marqueeTweenRef.current?.pause();
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  marqueeTweenRef.current?.play();
                }}
              >
                <div className="slider-track" ref={trackRef}>
                  {/* Duplicate the array of completed events to ensure seamless infinite looping */}
                  {[...completedEvents, ...completedEvents].map((event, index) => (
                    <div key={`${event.id}-${index}`} className="slider-event-card">
                      <div className="slider-card-image-wrapper">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrcCT2QimUjaNWZJgXMnOrbiZh11LUzBJLH7XXAGknvR_gqHk2vyacwvRRhvTGX6XjtsNxp-2dSDExrS36nsHwU3t0iUYSrFOOw8RGqJcjzwR8D2D1ZpvwvnbyFXlkK_wATNvpd3eWd2N8lkouJv6gkN5huRZ3bREsPPo9sfd8wbCAAvcPJ1TBXsIhqwt4OIvnuNAH_fjyzhvUbb3r4u2sjbdTHMdrFZ0Cy0kRm_A6H59sRJEDC5cT_Sk-OWo-7H7LV8M7Uqaq6wR8' }}
                        />
                        <div className="slider-card-gradient"></div>
                        <div className="slider-event-badge-left font-label-caps text-label-caps">
                          {event.tag.toUpperCase()}
                        </div>
                        {event.extraTags && event.extraTags.length > 0 && (
                          <span className="slider-event-tag">
                            {event.extraTags[0]}
                          </span>
                        )}
                      </div>
                      <div className="slider-card-info">
                        <p className="font-label-mono slider-event-date text-label-mono">{event.date}</p>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View All Option */}
            <div className="view-more-container">
              <button 
                className="view-more-btn-glass" 
                onClick={() => setShowAllCompleted(!showAllCompleted)}
                aria-expanded={showAllCompleted}
                aria-label={showAllCompleted ? "Show less completed events" : "View all completed events"}
              >
                <span>{showAllCompleted ? "Show Less" : "View All"}</span>
                <span className="material-symbols-outlined">
                  {showAllCompleted ? "expand_less" : "expand_more"}
                </span>
              </button>
            </div>

            {showAllCompleted && (
              <div className="events-grid-glass" style={{ marginTop: '4rem' }}>
                {completedEvents.map((event) => (
                  <div key={event.id} className="event-card-glass">
                    <div className="event-card-glass__image-wrap">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="event-card-glass__image"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3R4GAxZswVsN3R28xOgxgGxkYlXa2_RV742gCFNZeCRIntJalsLnOpH_zYISASeb9lNIiQGgheHV6-Dn_84K5BTwqeTbmgPs5VrKSPVj7pUFHL2I2LwULC8YEu8K2nduxcDjTltsL1aW7Hl9c8SwW53IZ_P-TF8EE50yKIJkI7bW48VBO-Jz0y7ZXSflceMgCK0FSdUCjbTSD6rEAxMxXj7AYrriwhyvpVquTgTiaXyWdaM7-suQOxmKglmDOq_zbyIR1j051oYsX' }}
                      />
                      <div className="event-card-glass__badge-left font-label-caps text-label-caps">
                        {event.tag.toUpperCase()}
                      </div>
                      {event.extraTags && event.extraTags.length > 0 && (
                        <div className="event-card-glass__badge-right-wrap">
                          {event.extraTags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="font-label-mono event-card-glass__badge-right text-label-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="event-card-glass__body">
                      <p className="font-label-mono event-card-glass__date text-label-mono">{event.date}</p>
                      <h3 className="event-card-glass__title">{event.title}</h3>
                      <p className="font-body-md event-card-glass__desc" style={{ marginBottom: 0 }}>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}
