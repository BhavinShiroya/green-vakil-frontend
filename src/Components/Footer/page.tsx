"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  colors,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

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

  // Close dropdowns when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setStateDropdownOpen(false);
      setCityDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStateChange = (event: any) => {
    const state = event.target.value;
    setSelectedState(state);
    if (state) {
      setCities(stateCities[state] || []);
    } else {
      setCities([]);
    }
  };

  return (
    <Box
      sx={{
        height: "702px",
        backgroundColor: "#1D2331",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "80px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "120px",
        }}
      >
        <Box sx={{ width: "500px" }}>
          <Typography
            sx={{
              color: "#ffff",
              fontSize: "60px",
              fontWeight: "800",
              lineHeight: "130%",
              fontFamily: "TTRamillas",
            }}
          >
            We're Just a Message Away
          </Typography>
          <Typography
            sx={{ color: "#ffff", fontSize: "16px", fontWeight: "400" }}
          >
            Whether you have questions or need legal help, we're here to connect
            you with the right support quickly and confidentially.
          </Typography>
        </Box>

        {/* Contact Form */}
        <Box sx={{ width: "50%", padding: "0px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Full Name */}
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

            {/* Email and Phone in same line */}
            <Box sx={{ display: "flex", gap: "20px" }}>
              {/* Email */}
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                sx={{
                  width: "50%",
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

              {/* Phone Number with Country Code */}
              <Box sx={{ width: "50%", display: "flex", gap: "8px" }}>
                {/* Country Code Dropdown */}
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

                {/* Phone Number Input */}
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

            {/* State and City in same line */}
            <Box sx={{ display: "flex", gap: "20px" }}>
              {/* State Dropdown */}
              <FormControl sx={{ width: "50%" }}>
                <InputLabel
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  State
                </InputLabel>
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  open={stateDropdownOpen}
                  onOpen={() => setStateDropdownOpen(true)}
                  onClose={() => setStateDropdownOpen(false)}
                  label="State"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#1D2331",
                        color: "white",
                        maxHeight: "200px",
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                        },
                      },
                    },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    disableScrollLock: true,
                  }}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                  }}
                >
                  <MenuItem value="">Select State</MenuItem>
                  <MenuItem value="AL">Alabama</MenuItem>
                  <MenuItem value="AK">Alaska</MenuItem>
                  <MenuItem value="AZ">Arizona</MenuItem>
                  <MenuItem value="AR">Arkansas</MenuItem>
                  <MenuItem value="CA">California</MenuItem>
                  <MenuItem value="CO">Colorado</MenuItem>
                  <MenuItem value="CT">Connecticut</MenuItem>
                  <MenuItem value="DE">Delaware</MenuItem>
                  <MenuItem value="FL">Florida</MenuItem>
                  <MenuItem value="GA">Georgia</MenuItem>
                  <MenuItem value="HI">Hawaii</MenuItem>
                  <MenuItem value="ID">Idaho</MenuItem>
                  <MenuItem value="IL">Illinois</MenuItem>
                  <MenuItem value="IN">Indiana</MenuItem>
                  <MenuItem value="IA">Iowa</MenuItem>
                  <MenuItem value="KS">Kansas</MenuItem>
                  <MenuItem value="KY">Kentucky</MenuItem>
                  <MenuItem value="LA">Louisiana</MenuItem>
                  <MenuItem value="ME">Maine</MenuItem>
                  <MenuItem value="MD">Maryland</MenuItem>
                  <MenuItem value="MA">Massachusetts</MenuItem>
                  <MenuItem value="MI">Michigan</MenuItem>
                  <MenuItem value="MN">Minnesota</MenuItem>
                  <MenuItem value="MS">Mississippi</MenuItem>
                  <MenuItem value="MO">Missouri</MenuItem>
                  <MenuItem value="MT">Montana</MenuItem>
                  <MenuItem value="NE">Nebraska</MenuItem>
                  <MenuItem value="NV">Nevada</MenuItem>
                  <MenuItem value="NH">New Hampshire</MenuItem>
                  <MenuItem value="NJ">New Jersey</MenuItem>
                  <MenuItem value="NM">New Mexico</MenuItem>
                  <MenuItem value="NY">New York</MenuItem>
                  <MenuItem value="NC">North Carolina</MenuItem>
                  <MenuItem value="ND">North Dakota</MenuItem>
                  <MenuItem value="OH">Ohio</MenuItem>
                  <MenuItem value="OK">Oklahoma</MenuItem>
                  <MenuItem value="OR">Oregon</MenuItem>
                  <MenuItem value="PA">Pennsylvania</MenuItem>
                  <MenuItem value="RI">Rhode Island</MenuItem>
                  <MenuItem value="SC">South Carolina</MenuItem>
                  <MenuItem value="SD">South Dakota</MenuItem>
                  <MenuItem value="TN">Tennessee</MenuItem>
                  <MenuItem value="TX">Texas</MenuItem>
                  <MenuItem value="UT">Utah</MenuItem>
                  <MenuItem value="VT">Vermont</MenuItem>
                  <MenuItem value="VA">Virginia</MenuItem>
                  <MenuItem value="WA">Washington</MenuItem>
                  <MenuItem value="WV">West Virginia</MenuItem>
                  <MenuItem value="WI">Wisconsin</MenuItem>
                  <MenuItem value="WY">Wyoming</MenuItem>
                </Select>
              </FormControl>

              {/* City Dropdown */}
              <FormControl sx={{ width: "50%" }}>
                <InputLabel
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  City
                </InputLabel>
                <Select
                  disabled={!selectedState}
                  open={cityDropdownOpen}
                  onOpen={() => setCityDropdownOpen(true)}
                  onClose={() => setCityDropdownOpen(false)}
                  label="City"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#1D2331",
                        color: "white",
                        maxHeight: "200px",
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                        },
                      },
                    },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    disableScrollLock: true,
                  }}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                  }}
                >
                  <MenuItem value="">Select City</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Field */}
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

            {/* Message Textarea */}
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

            {/* Submit Button */}
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
