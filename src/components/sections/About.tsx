import { motion } from 'framer-motion';
import clsx from 'clsx';

interface AboutProps {
    id?: string;
    className?: string;
}

const About = ({ id = 'about', className }: AboutProps) => {
    return (
        <section
            id={id}
            className={clsx(
                'min-h-[100dvh] w-screen flex flex-col items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-10',
                className
            )}
        >
            <div className="max-w-[1000px] px-6 md:px-12 w-full text-center relative z-10 flex flex-col items-center justify-center h-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="prose prose-invert prose-lg md:prose-xl lg:prose-2xl mx-auto text-text/90 font-light leading-relaxed whitespace-pre-line"
                >
                    <p>
                        Aakrit Cinematic Solutions was born from a simple yet powerful thought — to contribute to India’s animation and film industry and show the world its true creative strength. What began as a spark has now evolved into a mission: to build a full-spectrum production house that excels in movies, animation, VFX, 3D visualization, editing, and every craft that brings imagination to life.
                    </p>
                    <p className="mt-8">
                        The name Aakrit, rooted in Sanskrit, means “to create”. It represents our cultural foundation and the belief that creation is the most transformative act. Staying grounded in our Sanskriti keeps us humble; our ambition pushes us to innovate, experiment, and deliver on global standards.
                    </p>
                    <p className="mt-8 font-medium text-accent">
                        We are more than a production studio.
                    </p>
                    <p className="mt-8">
                        We are architects of imagination, designers of emotion, and creators of immersive experiences.
                        <br />
                        Our vision is bold:
                        <br />
                        To place Indian animation and production on the global map, proving that our industry is not just evolving — it is roaring with potential and brilliance.
                        <br />
                        At Aakrit Cinematic Solutions,
                        <br />
                        every frame is creation, every project is passion, and every story is a new possibility. From the smallest detail to the final output — excellence is non-negotiable.
                    </p>
                    <div className="mt-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                            This is Aakrit.
                        </h2>
                        <p className="text-xl md:text-2xl text-accent font-light uppercase tracking-[0.1em] mt-2">
                            Bringing ideas to life.
                            <br />
                            Pure Cinematic Creation.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
            </div>
        </section>
    );
};

export default About;
