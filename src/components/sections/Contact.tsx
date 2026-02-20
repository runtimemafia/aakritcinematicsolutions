import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import DiagonalGallery from "./DiagonalGallery";

interface ContactProps {
  id?: string;
  className?: string;
}

const inputClass =
  "w-full h-[52px] bg-white/50 border border-white/20 rounded-full px-5 text-sm text-text placeholder:text-muted/60 focus:border-orange-400/60 focus:outline-none backdrop-blur-sm transition-all duration-200";

const Contact = ({ id = "contact", className }: ContactProps) => {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const timeoutRef = useRef<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setStatus("idle"), 4000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      id={id}
      className={clsx(
        "h-[100dvh] w-screen flex items-center justify-start bg-background flex-shrink-0 relative overflow-hidden",
        className,
      )}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none z-0" />

      {/* Aligned Diagonal Gallery Background Decoration */}
      <div className="absolute top-0 right-[5%] w-[60%] h-full pointer-events-none z-0 opacity-40 overflow-hidden flex items-center justify-center">
        <DiagonalGallery className="!h-[150%] !w-full" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none z-1" />

      <div className="w-full px-8 md:px-16 relative z-10">
        <div className="w-full max-w-[600px]">

          {/* Eyebrow + Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-accent text-[10px] uppercase tracking-[0.3em] font-mono mb-2 block">
              Get in Touch
            </span>
            <h2 style={{ fontSize: "2.75rem", lineHeight: 1.1 }} className="font-display font-bold text-text">
              Let's Create<br />
              <span className="text-accent">Together</span>
            </h2>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="contact-form">

              {/* Name */}
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="Name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  required
                />
              </div>

              {/* Project Type */}
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="Project Type"
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "12px" }}>
                <textarea
                  rows={1}
                  placeholder="Message"
                  className="w-full bg-white/50 border border-white/20 rounded-full px-5 py-3 text-sm text-text placeholder:text-muted/60 focus:border-orange-400/60 focus:outline-none backdrop-blur-sm transition-all duration-200 resize-none leading-relaxed min-h-[52px]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex items-center gap-3 px-8 h-12 bg-accent text-background font-semibold uppercase tracking-widest text-xs rounded-full hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,255,136,0.35)] hover:scale-[1.01] mb-6"
              >
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Contact Details (Large) */}
              <div className="flex flex-col gap-2 mt-4 px-2">
                <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-text">
                  <span className="text-2xl">📍</span>
                  <span>Chembur</span>
                </div>
                <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-text">
                  <span className="text-2xl">✉️</span>
                  <a href="mailto:studio@aakritcinematic.in" className="hover:text-accent transition-colors">
                    studio@aakritcinematic.in
                  </a>
                </div>
              </div>

              {/* Success message */}
              {status === "success" && (
                <p className="mt-4 text-accent text-xs uppercase tracking-[0.25em]">
                  Message sent — we'll reply within 24 hours.
                </p>
              )}
            </form>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-muted/50 text-xs"
          >
            © 2024 Aakrit Cinematic Solutions. All rights reserved.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
