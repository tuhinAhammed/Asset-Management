import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowDown, MdOutlineWifiCalling3 } from "react-icons/md";
import { FaUsers, FaCommentDots, FaQuestionCircle } from "react-icons/fa";
import { TbMenu } from "react-icons/tb";

import Container from "../../Layout/Container";
import MidTitle from "../../Layout/Title/MidTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import { api } from "../../Api/Api";

/* ---------------- MENU DATA ---------------- */



const HEADER_HEIGHT = 70;

const Header = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const lastScrollY = useRef(0);
  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const landingPageData = useSelector((state) => state.landingPageData?.data);
  const { logo, company_phone , company_name} = useMemo(() => ({
    logo: landingPageData?.logo || null,
    company_phone: landingPageData?.company_phone || null,
    company_name: landingPageData?.company_name || null
  }), [landingPageData]);

  /* ---------- OPEN / CLOSE MENU ---------- */

  const openMenu = () => {
    setRenderMenu(true);
    setTimeout(() => setMenuOpen(true), 10);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setTimeout(() => setRenderMenu(false), 350);
  };

  /* ---------- BODY SCROLL LOCK ---------- */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  /* ---------- CLICK OUTSIDE CLOSE ---------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  /* ---------- SCROLL HIDE / SHOW HEADER ---------- */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHideHeader(true); // scroll down
      } else {
        setHideHeader(false); // scroll up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const companyMenu = {
    subMenu: [
      { name: "Our Story", link: "/our-story"  },
      { name: "Our Team", link: "/our-team" },
      { name: `Why Us`, link: "/why-us" },
      { name: "Our Business", link: "/our-business" },
    ],
  };
  return (
    <>
      {/* ---------------- STYLES ---------------- */}
      <style>{`
        .menu-wrapper {
          position: fixed;
          top: ${HEADER_HEIGHT}px;
          right: 0;
          width: 100%;
          height: calc(100vh - ${HEADER_HEIGHT}px);
          z-index: 99998;
        }

        .menu-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          opacity: ${menuOpen ? 1 : 0};
          transition: opacity 0.3s ease;
        }

        .menu-sidebar {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 420px;
          max-width: 100%;
          background: #000;
          transform: translateX(${menuOpen ? "0%" : "100%"});
          transition: transform 0.35s cubic-bezier(.4,0,.2,1);
          box-shadow: -6px 0 18px rgba(0,0,0,0.2);
          overflow-y: auto;
        }

        .menu-toggle {
          position: relative;
          width: 100px;
          height: 28px;
        }

        .menu-toggle-item {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .menu-enter {
          opacity: 1;
          transform: translateY(0);
        }

        .menu-exit {
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
        }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      <nav
        className="fixed top-0 left-0 w-full z-[99999] bg-secondary transition-transform duration-300"
        style={{
          height: HEADER_HEIGHT,
          transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div className="h-full flex items-center">
          <Container>
            <div className="h-full flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={`${api}/storage/${logo}`}
                  alt="logo"
                  className="w-8"
                />
                <span className="text-2xl font-black text-secondary">
                  Skilify Tech
                </span>
              </Link>

              {/* Toggle Button */}
              <button
                ref={toggleBtnRef}
                onClick={menuOpen ? closeMenu : openMenu}
                className="text-primary uppercase text-xl overflow-hidden"
              >
                <div className="menu-toggle">
                  <div
                    className={`menu-toggle-item ${
                      !menuOpen ? "menu-enter" : "menu-exit"
                    }`}
                  >
                    <span className="text-lg font-light">Menu</span>
                    <TbMenu className="text-theme" />
                  </div>

                  <div
                    className={`menu-toggle-item ${
                      menuOpen ? "menu-enter" : "menu-exit"
                    }`}
                  >
                    <span className="text-lg font-light">Close</span>
                    <RxCross2 className="text-theme" />
                  </div>
                </div>
              </button>
            </div>
          </Container>
        </div>
      </nav>

      {/* HEADER SPACER */}
      <div style={{ height: HEADER_HEIGHT }} />

      {/* ---------------- SIDEBAR ---------------- */}
      {renderMenu && (
        <div className="menu-wrapper">
          <div className="menu-overlay" onClick={closeMenu}></div>

          <aside ref={sidebarRef} className="menu-sidebar">
            <div className="p-6 pt-8">
              <ul className="grid gap-y-5 uppercase text-secondary">
                {[
                  { name: "Home", link: "/" },
                  // { name: "Services", link: "/services" },
                  { name: "Projects", link: "/projects" },
                  { name: "Career", link: "/career" },
                  { name: "News & Events", link: "/news-events" },
                  // { name: "Blogs", link: "/blogs" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.link}
                      onClick={closeMenu}
                      className={`block py-2 ${
                        location.pathname === item.link
                          ? "font-bold opacity-70"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <details className="group">
                    <summary className="flex justify-between items-center py-2 cursor-pointer">
                      About
                      <MdKeyboardArrowDown className="group-open:rotate-180 transition-transform" />
                    </summary>

                    <div className="ml-4 mt-3 grid gap-y-3">
                      {companyMenu.subMenu.map((item, i) => (
                        <Link
                          key={i}
                          to={item.link}
                          onClick={closeMenu}
                          className="flex items-center gap-3"
                        >
                          {/* <span className="text-theme text-xl">
                            {item.icon}
                          </span> */}
                          <MidTitle
                            text={item.name}
                            className="text-sm font-normal"
                          />
                        </Link>
                      ))}
                    </div>
                  </details>
                </li>

                <li>
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="block py-2"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <a
                href={`tel:${company_phone}`}
                className="flex gap-4 mt-10 items-center"
              >
                <div className="p-3 bg-theme text-primary rounded-full text-xl">
                  <MdOutlineWifiCalling3 />
                </div>
                <div>
                  <MinTitle text="Call us anytime" />
                  <MidTitle text={company_phone} />
                </div>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
