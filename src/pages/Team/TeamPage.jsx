import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '../../lib/utils.js'
import { FaGithub, FaSlack, FaTwitter, FaCode, FaUsers, FaUserGraduate } from 'react-icons/fa'
import { members } from '../../data/team.js'
import KineticTextLoader from '../../components/ui/kinetic-text-loader.jsx'
import GlassDock from '../../components/ui/glass-dock.jsx'
import PerspectiveGrid from '../../components/ui/perspective-grid.jsx'
import MagneticSpotlightMarquee from '../../components/ui/magnetic-spotlight-marquee.jsx'
import TableOfContents from '../../components/ui/table-of-contents.jsx'
import AsciiGlitchRipple from '../../components/ui/ascii-glitch-ripple.jsx'
const MATH_IMAGES = [
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=800&auto=format&fit=crop"
];

gsap.registerPlugin(ScrollTrigger)

const defaultImages = [
  '/assets/team/hero-discuss.png',
  '/assets/team/hero-geometry.png',
  '/assets/team/hero-seminar.png',
  '/assets/team/hero-abstract.png',
  '/assets/members/member_3rd_4.jpg',
  '/assets/members/member_3rd_7.jpg',
  '/assets/members/member_3rd_8.jpg',
  '/assets/members/member_3rd_9.jpg',
  '/assets/members/member_3rd_10.jpg'
]

const defaultBentoItems = [
  {
    id: 1,
    title: 'Sagar Maheshwari',
    subtitle: 'Lead Developer',
    description: 'Leads the frontend architecture, component structures, and overall development of the platform.',
    icon: <FaCode className="w-5 h-5" />,
    image: '/assets/members/avatar.svg'
  },
  {
    id: 2,
    title: 'Faculty Advisor',
    subtitle: 'Dr. Mentor',
    description: 'Provides invaluable guidance, academic oversight, and direction for all mathematical projects.',
    icon: <FaUserGraduate className="w-5 h-5" />,
    image: '/assets/team/mentor.png'
  },
  {
    id: 3,
    title: 'Core Coordinators',
    subtitle: 'Math Club Leaders',
    description: 'Coordinates weekly problem sheets, math symposiums, and student-run seminars.',
    icon: <FaUsers className="w-5 h-5" />,
    image: '/assets/team/hero-discuss.png'
  }
]

const makeIcon = (yearNum, isActive) => {
    return () => (
        <span className={cn(
            "text-base font-bold tracking-tight font-sans transition-all duration-300",
            isActive ? "text-[#c9a84c] scale-110 drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]" : "text-zinc-400 hover:text-zinc-200"
        )}>
            {yearNum}
        </span>
    );
};

export function StaggeredGrid({
    images = defaultImages,
    bentoItems = defaultBentoItems,
    centerText = "MATH CLUB",
    credits = {
        madeBy: { text: "IIIT Raichur", href: "https://iiitr.ac.in" },
        moreDemos: { text: "MathClub Page", href: "/" }
    },
    className,
    showFooter = true,
    scroller
}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef(null)
    const textRef = useRef(null)

    // Year Filter State
    const [selectedYear, setSelectedYear] = useState('3rd Yr');

    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)

        // Fallback: if images are already loaded or imagesLoaded doesn't fire
        const fallbackTimer = setTimeout(() => {
            if (!isLoaded) setIsLoaded(true)
        }, 3000)

        return () => {
            clearTimeout(fallbackTimer)
        }
    }, [])

    // Separate effect for grid scroll animations — re-runs on year change
    useEffect(() => {
        if (!isLoaded || !gridFullRef.current) return

        // Kill any previous ScrollTrigger instances for this grid to avoid conflicts
        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger === gridFullRef.current) {
                st.kill()
            }
        })

        // Small delay to let React render the new grid items
        const rafId = requestAnimationFrame(() => {
            const gridFullItems = gridFullRef.current?.querySelectorAll('.grid__item')
            if (!gridFullItems || gridFullItems.length === 0) return

            const numColumns = 7
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item) => {
                const colAttr = item.getAttribute('data-col')
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            // Reset all items to their initial visible state before animating
            gsap.set(gridFullItems, { clearProps: 'all' })

            columns.forEach((columnItems, columnIndex) => {
                if (columnItems.length === 0) return

                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.15

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom-=10%',
                        end: 'top center',
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    }
                })
                .from(columnItems, {
                    yPercent: 150,
                    autoAlpha: 0,
                    delay: delayFactor,
                    ease: 'power2.out',
                    stagger: 0.05,
                })
            })

            ScrollTrigger.refresh()
        })

        return () => {
            cancelAnimationFrame(rafId)
            // Cleanup ScrollTriggers for this grid on unmount or re-run
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === gridFullRef.current) {
                    st.kill()
                }
            })
        }
    }, [isLoaded, selectedYear])

    // Prepare grid items: fill up to the end of Row 3 (21 slots)
    // Filter members based on selected year
    const filteredMembers = members.filter((member) => member.year === selectedYear);

    const minSlots = 14;
    const totalSlots = Math.max(minSlots, Math.ceil(filteredMembers.length / 7) * 7);
    const mixedGridItems = Array.from({ length: totalSlots }, (_, i) => filteredMembers[i] || null);

    const dockItems = [
        {
            title: '1st Yr',
            icon: makeIcon('1', selectedYear === '1st Yr'),
            onClick: () => setSelectedYear('1st Yr')
        },
        {
            title: '2nd Yr',
            icon: makeIcon('2', selectedYear === '2nd Yr'),
            onClick: () => setSelectedYear('2nd Yr')
        },
        {
            title: '3rd Yr',
            icon: makeIcon('3', selectedYear === '3rd Yr'),
            onClick: () => setSelectedYear('3rd Yr')
        },
        {
            title: '4th Yr',
            icon: makeIcon('4', selectedYear === '4th Yr'),
            onClick: () => setSelectedYear('4th Yr')
        }
    ];

    return (
        <div
            className={cn("shadow relative overflow-hidden w-full bg-[#0d1b2e] text-white pt-[calc(var(--navbar-height)+var(--space-12))]", className)}
            style={{
                '--grid-item-translate': '0px',
            }}
        >
            {/* Loading Overlay */}
            <div className={cn(
                "fixed inset-0 bg-[#0d1b2e] z-[999] flex items-center justify-center transition-opacity duration-700 ease-in-out",
                isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                <KineticTextLoader text="LOADING" />
            </div>

            {/* 3D Perspective Grid Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <PerspectiveGrid showOverlay={true} fadeRadius={90} />
            </div>

            <TableOfContents />

            <div id="overview" className="w-full relative">
                <MagneticSpotlightMarquee
                    className="bg-transparent dark:bg-transparent shadow-none"
                    title={["PEOPLE", "BEHIND"]}
                    subtitle={["THE EQUATIONS", "AND ALGORITHMS"]}
                    paragraphs={[
                        [
                            "The minds driving mathematical exploration",
                            "and technical execution at IIIT Raichur.",
                            "From weekly contests to research projects."
                        ],
                        [
                            "We are a community of student coordinators,",
                            "problem setters, designers, and developers",
                            "committed to fostering a rigorous, creative",
                            "culture of abstract mathematics and computing."
                        ]
                    ]}
                    images={MATH_IMAGES}
                />
            </div>

            {/* Faculty in Charge Section */}
            <section id="faculty" className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-12 border-b border-[#1e3457]/30 my-8 relative">
                <div className="flex-1 space-y-4 text-left">
                    <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">Academic Guidance</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Faculty In-Charge</h2>
                    <p className="text-zinc-300 leading-relaxed text-sm md:text-base max-w-xl">
                        Academic mentorship keeps the club focused on depth, discipline, and long-term mathematical growth.
                        Our faculty advisor provides research direction, supports mathematical workshops, and guides students
                        in connecting foundational theory with advanced modern applications.
                    </p>
                </div>
                <div className="w-72 [perspective:800px]">
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-[#1e3457] bg-[#132340] relative flex items-center justify-center transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl hover:border-transparent group cursor-pointer">
                        {/* Faculty Photo */}
                        <img 
                            src="/assets/team/faculty.png" 
                            alt="BHARAT SONI"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Gradient Overlay for Hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />

                        {/* Content Container (Name and Role) */}
                        <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            {/* Name */}
                            <span className="block text-base font-extrabold text-white tracking-wider drop-shadow-md">BHARAT SONI</span>
                            {/* Role */}
                            <span className="block text-[10px] font-medium text-[#c9a84c] uppercase tracking-wider mt-0.5 drop-shadow-md">Faculty Advisor</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="members" className="grid place-items-center w-full relative">
                <div className="w-full flex flex-col items-center justify-center py-6 mt-8 gap-6">
                    <AsciiGlitchRipple
                        as="h2"
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-white text-center select-none cursor-default uppercase font-sans hover:text-[#c9a84c] transition-colors duration-300"
                        dur={1200}
                        spread={1.2}
                    >
                        MEET THE TEAM
                    </AsciiGlitchRipple>

                    {/* Year Selector Option Bar - Always Centered */}
                    <div className="z-30 flex items-center justify-center my-2">
                        <GlassDock 
                            items={dockItems} 
                            dockClassName="bg-[#132340]/80 border-[#1e3457] backdrop-blur-md shadow-2xl py-3 px-6 rounded-2xl"
                        />
                    </div>
                </div>

                <div 
                    ref={gridFullRef} 
                    className="grid--full relative w-full my-[4vh] h-auto max-w-none p-4 grid gap-4 grid-cols-7"
                    style={{
                        gridTemplateRows: `repeat(${totalSlots / 7}, minmax(0, 1fr))`,
                        aspectRatio: `${7 / ((totalSlots / 7) * 1.25)}`
                    }}
                >
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-[#0d1b2e]/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item && typeof item === 'object' && item.photo) {
                            const member = item;
                            const letterName = String.fromCharCode(65 + i);
                            return (
                                <figure key={`member-${i}`} data-col={i % 7} className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer">
                                    <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-[#1e3457] bg-[#132340] relative flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-transparent">

                                        {/* Member Photo */}
                                        <img 
                                            src={member.photo} 
                                            alt={`Member ${letterName}`}
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        />

                                        {/* Gradient Overlay for Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                        {/* Content Container (Name and Role) */}
                                        <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            {/* Name */}
                                            <span className="block text-base font-extrabold text-white tracking-wider drop-shadow-md">{letterName}</span>
                                            {/* Role */}
                                            <span className="block text-[10px] font-medium text-zinc-300 uppercase tracking-wider mt-0.5 drop-shadow-md">{member.role}</span>
                                        </div>
                                    </div>
                                </figure>
                            )
                        }
                        return null;
                    })}
                </div>
            </section>

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-white uppercase font-medium text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div>
    )
}

export default StaggeredGrid
