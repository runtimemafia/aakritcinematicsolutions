import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SeamlessBackground from '../components/ui/SeamlessBackground';
import HorizontalScrollContainer from '../components/layout/HorizontalScrollContainer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Projects, { type PortfolioItem, HoverPreviewModal, PremiumVideoModal, VideoContext } from '../components/sections/Projects';
import Clients from '../components/sections/Clients';
import Team from '../components/sections/Team';
import Contact from '../components/sections/Contact';
import CanvasCursor from '../components/ui/CanvasCursor';
import useMediaQuery from '../hooks/useMediaQuery';

interface HomeExperienceProps {
    onLandingComplete?: () => void;
}

const HomeExperience = ({ onLandingComplete }: HomeExperienceProps) => {
    const [showBackground, setShowBackground] = useState(false);
    const [isLandingComplete, setIsLandingComplete] = useState(false);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const location = useLocation();
    const navigate = useNavigate();

    // Portfolio State
    const [hoveredProject, setHoveredProject] = useState<PortfolioItem | null>(null);
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

    const toggleLike = (id: number) => {
        setLikedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleLandingComplete = useCallback(() => {

        setShowBackground(true);
        setIsLandingComplete(true);
        onLandingComplete?.();
    }, [onLandingComplete]);

    useEffect(() => {
        const state = location.state as { scrollTo?: string } | null;
        const targetId = state?.scrollTo || (location.hash ? location.hash.replace('#', '') : '');

        if (!targetId) return;

        const timeoutId = window.setTimeout(() => {
            document
                .getElementById(targetId)
                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }, 180);

        if (state?.scrollTo) {
            navigate(location.pathname, { replace: true, state: null });
        }

        return () => window.clearTimeout(timeoutId);
    }, [location, navigate]);

    return (
        <VideoContext.Provider value={{ isMuted, setIsMuted, likedIds, toggleLike }}>
            <div className="bg-background text-text antialiased lg:overflow-hidden min-h-screen relative">
                <CanvasCursor />

                <SeamlessBackground scrollerRef={scrollerRef} isVisible={showBackground} />
                <HorizontalScrollContainer
                    scrollerRef={scrollerRef}
                    isDesktop={isDesktop}
                    startLanding={true}
                    onLandingComplete={handleLandingComplete}
                >
                    <Hero id="hero" isLandingComplete={isLandingComplete} />
                    <Services id="services" />
                    <Projects
                        id="projects"
                        hoveredProject={hoveredProject}
                        setHoveredProject={setHoveredProject}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        isMuted={isMuted}
                        setIsMuted={setIsMuted}
                        likedIds={likedIds}
                        toggleLike={toggleLike}
                    />
                    <Gallery id="gallery" />
                    <Team id="team" />
                    <Clients id="clients" />
                    <About id="about" />
                    <Contact id="contact" />
                </HorizontalScrollContainer>

                {/* GLOBAL MODALS - Rendered outside the scroller for perfect centering and visibility */}
                <AnimatePresence>
                    {hoveredProject && !selectedProject && (
                        <HoverPreviewModal
                            key={`hover-${hoveredProject.id}`}
                            project={hoveredProject}
                            onClose={() => setHoveredProject(null)}
                            onExpand={() => {
                                setSelectedProject(hoveredProject);
                                setHoveredProject(null);
                            }}
                        />
                    )}

                    {selectedProject && (
                        <PremiumVideoModal
                            key={`premium-${selectedProject.id}`}
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </AnimatePresence>

            </div>
        </VideoContext.Provider>
    );
};

export default HomeExperience;



