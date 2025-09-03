"use client";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "@/Components/Navbar/page";
import HomeImage from "../../public/Lawyer.png";
import CorporateIcon from "../../public/CorporateIcon.svg";
import Arrow from "../../public/arrow.svg";
import FamilyIcon from "../../public/FamilyIcon.svg";
import EstateIcon from "../../public/EstateIcon.svg";
import ImmigrationIcon from "../../public/ImmigrationIcon.svg";
import CriminalIcon from "../../public/CriminalIcon.svg";
import RealEstateIcon from "../../public/RealIcon.svg";
import PersonalInjuryIcon from "../../public/PersonalIcon.svg";
import EmploymentIcon from "../../public/EmploymentIcon.svg";
import AttorneyImage from "../../public/femaleJudge.svg";
import Footer from "@/Components/Footer/page";
import { useEffect, useState } from "react";

export default function Home() {
  const handleServiceClick = (serviceName: string) => {
    // Scroll to footer - target the beginning of the footer section
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      // Scroll to the top of the footer section with some offset for better visibility
      const footerTop = footerElement.offsetTop;
      const offset = 60; // Add some space above the footer
      window.scrollTo({
        top: footerTop - offset,
        behavior: "smooth",
      });
    }

    // Store the selected service in localStorage to pass to footer
    localStorage.setItem("selectedLegalService", serviceName);

    // Trigger a custom event to notify footer component
    window.dispatchEvent(
      new CustomEvent("serviceSelected", { detail: serviceName })
    );
  };

  const [homeDimensions, setHomeDimensions] = useState({ width: 0, height: 0 });
  const [attorneyDimensions, setAttorneyDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateHomeDimensions = () => {
        setHomeDimensions({
          width: window.innerWidth < 600 ? 353 : 578,
          height: window.innerWidth < 600 ? 357 : 578,
        });
      };

      const updateAttorneyDimensions = () => {
        setAttorneyDimensions({
          width: window.innerWidth < 600 ? 274 : 486,
          height: window.innerWidth < 600 ? 411 : 500,
        });
      };

      updateHomeDimensions(); // Set initial dimensions for HomeImage
      updateAttorneyDimensions(); // Set initial dimensions for AttorneyImage
      window.addEventListener("resize", updateHomeDimensions);
      window.addEventListener("resize", updateAttorneyDimensions);

      return () => {
        window.removeEventListener("resize", updateHomeDimensions);
        window.removeEventListener("resize", updateAttorneyDimensions);
      };
    }
  }, []);

  return (
    <Box sx={{ marginTop: { md: "100px" }, backgroundColor: "#f5f5f5" }}>
      <Navbar />
      {/* Home Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          paddingInline: "80px",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          paddingTop: "80px",
          gap: "47px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "start",
            width: { xs: "353px", sm: "unset" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: "center", md: "start" },
              fontSize: { xs: "40px", md: "60px" },
              fontWeight: "800",
              width: { xs: "353px", sm: "655px" },
              letterSpacing: "0px",
              lineHeight: "120%",
              fontFamily: "TTRamillas",
              marginTop: { xs: "100px", md: "0px" },
            }}
          >
            Find Your Legal Ally with Greenway Lawyer
          </Typography>
          <Typography
            sx={{
              width: { xs: "353px", sm: "655px" },
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: "400",
              textAlign: { xs: "center", md: "start" },
            }}
          >
            we’re your trusted gateway to the best legal support. We bridge the
            gap between you and the right attorney, simplifying your search so
            you can focus on moving forward with confidence.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#3D74FF",
              color: "#fff",
              fontSize: { xs: "16px", md: "19px" },
              fontWeight: "500",
              height: "55px",
              width: "178px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mt: "50px",
              mx: { xs: "auto", md: 0 }, // Center horizontally only on mobile
            }}
          >
            Contact Us
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={HomeImage}
            alt="home"
            style={{
              width: `${homeDimensions.width}px`,
              height: `${homeDimensions.height}px`,
            }}
          />
        </Box>
      </Box>

      {/* Services Section */}
      <Box
        id="services"
        sx={{
          // minHeight: "100vh",
          paddingInline: { xs: "20px", md: "80px" },
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          display: "flex",
          paddingTop: { xs: "80px", md: "120px" },
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "35px", md: "60px" },
            fontWeight: "800",
            width: { xs: "353px", md: "717px" },
            textAlign: "start",
            fontFamily: "TTRamillas",
            marginLeft: { xs: "0px", xl: "230px" },
          }}
        >
          Legal Services We Connect You With
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "30px",
            }}
          >
            <Box
              onClick={() => handleServiceClick("Corporate & Business Law")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={CorporateIcon}
                  alt="CorporateIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Corporate & Business Law
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  Smart legal guidance for startups, entrepreneurs, and
                  enterprises protecting your business at every stage.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Family & Divorce Law")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={FamilyIcon}
                  alt="FamilyIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Family & Divorce Law
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  Navigating life’s most personal transitions with care,
                  clarity, and compassion from trusted legal experts.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              gap: "30px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              onClick={() => handleServiceClick("Estate Planning & Wills")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={EstateIcon}
                  alt="EstateIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Estate Planning & Wills
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  Secure your future and protect your loved ones plan with
                  confidence through skilled legal support.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Immigration Law")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={ImmigrationIcon}
                  alt="ImmigrationIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Immigration Law
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  Smart legal guidance for startups, clear, reliable help
                  through complex immigration matters whether it’s visas, green
                  cards, or citizenship. entrepreneurs, and enterprises
                  protecting your business at every stage.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              gap: "30px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              onClick={() => handleServiceClick("Criminal Defense")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={CriminalIcon}
                  alt="CriminalIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Criminal Defense
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  Strong, strategic defense when it matters most—your rights
                  protected by experienced professionals.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Real Estate Law")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={RealEstateIcon}
                  alt="RealEstateIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Real Estate Law
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  From buying a home to resolving disputes, get dependable legal
                  help for all your property matters.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              gap: "30px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              onClick={() => handleServiceClick("Personal Injury Law")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={PersonalInjuryIcon}
                  alt="PersonalInjuryIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Personal Injury Law
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  If you’ve been hurt, we connect you with attorneys who fight
                  for your compensation and peace of mind.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Employment & Labor Law")}
              sx={{
                width: { xs: "353px", md: "625px" },
                height: { xs: "214px", md: "150px" },
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                },
                mx: "auto", // Center horizontally
                position: "relative", // Enable absolute positioning for children
              }}
            >
              <Image
                src={Arrow}
                alt="ArrowIcon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { xs: "absolute", md: "static" },
                  top: { xs: "20px", md: "auto" },
                  left: { xs: "20px", md: "auto" },
                }}
              >
                <Image
                  src={EmploymentIcon}
                  alt="EmploymentIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: { md: "30px" },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "21px" },
                    fontWeight: "500",
                    marginTop: { xs: "80px", md: "unset" },
                  }}
                >
                  Employment & Labor Law
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    width: { xs: "313px", md: "445px" },
                    mt: "8px",
                  }}
                >
                  {`Know your rights at work whether you're an employee or
                  employer, get expert legal insight on workplace matters.`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Attorney Section */}
      <Box
        id="attorney"
        sx={{
          height: { xs: "715px",sm:"760px", md: "500px" },
          marginTop: "120px",
          backgroundColor: "#3D74FF",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "start", md: "center" },
          justifyContent: "center", // Ensure image is at the end
          paddingInline: { xs: "20px", md: "unset" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "0px", md: "0" },
            order: { xs: 1, md: 0 }, // Move to top in mobile view
          }}
        >
          <Image
            src={AttorneyImage}
            alt="AttorneyImage"
            style={{
              width: `${attorneyDimensions.width}px`,
              height: `${attorneyDimensions.height}px`,
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "745px" },
            textAlign: { xs: "start", md: "left" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "35px", md: "60px" },
              fontWeight: "800",
              color: "#fff",
              fontFamily: "TTRamillas",
              marginBottom: { xs: "10px", md: "0" },
              marginTop: { xs: "50px", md: "unset" },
            }}
          >
            Are You an Attorney?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "15px", md: "17px" },
              fontWeight: "400",
              color: "#fff",
              marginBottom: { xs: "20px", md: "0" },
              textAlign: { xs: "start", md: "unset" },
            }}
          >
            We’re building a trusted network of legal professionals across the
            U.S. If you’re an attorney and want to be listed on our platform,
            we’d love to hear from you.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#000000",
              borderRadius: "12px",
              mt: { xs: "20px", md: "50px" },
              height: "57px",
              width: "210px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Join Our Network
          </Button>
        </Box>
      </Box>

      {/* About Us Section */}
      <Box
        id="about-us"
        sx={{
          // minHeight: "100vh",
          marginTop: "120px",
          paddingInline: "80px",
          // backgroundColor: "#f5f5f5",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: "60px",
              fontWeight: "800",
              color: "#000000",
              fontFamily: "TTRamillas",
            }}
          >
            About Us
          </Typography>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#000000",
              width: "50%",
            }}
          >
            {` Greenway Lawyer is a legal services platform by Festlyn LLC,
            dedicated to helping people find the best lawyers for their unique
            legal needs. While we are not a law firm ourselves, we connect you
            with experienced, trusted legal professionals who are. Our mission
            is to simplify the process of finding the right attorney whether
            you're facing a complex legal matter or simply need guidance by
            offering a reliable, transparent, and user friendly experience.
            Every lawyer in our network is thoroughly vetted, so you can move
            forward with confidence knowing you’re in capable hands.`}
          </Typography>
        </Box>
      </Box>
      <Box id="footer" sx={{ marginTop: "120px" }}>
        <Footer />
      </Box>
      {/* Footer Section */}
    </Box>
  );
}
