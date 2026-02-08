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
                "h-[100dvh] w-screen flex items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-8">
                <div className="flex items-center justify-center">

                    {/* LEFT: Static content */}
                    <div className="flex-1 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-tight text-text"
                        >
                            Client Invoice
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-muted"
                        >
                            Invoice data fetched securely from MySQL using an Express API.
                        </motion.p>
                    </div>

                    {/* RIGHT: Dynamic invoice data */}
                    <div className="flex-1 flex flex-col gap-6">
                        {loading && <p className="text-muted">Loading invoice...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {invoice && (
                            <motion.div
                                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -6, 0],   // floating up & down
                                    scale: 1
                                }}
                                transition={{
                                    opacity: { duration: 0.7 },
                                    scale: { duration: 0.7 },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="relative mx-auto w-full max-w-md"
                            >

                                {/* Hanging top bar */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-neutral-800 rounded-md shadow-lg" />

                                {/* Invoice Paper */}
                                <div className="relative bg-white text-black rounded-b-xl shadow-2xl px-8 pt-10 pb-12 font-mono">

                                    {/* Top perforation */}
                                    <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_12px)] opacity-70" />

                                    <h3 className="text-center text-2xl font-bold tracking-widest mb-6">
                                        INVOICE
                                    </h3>

                                    <div className="space-y-2 text-sm">
                                        <p><span className="font-semibold">Name:</span> {invoice.name}</p>
                                        <p><span className="font-semibold">Email:</span> {invoice.email}</p>
                                        <p><span className="font-semibold">Address:</span> {invoice.address}</p>
                                    </div>

                                    <div className="border-t border-dashed border-gray-400 my-6" />

                                    <div className="space-y-2 text-sm">
                                        <p><span className="font-semibold">Invoice #:</span> {invoice.invoice_id}</p>
                                        <p>
                                            <span className="font-semibold">Date:</span>{" "}
                                            {new Date(invoice.invoice_date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="border-t border-dashed border-gray-400 my-6" />

                                    <p className="text-right text-lg font-bold">
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
