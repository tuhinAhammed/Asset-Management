import React, { useRef, useState, useEffect } from "react";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
// import { faqData } from "../JsonData/FaqData";
import MidTitle from "../Layout/Title/MidTitle";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import MinTitle from "../Layout/Title/MinTitle";
import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu"; // Assuming this is the correct import for the minus icon
import axios from "axios";
import { faqDataApi } from "../Api/Api";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import SectionTitle from "../Layout/Title/SectionTitle";
import faqBanner from "../assets/Faq/faqBanner.png"
import faqShape from "../assets/Faq/faqShape.png"
import faqStar from "../assets/Faq/faqStar.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
const Faqs = () => {
    const [loading, setLoading] = useState(true);
    const [faqData, setFaqData] = useState([]);
    const [faqOpen, setFaqOpen] = useState(null); // single list → single open key
    const contentRefs = useRef({});

    useEffect(() => {
        const fetchFaq = async () => {
            setLoading(true);
            try {
                const res = await axios.get(faqDataApi);
                setFaqData(res.data.list); // Your API returns a single array
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchFaq();
    }, []);

    // Auto-open first FAQ when data arrives
    useEffect(() => {
        if (faqData.length > 0) {
            setFaqOpen(`faq-0`);
        }
    }, [faqData]);

    const handleFaq = (index) => {
        const key = `faq-${index}`;
        setFaqOpen((prev) => (prev === key ? null : key));
    };
    // Animation
    useEffect(() => {
        AOS.init({
            once: false,
            mirror: true,
        });
    }, []);
    return (
        <div className="">
            <Breadcrumb title="FAQ's" slug="faqs"/>
            <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary relative">
                <Container>
                    <div data-aos="fade-left" data-aos-duration="1000" className="shape absolute top-15 left-[45rem] animate-bounce-top [animation-duration:2s]">
                        <img src={faqShape} alt="" />
                    </div>
                    <div data-aos="fade-left" data-aos-duration="1000" className="shape absolute animate-spin bottom-16 left-[45rem] animate-bounce-left [animation-duration:2s]">
                        <img src={faqStar} alt="" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">

                        {/* LEFT EMPTY SIDEBAR (keeping your design exactly same) */}
                        <div className="col-span-8 z-[4] bg-secondary">
                            <div
                                className="px-5 py-2 rounded-lg border-opacity-[0.3]"
                            >
                                <div className="flex flex-col items-center md:items-start">
                                    <SectionTitle data-aos="fade-right" data-aos-duration="1000" text="our faqs" />
                                </div>
                                <LargeTitle data-aos="fade-right" data-aos-duration="1000" className="font-bold pt-2 md:pt-4 text-primary text-center md:text-left" text="Empowering Knowledge: Your Questions Answered" />
                                <div data-aos="fade-right" data-aos-duration="1000" className="question pt-4 sm:pt-6 md:pt-8">

                                    {faqData?.map((faqItem, index) => {
                                        const faqKey = `faq-${index}`;

                                        return (
                                            <div
                                                key={faqKey}
                                                onClick={() => handleFaq(index)}
                                                className="bg-theme bg-opacity-[0.0] py-2 lg:py-4 cursor-pointer border-b-[1px] border-tertiary border-opacity-[0.3]"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <MidTitle
                                                        text={faqItem.question}
                                                        className={`font-bold ${faqOpen === faqKey
                                                            ? "!text-theme"
                                                            : "text-primary"
                                                            }`}
                                                    />

                                                    <span
                                                        className={`text-lg p-1 bg-primary  rounded-full md:text-xl lg:text-2xl  transform transition-transform text-primary duration-300 ${faqOpen === faqKey ? "rotate-[180deg] bg-theme text-primary" : "rotate-0 text-secondary"
                                                            }`}
                                                    >
                                                        <MdKeyboardArrowUp />
                                                    </span>
                                                </div>

                                                <div
                                                    ref={(el) => (contentRefs.current[faqKey] = el)}
                                                    style={{
                                                        height:
                                                            faqOpen === faqKey
                                                                ? `${contentRefs.current[faqKey]
                                                                    ?.scrollHeight || 0
                                                                }px`
                                                                : "0px",
                                                    }}
                                                    className="overflow-hidden transition-all duration-500 cursor-text"
                                                >
                                                    <MidTitle
                                                        text={faqItem.answer}
                                                        className="pt-2 font-secondary lg:pt-4 font-normal text-tertiary leading-[24px]"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>

                        {/* RIGHT FAQ LIST */}
                        <div className="col-span-4"
                        >
                            <div data-aos="fade-left" data-aos-duration="1000" className="img">
                                <img src={faqBanner} alt="" />
                            </div>
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    );
};


export default Faqs;
