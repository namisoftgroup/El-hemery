import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";
import { setLanguage } from "../../redux/slices/settings";
import { useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";
import UserDropDown from "./UserDropDown";

export default function Header({ auth }) {
  // export default function Header() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const { isAuthed } = auth;
  const { lang } = useSelector((state) => state.settings);

  const [openMenu, setOpenMenu] = useState(false);

  const handleLanguageChange = () => {
    const newLang = lang === "ar" ? "en" : "ar";

    dispatch(setLanguage(newLang));
    localStorage.setItem("lang", newLang);
    i18next.changeLanguage(newLang);

    queryClient.invalidateQueries({ queryKey: [] });

    document.body.classList.remove("en", "ar");
    document.body.classList.add(newLang);
  };


  useEffect(() => {
    const header = document.querySelector(".header");
    const nav = header?.querySelector("nav");

    const handleScroll = () => {
      const isSticky = window.scrollY > 0;
      header.classList.toggle("sticky", isSticky);
      nav?.classList.toggle("scrolled", isSticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const menu = document.querySelector(".nav_links");
      const toggleMenu = document.querySelector(".toggle_menu");
      if (
        !menu.contains(e.target) &&
        !toggleMenu.contains(e.target) &&
        !e.target.closest(".nav_links a")
      ) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleNavLinkClick = (e) => {
    const targetId = e.target.getAttribute("to").replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    setOpenMenu(false);
  };

  return (
    <header className="header">
      <nav className="container">
        <div className={`layer ${openMenu ? "open" : ""}`}></div>
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="" />
        </Link>

        <div className={`nav_links ${openMenu ? "open" : ""}`}>
          <Link to="/" className="logo">
            <img src="/images/logo.svg" alt="" />
          </Link>
          <NavLink to="/" onClick={handleNavLinkClick}>
            {t("header.home")}
          </NavLink>
          <NavLink to="#about" onClick={handleNavLinkClick}>
            {t("header.about")}
          </NavLink>

          <NavLink to="#services" onClick={handleNavLinkClick}>
            {t("header.services")}
          </NavLink>
          <NavLink to="/daus" onClick={handleNavLinkClick}>
            {t("header.duaa")}
          </NavLink>


          <NavLink to="/faqs" onClick={handleNavLinkClick}>
            {t("header.faqs")}
          </NavLink>

          <NavLink to="/contact" onClick={handleNavLinkClick}>
            {t("header.contact")}
          </NavLink>
        </div>

        <div className="actions">
          <button onClick={() => handleLanguageChange()}>
            <i className="fa-regular fa-globe"></i>{" "}
            {lang === "ar" ? "EN" : "AR"}
          </button>

          {isAuthed ? (
            <UserDropDown />
          ) : (
            <Link to="/signin" className="login">
              {t("header.login")}
            </Link>
          )}

          <button className="toggle_menu" onClick={handleToggleMenu}>
            <i className="fa-regular fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
