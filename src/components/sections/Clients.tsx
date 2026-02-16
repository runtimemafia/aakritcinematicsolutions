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
            // min-h-screen ensures the section takes full height, flex-col + justify-between helps positioning
            className={clsx(
                "relative w-full min-h-screen bg-primary flex flex-col pt-20",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full mb-10">
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
            {/* mt-auto pushes this entire block to the bottom of the available screen space */}
            <div className="relative z-10 w-full mt-10 md:mt-10 mb-10 bg-black py-12">
                <div className="px-[5vw] mb-8">
                    <h3 className="text-white/30 text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
                        WE WORKED WITH
                    </h3>
                </div>

                <div className="flex overflow-hidden relative w-full">
                    {/* Fades for smooth edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                    <motion.div
                        // Animation fixed: x: "-50%" makes it scroll left smoothly
                        initial={{ x: 0 }}
                        animate={{ x: "50%" }}
                        transition={{
                            duration: 50,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex flex-row whitespace-nowrap items-center gap-10"
                    >
                        {/* Quadruple the data to ensure no gaps during the infinite loop */}
                        {[...LOGO_DATA, ...LOGO_DATA, ...LOGO_DATA, ...LOGO_DATA].map((logo, index) => (
                            <div
                                key={index}
                                className="flex justify-center items-center h-[150px] min-w-[150px] md:min-w-[250px] px-4"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    // Removed brightness-0 and invert to show ORIGINAL IMAGES
                                    className="h-14 md:h-20 w-auto object-contain opacity-100"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Clients;