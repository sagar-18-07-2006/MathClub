import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MentorIntro.css'

gsap.registerPlugin(ScrollTrigger)

export default function MentorIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states to avoid flashes
      gsap.set('.mentor__header', { opacity: 0, y: -100 })
      gsap.set('.mentor__text p', { opacity: 0, y: 40 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
      .to('.mentor__header', { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.1)' })
      .to('.mentor__text p', { opacity: 1, y: 0, duration: 0.8, stagger: 0.25, ease: 'power3.out' })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="mentor section" ref={sectionRef}>
      <div className="container">
        <div className="mentor__header">
          <p className="mentor__eyebrow">Meet the core committee</p>
          <h2 className="mentor__title">Mathematics Club Mentor</h2>
        </div>
        <div className="mentor__text">
          <p>
            Academic mentorship keeps the club focused on depth, discipline, and long-term mathematical growth.
            Our faculty advisor provides research direction, supports mathematical workshops, and guides students
            in connecting foundational theory with advanced modern applications.
          </p>
          <p>
            Under academic guidance, the Mathematics Club fosters an environment of rigorous proof, collaborative
            problem solving, and creative exploration of mathematics. We organize weekly contests, seminars, and
            workshops to build a strong mathematical community at IIIT Raichur.
          </p>
        </div>
      </div>
    </section>
  )
}
