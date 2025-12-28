import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const LargeTitle = ({ className, text, ...rest }) => {
        // Animation
        useEffect(() => {
          AOS.init({
            once: false,
            mirror: true,
          });
        }, []);
  return (
    <h1
      {...rest}
      className={`text-2xl md:text-4xl lg:text-5xl ${className}`}
    >
      {text}
    </h1>
  );
};

export default LargeTitle;
