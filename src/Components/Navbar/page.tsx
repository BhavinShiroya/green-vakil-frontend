"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/Greenway.logo.svg";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "attorney", "about-us", "articles"];
      const navbarHeight = 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navbarHeight + 50) {
            // 50px threshold for better detection
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100; // Height of the fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100px",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        paddingInline: "80px",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 9999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: activeSection === "home" ? "#000000" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("home")}
        >
          Home
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: activeSection === "services" ? "#000000" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("services")}
        >
          Services
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: activeSection === "attorney" ? "#000000" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("attorney")}
        >
          Attorney
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: activeSection === "articles" ? "#000000" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("articles")}
        >
          Articles
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: activeSection === "about-us" ? "#000000" : "#808080",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("about-us")}
        >
          About Us
        </Typography>
      </Box>
      <Box sx={{ marginRight: "15%" }}>
        <Image src={Logo} alt="logo" width={240} height={60} />
      </Box>
      <Box>
        <Typography
          sx={{
            backgroundColor: "#3D74FF",
            color: "#fff",
            fontSize: "17px",
            fontWeight: "500",
            height: "46px",
            width: "137px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          Contact Us
        </Typography>
      </Box>
    </Box>
  );
}
