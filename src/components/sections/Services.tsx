import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ServicesProps {
    id?: string;
    className?: string;
}

const Services = ({ id = "services", className }: ServicesProps) => {
    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-background flex-shrink-0 relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-10",
                className
            )}
        >
            <div className="max-w-7xl px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-accent text-xs uppercase tracking-[0.3em] font-mono mb-4 block">Our Expertise</span>
                    <h2 className="text-display-md font-display font-bold text-text mb-6">
                        Comprehensive<br />
                        <span className="text-accent">Solutions</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Services list cleaned */}
                </div>
            </div>
        </section>
    );
};

export default Services;
