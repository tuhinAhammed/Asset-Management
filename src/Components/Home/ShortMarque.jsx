import React from "react";
import Container from "../../Layout/Container";
import { BsStars } from "react-icons/bs";

const ShortMarque = () => {
    return (
        <Container>

            <div className="w-full overflow-hidden pb-sectionSm  md:pb-sectionMd lg:pb-sectionLg bg-white">
                <marquee behavior="scroll" direction="left" scrollamount="10" className="overflow-hidden">
                    <div className="flex items-center gap-10 ">

                        {/* Text Items */}
                        <span

                            className="pointer-events-none select-none inset-0 flex items-center justify-center text-[40px] sm:text-[80px] md:text-[100px] font-bold opacity-20  text-primary uppercase"
                            aria-hidden="true"
                        >
                            Digital Solutions
                        </span>
                        <span

                            className="pointer-events-none select-none inset-0 flex items-center justify-center text-[40px] sm:text-[80px] md:text-[100px]
font-bold   text-theme uppercase"
                            aria-hidden="true"
                        >
                            <BsStars />
                        </span>
                        <span

                            className="pointer-events-none select-none inset-0 flex items-center justify-center text-[40px] sm:text-[80px] md:text-[100px]
    font-bold   text-primary uppercase"
                            aria-hidden="true"
                        >
                            Creative Services
                        </span>
                        <span

                            className="pointer-events-none select-none inset-0 flex items-center justify-center text-[40px] sm:text-[80px] md:text-[100px]
font-bold   text-theme uppercase"
                            aria-hidden="true"
                        >
                            <BsStars />
                        </span>
                        <span

                            className="pointer-events-none select-none inset-0 flex items-center justify-center text-[40px] sm:text-[80px] md:text-[100px]
    font-bold   opacity-20  text-primary  uppercase "
                            aria-hidden="true"
                        >
                            Learning Opportunities
                        </span>


                    </div>
                </marquee>
            </div>
        </Container>
    );
};

export default ShortMarque;
