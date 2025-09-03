"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedLegalService, setSelectedLegalService] = useState<
    string | null
  >(null);

  // Legal services options
  const legalServices = [
    "Immigration Law",
    "Real Estate Law",
    "Corporate & Business Law",
    "Family & Divorce Law",
    "Estate Planning & Wills",
    "Criminal Defense",
    "Personal Injury Law",
    "Employment & Labor Law",
  ];

  // Cities data for each state
  const stateCities: { [key: string]: string[] } = {
    AL: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"],
    AK: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"],
    AZ: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
    AR: [
      "Little Rock",
      "Fort Smith",
      "Fayetteville",
      "Springdale",
      "Jonesboro",
    ],
    CA: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno"],
    CO: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
    CT: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"],
    DE: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"],
    FL: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg"],
    GA: ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah"],
    HI: ["Honolulu", "Hilo", "Kailua", "Kapolei", "Kaneohe"],
    ID: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello"],
    IL: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville"],
    IN: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
    IA: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
    KS: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe"],
    KY: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
    LA: [
      "New Orleans",
      "Baton Rouge",
      "Shreveport",
      "Lafayette",
      "Lake Charles",
    ],
    ME: ["Portland", "Lewiston", "Bangor", "Auburn", "Biddeford"],
    MD: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie"],
    MA: ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge"],
    MI: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing"],
    MN: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington"],
    MS: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"],
    MO: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"],
    MT: ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte"],
    NE: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
    NV: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Carson City"],
    NH: ["Manchester", "Nashua", "Concord", "Dover", "Rochester"],
    NJ: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"],
    NM: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
    NY: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
    NC: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
    ND: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
    OH: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
    OK: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton"],
    OR: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro"],
    PA: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
    RI: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"],
    SC: [
      "Columbia",
      "Charleston",
      "North Charleston",
      "Mount Pleasant",
      "Rock Hill",
    ],
    SD: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
    TN: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
    TX: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
    UT: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
    VT: ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"],
    VA: ["Virginia Beach", "Norfolk", "Richmond", "Arlington", "Newport News"],
    WA: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    WV: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
    WI: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
    WY: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
  };

  // Listen for service selection from main page
  useEffect(() => {
    const handleServiceSelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      const serviceName = customEvent.detail;
      setSelectedLegalService(serviceName);
    };

    // Check localStorage for pre-selected service
    const storedService = localStorage.getItem("selectedLegalService");
    if (storedService) {
      setSelectedLegalService(storedService);
      localStorage.removeItem("selectedLegalService"); // Clear after use
    }

    // Listen for custom event
    window.addEventListener("serviceSelected", handleServiceSelected);

    return () => {
      window.removeEventListener("serviceSelected", handleServiceSelected);
    };
  }, []);

  // Removed handleStateChange

  return (
    <Box
      sx={{
        height: { xs: "952px", md: "702px" },
        backgroundColor: "#1D2331",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: { xs: "20px", md: "80px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          justifyContent: "center",
          gap: { xs: "40px", md: "120px" },
        }}
      >
        <Box sx={{ width: { xs: "353px", md: "500px" } }}>
          <Typography
            sx={{
              color: "#ffff",
              fontSize: { xs: "35px", md: "60px" },
              fontWeight: "800",
              lineHeight: "130%",
              fontFamily: "TTRamillas",
            }}
          >
            {`We're Just a Message Away`}
          </Typography>
          <Typography
            sx={{
              color: "#ffff",
              fontSize: { xs: "15px", md: "16px" },
              fontWeight: "400",
            }}
          >
            {` Whether you have questions or need legal help, we're here to connect
            you with the right support quickly and confidentially.`}
          </Typography>
        </Box>

        {/* Contact Form */}
        <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "0px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
            />

            <Autocomplete
              options={legalServices}
              value={selectedLegalService}
              onChange={(event, newValue) => setSelectedLegalService(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Legal Service Needed"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                      "&.Mui-focused": {
                        color: "white",
                      },
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-popupIndicator": {
                  color: "white",
                },
                "& .MuiAutocomplete-clearIndicator": {
                  color: "white",
                },
              }}
              ListboxProps={{
                sx: {
                  backgroundColor: "#1D2331",
                  color: "white",
                  "& .MuiAutocomplete-option": {
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                },
              }}
            />

            <Box sx={{ display: "flex", gap: "20px",flexDirection: { xs: "column", md: "row" } }}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                sx={{
                  width: { xs: "100%", md: "50%" },
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
              />

              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  display: "flex",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "56px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}
                  >
                    +1
                  </Typography>
                </Box>

                <TextField
                  label="Phone Number"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                      "&.Mui-focused": {
                        color: "white",
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "20px" }}>
              <Autocomplete
                options={Object.keys(stateCities)}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue || "");
                  if (newValue) {
                    setCities(stateCities[newValue] || []);
                  } else {
                    setCities([]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                        "&.Mui-focused": {
                          color: "white",
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  width: "50%",
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "white",
                  },
                  "& .MuiAutocomplete-clearIndicator": {
                    color: "white",
                  },
                }}
                ListboxProps={{
                  sx: {
                    backgroundColor: "#1D2331",
                    color: "white",
                    maxHeight: "200px",
                    "& .MuiAutocomplete-option": {
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                  },
                }}
                getOptionLabel={(option) => {
                  const stateNames: { [key: string]: string } = {
                    AL: "Alabama",
                    AK: "Alaska",
                    AZ: "Arizona",
                    AR: "Arkansas",
                    CA: "California",
                    CO: "Colorado",
                    CT: "Connecticut",
                    DE: "Delaware",
                    FL: "Florida",
                    GA: "Georgia",
                    HI: "Hawaii",
                    ID: "Idaho",
                    IL: "Illinois",
                    IN: "Indiana",
                    IA: "Iowa",
                    KS: "Kansas",
                    KY: "Kentucky",
                    LA: "Louisiana",
                    ME: "Maine",
                    MD: "Maryland",
                    MA: "Massachusetts",
                    MI: "Michigan",
                    MN: "Minnesota",
                    MS: "Mississippi",
                    MO: "Missouri",
                    MT: "Montana",
                    NE: "Nebraska",
                    NV: "Nevada",
                    NH: "New Hampshire",
                    NJ: "New Jersey",
                    NM: "New Mexico",
                    NY: "New York",
                    NC: "North Carolina",
                    ND: "North Dakota",
                    OH: "Ohio",
                    OK: "Oklahoma",
                    OR: "Oregon",
                    PA: "Pennsylvania",
                    RI: "Rhode Island",
                    SC: "South Carolina",
                    SD: "South Dakota",
                    TN: "Tennessee",
                    TX: "Texas",
                    UT: "Utah",
                    VT: "Vermont",
                    VA: "Virginia",
                    WA: "Washington",
                    WV: "West Virginia",
                    WI: "Wisconsin",
                    WY: "Wyoming",
                  };
                  return stateNames[option] || option;
                }}
              />

              <Autocomplete
                options={cities}
                disabled={!selectedState}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                        "&.Mui-focused": {
                          color: "white",
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  width: "50%",
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "white",
                  },
                  "& .MuiAutocomplete-clearIndicator": {
                    color: "white",
                  },
                }}
                ListboxProps={{
                  sx: {
                    backgroundColor: "#1D2331",
                    color: "white",
                    maxHeight: "200px",
                    "& .MuiAutocomplete-option": {
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                  },
                }}
              />
            </Box>

            <TextField
              label="Field of Law"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
            />

            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3D74FF",
                color: "white",
                height: "50px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2D5FCC",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
