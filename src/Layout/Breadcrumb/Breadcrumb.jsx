import React from "react";
import LargeTitle from "../Title/LargeTitle";
import BreadcrumbPath from "./BreadcrumbPath";
import ExtraLargeTitle from "../Title/ExtraLargeTitle";
import breadcrumbImg from "../../assets/Breadcrumb/breadcrumbImg.png"
import shapeEllipse from "../../assets/Banner/shapeEllipse.png"
import Container from "../Container";
const Breadcrumb = ({title , slug}) => {
  return (
    <div className=" bg-static py-[120px] bg-no-repeat bg-center bg-cover relative"
    style={{ backgroundImage: `url(${breadcrumbImg})` }}>
      <Container>
      <div className="absolute inset-0 bg-gradient-to-br from-static/100 via-static/70 to-theme/90 pointer-events-none"></div>


      {/* <img
                src={shapeEllipse}
                alt="shape"
                className="absolute bottom-[-85%] right-[-20%] w-[650px]  z-2"
            /> */}
      <ExtraLargeTitle className="font-semibold font-primary text-secondary capitalize text-center z-2 relative" text={title} />
      <BreadcrumbPath slug={slug} className="pt-3 sm:pt-5 md:pt-6"/>
    </Container>
    </div>
  );
};

export default Breadcrumb;
