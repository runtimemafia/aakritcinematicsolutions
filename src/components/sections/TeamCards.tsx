import { motion } from 'framer-motion';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    description: string;
    svgPath: string;
}

interface TeamCardProps {
    member: TeamMember;
    isActive: boolean;
    isBlurred: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

const TeamCard = ({ member, isActive, isBlurred, onHoverStart, onHoverEnd }: TeamCardProps) => {
    return (
        <motion.div
            className="relative flex items-center justify-center transition-all duration-500"
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            onTouchStart={onHoverStart}
            onTouchEnd={onHoverEnd}
        >
            {/* Info Panel - Slides from behind to the right */}
            <motion.div
                className="absolute left-1/2 h-[85%] w-56 bg-card/90 backdrop-blur-xl border border-border rounded-r-2xl shadow-2xl origin-left py-8 px-5 flex flex-col justify-center items-start z-0"
                initial={{ x: "-50%", opacity: 0, scaleX: 0 }}
                animate={{
                    x: isActive ? "50%" : "-50%",
                    opacity: isActive ? 1 : 0,
                    scaleX: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="space-y-3">
                    <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">
                        Professional Role
                    </p>
                    <h4 className="text-xl text-foreground font-bold leading-tight uppercase font-sans tracking-tight">
                        {member.role}
                    </h4>
                    <div className="w-10 h-[1px] bg-accent/50 mt-4" />
                    <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                        {member.description}
                    </p>
                </div>
            </motion.div>

            {/* Image Card */}
            <motion.div
                className={`relative w-52 h-72 sm:w-56 sm:h-80 md:w-60 md:h-[22rem] lg:w-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-2xl z-10 border bg-card flex flex-col items-center justify-center transition-all duration-500 ${isBlurred ? "blur-md opacity-20 scale-95 grayscale" : "grayscale-0 opacity-100"
                    } ${isActive ? "border-accent/50" : "border-border/20"
                    }`}
                animate={{
                    scale: isActive ? 1.05 : 1,
                    x: isActive ? "-15%" : "0%",
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="absolute inset-0">
                    <img
                        src={member.svgPath}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(0,0%,4%)] to-transparent" />
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                    <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-wide text-foreground drop-shadow-md font-sans">
                        {member.name}
                    </h3>
                </div>
            </motion.div>

            {/* Glow below card when active */}
            {isActive && (
                <motion.div
                    className="absolute -bottom-8 left-0 right-0 h-4 bg-accent/20 blur-xl rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </motion.div>
    );
};

export type { TeamMember };
export default TeamCard;
