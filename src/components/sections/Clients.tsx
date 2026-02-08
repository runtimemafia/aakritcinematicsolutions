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
                // CHANGED: items-center for vertical centering, removed pt-24
                "h-[100dvh] w-screen flex items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-8">
                {/* CHANGED: Removed gap-20 and used space-y-12 to keep it tight in the center */}
                <div className="flex flex-col items-center justify-center text-center space-y-12">

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
                    </div>

                    {/* Invoice Card Container - REMOVED mt-20 to allow flex centering */}
                    <div className="w-full relative flex justify-center items-center">
                        {invoice && (
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -15, 0],
                                    rotateX: [0, 2, 0],
                                }}
                                transition={{
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                }}
                                // YOUR SPECIFIED WIDTH
                                className="relative mx-auto w-[320px] sm:w-[350px] [perspective:1000px]"
                            >
                                {/* The Clip/Hanging Bar */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-stone-800 rounded-t-md shadow-lg z-20" />

                                {/* Invoice Paper - YOUR SPECIFIED COLOR AND HEIGHT */}
                                <div className="relative bg-[#F5F1E8] text-[#3E322B] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] px-8 py-20 font-mono flex flex-col items-center justify-center text-center min-h-[350px] border border-[#DED4C1]">

                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

                                    <div className="mb-auto">
                                        <h3 className="text-2xl font-black tracking-[0.3em] mb-2 border-b-2 border-stone-800 pb-1">
                                            INVOICE
                                        </h3>
                                        <p className="text-[10px] opacity-50 uppercase tracking-widest">Official Document</p>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-stone-400 uppercase">Billed To</p>
                                            <p className="font-bold text-sm">{invoice.name}</p>
                                            <p className="text-[11px] truncate px-4">{invoice.email}</p>
                                            <p className="text-[10px] uppercase tracking-tighter">{invoice.address}</p>
                                        </div>

                                        <div className="w-full border-t border-dashed border-stone-300" />

                                        <div className="space-y-1">
                                            <p className="text-[10px] text-stone-400 uppercase">Details</p>
                                            <p className="text-xs font-bold">#INV-00{invoice.invoice_id}</p>
                                            <p className="text-[11px]">{new Date(invoice.invoice_date).toLocaleDateString()}</p>
                                        </div>

                                        <div className="w-full border-t border-dashed border-stone-300" />

                                        <div className="pt-4">
                                            <p className="text-[10px] text-stone-400 uppercase mb-1">Total Amount</p>
                                            <p className="text-3xl font-black text-emerald-900">
                                                {new Intl.NumberFormat("en-IN", {
                                                    style: "currency",
                                                    currency: "INR",
                                                }).format(invoice.total)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-10">
                                        <div className="w-12 h-12 border-2 border-stone-200 rounded-full flex items-center justify-center mx-auto opacity-20">
                                            <span className="text-[8px] font-bold">PAID</span>
                                        </div>
                                    </div>

                                    <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.05)_4px,rgba(0,0,0,0.05)_8px)]" />
                                    <div className="absolute bottom-0 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.05)_4px,rgba(0,0,0,0.05)_8px)]" />
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