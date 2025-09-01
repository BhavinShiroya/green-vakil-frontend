"use client";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "@/Components/Navbar/page";
import HomeImage from "../../public/Lawyer.png";
import CorporateIcon from "../../public/CorporateIcon.svg";
import FamilyIcon from "../../public/FamilyIcon.svg";
import EstateIcon from "../../public/EstateIcon.svg";
import ImmigrationIcon from "../../public/ImmigrationIcon.svg";
import CriminalIcon from "../../public/CriminalIcon.svg";
import RealEstateIcon from "../../public/RealIcon.svg";
import PersonalInjuryIcon from "../../public/PersonalIcon.svg";
import EmploymentIcon from "../../public/EmploymentIcon.svg";
import AttorneyImage from "../../public/femaleJudge.svg";
import Footer from "@/Components/Footer/page";

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

  return (
    <Box sx={{ marginTop: "100px", backgroundColor: "#f5f5f5" }}>
      <Navbar />
      {/* Home Section */}
      <Box
        id="home"
        sx={{
          // minHeight: "100vh",
          paddingInline: "80px",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          display: "flex",
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
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: "start",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: "800",
              width: "655px",
              letterSpacing: "0px",
              lineHeight: "120%",
              fontFamily: "TTRamillas",
            }}
          >
            Find Your Legal Ally with Greenway Lawyer
          </Typography>
          <Typography
            sx={{ width: "655px", fontSize: "16px", fontWeight: "400" }}
          >
            we’re your trusted gateway to the best legal support. We bridge the
            gap between you and the right attorney, simplifying your search so
            you can focus on moving forward with confidence.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#3D74FF",
              color: "#fff",
              fontSize: "19px",
              fontWeight: "500",
              height: "55px",
              width: "178px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mt: "50px",
              // textAlign:"start"
            }}
          >
            Contact Us
          </Button>
        </Box>
        <Box>
          <Image src={HomeImage} alt="home" width={578} height={578} />
        </Box>
      </Box>

      {/* Services Section */}
      <Box
        id="services"
        sx={{
          // minHeight: "100vh",
          paddingInline: "80px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          display: "flex",
          paddingTop: "120px",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "60px",
            fontWeight: "800",
            width: "717px",
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
          <Box sx={{ marginTop: "30px", display: "flex", gap: "30px" }}>
            <Box
              onClick={() => handleServiceClick("Corporate & Business Law")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={CorporateIcon}
                  alt="CorporateIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Corporate & Business Law
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  Smart legal guidance for startups, entrepreneurs, and
                  enterprises protecting your business at every stage.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Family & Divorce Law")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={FamilyIcon}
                  alt="FamilyIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Family & Divorce Law
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  Navigating life’s most personal transitions with care,
                  clarity, and compassion from trusted legal experts.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "30px", display: "flex", gap: "30px" }}>
            <Box
              onClick={() => handleServiceClick("Estate Planning & Wills")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={EstateIcon}
                  alt="EstateIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Estate Planning & Wills
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  Secure your future and protect your loved ones plan with
                  confidence through skilled legal support.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Immigration Law")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={ImmigrationIcon}
                  alt="ImmigrationIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Immigration Law
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  Smart legal guidance for startups, clear, reliable help
                  through complex immigration matters whether it’s visas, green
                  cards, or citizenship. entrepreneurs, and enterprises
                  protecting your business at every stage.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "30px", display: "flex", gap: "30px" }}>
            <Box
              onClick={() => handleServiceClick("Criminal Defense")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={CriminalIcon}
                  alt="CriminalIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Criminal Defense
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  Strong, strategic defense when it matters most—your rights
                  protected by experienced professionals.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Real Estate Law")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={RealEstateIcon}
                  alt="RealEstateIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Real Estate Law
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  From buying a home to resolving disputes, get dependable legal
                  help for all your property matters.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "30px", display: "flex", gap: "30px" }}>
            <Box
              onClick={() => handleServiceClick("Personal Injury Law")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={PersonalInjuryIcon}
                  alt="PersonalInjuryIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Personal Injury Law
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
                  If you’ve been hurt, we connect you with attorneys who fight
                  for your compensation and peace of mind.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleServiceClick("Employment & Labor Law")}
              sx={{
                width: "625px",
                height: "150px",
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
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F1F5FF",
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={EmploymentIcon}
                  alt="EmploymentIcon"
                  width={46}
                  height={43}
                />
              </Box>
              <Box sx={{ marginLeft: "30px", textAlign: "left" }}>
                <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                  Employment & Labor Law
                </Typography>
                <Typography sx={{ width: "445px", mt: "8px" }}>
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
          height: "500px",
          marginTop: "120px",
          backgroundColor: "#3D74FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={AttorneyImage}
            alt="AttorneyImage"
            width={486}
            height={500}
          />
        </Box>
        <Box
          sx={{
            width: "745px",
          }}
        >
          <Typography
            sx={{
              fontSize: "60px",
              fontWeight: "800",
              color: "#fff",
              fontFamily: "TTRamillas",
            }}
          >
            Are You an Attorney?
          </Typography>
          <Typography
            sx={{ fontSize: "17px", fontWeight: "400", color: "#fff" }}
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
              mt: "50px",
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
