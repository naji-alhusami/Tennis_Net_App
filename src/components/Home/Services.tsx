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
        visible: { transition: { staggerChildren: 0.12 } },
    };

    const listItem: Variants = {
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    function ServiceCard({ service }: { service: ServiceItem }) {
        return (
            <motion.article
                variants={listItem}
                className="flex flex-col my-8 md:px-4 md:mx-4 bg-white rounded-md p-2"
            >
                <div className="font-bold text-2xl pb-6">
                    <Image src={service.image} width={50} height={50} alt={service.title} />
                    <h1>{service.title}</h1>
                </div>
                <p className="text-sm font-semibold text-gray-500 border-l-2 border-green-600 pl-6">
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
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            className="pt-180 md:py-40 md:px-15"
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
                className="p-10 md:p-0 lg:p-5 flex flex-col md:flex-row"
            >
                {servicesData.map((service: ServiceItem) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </motion.div>
        </motion.section>
    );
}

