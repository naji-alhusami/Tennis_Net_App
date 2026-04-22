"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import Header from "../ui/header";
import { servicesData } from "./ServicesData";
import { type ServiceItem } from "@/lib/types/ServicesItems";


export default function Services() {
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.12 } },
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    const listContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    const listItem: Variants = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    };

    function ServiceCard({ service }: { service: ServiceItem }) {
        return (
            <motion.article
                variants={listItem}
                className="group flex flex-col gap-4 bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-t-4 border-t-green-600"
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
                        <Image src={service.image} width={32} height={32} alt={service.title} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">{service.title}</h3>
                </div>
                <p className="text-sm font-medium text-gray-500 leading-relaxed pl-4 border-l-2 border-green-500">
                    {service.description}
                </p>
            </motion.article>
        );
    }

    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="py-20 md:py-28 px-6 md:px-16 bg-gray-50"
        >
            <motion.div variants={fadeUp}>
                <Header
                    H3Header="TENNIS NET"
                    H1Header="SERVICES"
                    H2Header="Discover Our Services"
                    PHeader="Experience a variety of engaging services that bring our tennis community together"
                />
            </motion.div>

            <motion.div
                variants={listContainer}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
                {servicesData.map((service: ServiceItem) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </motion.div>
        </motion.section>
    );
}
