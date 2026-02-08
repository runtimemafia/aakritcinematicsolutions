import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ClientsProps {
    id?: string;
    className?: string;
}

type Invoice = {
    name: string;
    email: string;
    address: string;
    invoice_id: number;
    invoice_date: string;
    total: number;
};

const Clients = ({ id = "clients", className }: ClientsProps) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/invoice/1")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch invoice");
                return res.json();
            })
            .then(data => {
                setInvoice(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-start justify-center pt-24 bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-8">
                <div className="flex flex-col items-center justify-center text-center gap-20">

                    {/* Title + Description */}
                    <div className="w-full max-w-2xl space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-display text-[clamp(2.8rem,4vw,4.8rem)] font-bold leading-tight bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                        >
                            Client Invoice
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-muted max-w-xl mx-bold"
                        >

                        </motion.p>
                    </div>

                    {/* Invoice Card */}
                    <div className="w-full relative flex justify-center items-center min-h-[50px]">
                        {loading && <p className="text-muted">Loading invoice...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {invoice && (
                            <motion.div
                                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -8, 0],
                                    rotate: [-0.5, 0.5, -0.5],
                                    scale: 1
                                }}
                                transition={{
                                    opacity: { duration: 0.7 },
                                    scale: { duration: 0.7 },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="relative mx-auto w-[380px] sm:w-[420px]"
                            >
                                {/* Hanging top bar */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-neutral-800 rounded-md shadow-lg" />

                                {/* Soft glow behind paper */}
                                <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-emerald-400 rounded-full scale-75" />

                                {/* Invoice Paper */}
                                {/* Invoice Paper */}
                                <div className="relative bg-white text-black rounded-b-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] px-10 py-16 font-mono min-h-[560px] flex flex-col items-center justify-center">

                                    {/* Top perforation */}
                                    <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_12px)] opacity-70" />

                                    {/* Header */}
                                    <h3 className="text-3xl font-black tracking-[0.2em] mb-8 border-b-2 border-black pb-2">
                                        INVOICE
                                    </h3>

                                    {/* Client Details - Centered */}
                                    <div className="space-y-2 text-center mb-6">
                                        <p><span className="font-bold">Name:</span> {invoice.name}</p>
                                        <p><span className="font-bold">Email:</span> {invoice.email}</p>
                                        <p><span className="font-bold">Address:</span> {invoice.address}</p>
                                    </div>

                                    {/* Decorative Divider */}
                                    <div className="w-full border-t border-dashed border-gray-400 my-6" />

                                    {/* Invoice Metadata - Centered */}
                                    <div className="space-y-2 text-center">
                                        <p><span className="font-bold">ID:</span> #{invoice.invoice_id}</p>
                                        <p>
                                            <span className="font-bold">Date:</span>{" "}
                                            {new Date(invoice.invoice_date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="w-full border-t border-dashed border-gray-400 my-6" />

                                    {/* Total - Centered and Bold */}
                                    <p className="text-2xl font-black mt-4">
                                        Total:{" "}
                                        {new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        }).format(invoice.total)}
                                    </p>

                                    {/* Bottom tear effect */}
                                    <div className="absolute bottom-0 left-0 w-full h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_12px)] opacity-70" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
