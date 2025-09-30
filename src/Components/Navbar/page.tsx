"use client";

import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/Greenway.logo.svg";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

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
    setMobileOpen(false);
  };

  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      const navbarHeight = 100; // Height of the fixed navbar
      const elementPosition = footerElement.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { id: "services", label: "Services" },
    { id: "attorney", label: "Attorney" },
    { id: "articles", label: "Articles" },
    { id: "about-us", label: "About Us" },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: { xs: "70px", md: "100px" },
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          display: "flex",
          paddingInline: { xs: "20px", md: "80px" },
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 9999,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Desktop Logo */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Image
            src={Logo}
            alt="logo"
            width={240}
            height={60}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "240px",
              maxHeight: "60px",
            }}
          />
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "25px",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {navItems.map((item) => (
            <Typography
              key={item.id}
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: activeSection === item.id ? "#000000" : "#808080",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        {/* Mobile Hamburger Menu */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            src={Logo}
            alt="logo"
            width={240}
            height={60}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "240px",
              maxHeight: "60px",
            }}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop Login Button */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography
            // onClick={scrollToFooter}
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
            Login
          </Typography>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.id} sx={{ padding: "12px 0" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: activeSection === item.id ? "#000000" : "#808080",
                    cursor: "pointer",
                    width: "100%",
                    padding: "12px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Typography>
              </ListItem>
            ))}
            <ListItem sx={{ padding: "20px 0" }}>
              <Typography
                onClick={scrollToFooter}
                sx={{
                  backgroundColor: "#3D74FF",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                  height: "46px",
                  width: "100%",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
