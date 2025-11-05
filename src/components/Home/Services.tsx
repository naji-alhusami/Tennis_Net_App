
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

import Header from "../ui/header";
import { servicesData } from "./ServicesData";
// import classes from "./services.module.css";

function Services() {
    // Motion for header
    const headerRef = useRef(null);
    const isInViewHeader = useInView(headerRef, { once: true });
    const headerControls = useAnimation();
    useEffect(() => {
        if (isInViewHeader) {
            headerControls.start("visible");
        }
    }, [isInViewHeader, headerControls]);

    // Motion for services
    const servicesRef = useRef(null);
    const isInViewServices = useInView(servicesRef, { once: true });
    const servicesControls = useAnimation();
    useEffect(() => {
        if (isInViewServices) {
            servicesControls.start("visible");
        }
    }, [isInViewServices, servicesControls]);

    return (
        <div className="py-180 md:py-40">
            <div>
                <Header
                    H3Header="TENNIS NET"
                    H1Header="SERVICES"
                    H2Header="Discover Our Services"
                    PHeader="Experience a variety of engaging services that bring our tennis community together"
                />
            </div>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: -75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={servicesControls}
                transition={{ duration: 0.3, delay: 0.8 }}
                ref={servicesRef}
                className=" p-10 flex flex-col md:flex-row"
            >
                {servicesData.map((service) => (
                    <div
                        // variants={{
                        //   hidden: { opacity: 0, y: -75 },
                        //   visible: { opacity: 1, y: 0 },
                        // }}
                        // initial="hidden"
                        // animate={servicesControls}
                        // transition={{ duration: 0.3, delay: 0.4 }}
                        // ref={servicesControls}
                        key={service.id}
                        className="flex flex-col my-8 md:px-4 md:mx-4 bg-white rounded-md p-2"
                    >
                        <div className="font-bold text-2xl pb-6">
                            <Image src={service.image} width={50} height={50} alt="service" />
                            <h1>{service.title}</h1>
                        </div>
                        <div className="">
                            <p className="text-sm font-semibold text-gray-500 border-l-2 border-green-600 pl-6">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default Services;
