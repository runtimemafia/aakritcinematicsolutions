import { motion } from "framer-motion";
import clsx from "clsx";

// EXACT matches for your filenames in src/assets/logo
import heritageLogo from "../../assets/logo/Heritage-Logo.svg";
import malaiccaLogo from "../../assets/logo/malaicca-logo-01.svg";
import poonamSanduLogo from "../../assets/logo/poonam-sandu-interior-spacess-logo.svg";
import sarnishLogo from "../../assets/logo/sarnish-logo.svg";
import tdfLogo from "../../assets/logo/tdf-diamond-factory-india-private-limited-logo-01.svg";

interface ClientsProps {
    id?: string;
    className?: string;
}

const VIDEO_DATA = [
    { id: 1, youtubeId: "HykInVYwRiA", title: "Client_feedback_01" },
    { id: 2, youtubeId: "SeNeIppmQlM", title: "Client_feedback_02" },
    { id: 3, youtubeId: "HykInVYwRiA", title: "Client_feedback_03" },
];

const LOGO_DATA = [
    { src: heritageLogo, alt: "Heritage" },
    { src: malaiccaLogo, alt: "Malaicca" },
    { src: poonamSanduLogo, alt: "Poonam Sandu" },
    { src: sarnishLogo, alt: "Sarnish" },
    { src: tdfLogo, alt: "TDF" },
];

const Clients = ({ id = "clients", className }: ClientsProps) => {
    return (
        <section
            id={id}
            className={clsx(
                "relative w-full min-h-screen bg-primary flex flex-col pt-20",
                className
            )}
        >
            {/* CSS for marquee animation */}
            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .logo-animate {
                    animation: marquee 30s linear infinite;
                }
                .home-logo-wrapper {
                    position: relative;
                    display: flex;
                    overflow: hidden;
                    width: 100%;
                    height: 150%;
                }
                .clients-grid {
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    gap: 4rem;
                    padding-right: 4rem;
                }
                .client-logo {
                    height: 5.5rem;
                    width: auto;
                    object-fit: contain;
                    opacity: 0.9;
                    flex-shrink: 0;
                }
                @media (min-width: 768px) {
                    .client-logo { height: 5.5rem; }
                }
                .home-logo-left-gradient {
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 8rem;
                    background: linear-gradient(to right, black, transparent);
                    z-index: 20;
                    pointer-events: none;
                }
                .home-logo-left-gradient.right {
                    left: auto; right: 0;
                    background: linear-gradient(to left, black, transparent);
                }
            `}</style>

            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            {/* Top content: heading + videos — flex: 45% pushes scroller just below center */}
            <div className="relative z-10 w-full mb-10" style={{ flex: "0 0 45%" }}>
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-black mb-12"
                    >
                        Our Feedback
                    </motion.h2>

                    {/* Feedback Videos */}
                    <div className="flex flex-row flex-nowrap items-center gap-12 w-full overflow-x-auto px-[5vw] pb-10 no-scrollbar">
                        {VIDEO_DATA.map((video, index) => (
                            <motion.div
                                key={`${video.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -30 }}
                                className="relative aspect-[3/2] w-[320px] md:w-[420px] lg:w-[480px] flex-shrink-0 mx-auto"
                            >
                                <div
                                    className="relative h-full w-full bg-black rounded-3xl overflow-hidden border-[6px]"
                                    style={{ borderColor: '#0a0a0aff' }}
                                >
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                                        title={video.title}
                                        allowFullScreen
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- INFINITE LOGO SCROLLER --- */}
            <div className="relative z-10 w-full mt-[5vh] bg-black py-12">
                <div className="px-[5vw] mb-8">
                    <h3 className="text-white/30 text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
                        WE WORKED WITH
                    </h3>
                </div>

                {/* Two identical grids side by side = seamless infinite loop (mirrors reference HTML) */}
                <div className="home-logo-wrapper">
                    <div className="clients-grid logo-animate">
                        {LOGO_DATA.map((logo, index) => (
                            <img
                                key={`a-${index}`}
                                src={logo.src}
                                alt={logo.alt}
                                className="client-logo"
                                loading="eager"
                            />
                        ))}
                    </div>
                    <div className="clients-grid logo-animate">
                        {LOGO_DATA.map((logo, index) => (
                            <img
                                key={`b-${index}`}
                                src={logo.src}
                                alt={logo.alt}
                                className="client-logo"
                                loading="eager"
                            />
                        ))}
                    </div>

                    {/* Edge fades — left and right */}
                    <div className="home-logo-left-gradient" />
                    <div className="home-logo-left-gradient right" />
                </div>
            </div>
        </section>
    );
};

export default Clients;