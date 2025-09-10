"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define TypeScript interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message?: string;
  legalService: string | null;
  state: string;
  city: string | null;
}

// Define Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(6, "Phone number must be at least 6   digits")
    .max(15, "Phone number must not exceed 15 digits"),
  message: yup.string(),
  legalService: yup.string().nullable().required("Legal Service is required"),
  state: yup.string().required("State is required"),
  city: yup.string().nullable().required("City is required"),
});

const Footer = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedLegalService, setSelectedLegalService] = useState<
    string | null
  >(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const usStates = State.getStatesOfCountry("US"); // List of U.S. states
    if (usStates) {
      setStates(usStates.map((state) => state.name));
    }
  }, []);

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
    "Not Sure / Other",
  ];

  // Listen for service selection from main page
  useEffect(() => {
    const handleServiceSelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      const serviceName = customEvent.detail;

      setSelectedLegalService(serviceName);
      setValue("legalService", serviceName); // Update the form field value
      trigger("legalService"); // Revalidate the field
    };

    // Check localStorage for pre-selected service
    const storedService = localStorage.getItem("selectedLegalService");
    if (storedService) {
      setSelectedLegalService(storedService);
      setValue("legalService", storedService); // Update the form field value
      trigger("legalService"); // Revalidate the field
      localStorage.removeItem("selectedLegalService"); // Clear after use
    }

    // Listen for custom event
    window.addEventListener("serviceSelected", handleServiceSelected);

    return () => {
      window.removeEventListener("serviceSelected", handleServiceSelected);
    };
  }, [trigger, setValue]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName ? errors.firstName.message : ""
                      }
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
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName ? errors.lastName.message : ""
                      }
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
                  )}
                />
              </Box>

              <Controller
                name="legalService"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={legalServices}
                    value={selectedLegalService}
                    onChange={(event, newValue) => {
                      console.log("Service selected in dropdown:", newValue);
                      field.onChange(newValue || null);
                      setSelectedLegalService(newValue);
                      trigger("legalService"); // Revalidate the field
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Legal Service Needed"
                        variant="outlined"
                        error={!!errors.legalService}
                        helperText={
                          errors.legalService ? errors.legalService.message : ""
                        }
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
                )}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
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
                  )}
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
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      +1
                    </Typography>
                  </Box>

                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        inputProps={{
                          pattern: "[0-9]*",
                          inputMode: "numeric",
                        }}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value);
                        }}
                        error={!!errors.phoneNumber}
                        helperText={
                          errors.phoneNumber ? errors.phoneNumber.message : ""
                        }
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
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: "20px" }}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={states}
                      onChange={(event, newValue) => {
                        field.onChange(newValue || "");
                        setSelectedState(newValue || "");
                        setSelectedCity(null); // Reset selected city when state changes
                        if (newValue === "American Samoa") {
                          setCities(["Pago Pago", "Tafuna", "Leone"]);
                        } else if (newValue === "Baker Island") {
                          setCities(["Baker City"]);
                        } else if (newValue === "Wake Island") {
                          setCities(["Wake City"]);
                        } else if (
                          newValue === "United States Virgin Islands"
                        ) {
                          setCities([
                            "Charlotte Amalie",
                            "Christiansted",
                            "Frederiksted",
                          ]);
                        } else if (
                          newValue === "United States Minor Outlying Islands"
                        ) {
                          setCities(["Johnston Atoll", "Kingman Reef"]);
                        } else if (newValue === "Palmyra Atoll") {
                          setCities(["Cooper Island"]);
                        } else if (newValue === "Northern Mariana Islands") {
                          setCities(["Saipan", "Tinian", "Rota"]);
                        } else if (newValue === "Navassa Island") {
                          setCities(["Navassa City"]);
                        } else if (newValue === "Midway Atoll") {
                          setCities(["Sand Island"]);
                        } else if (newValue === "Jarvis Island") {
                          setCities(["Jarvis City"]);
                        } else if (newValue === "Johnston Atoll") {
                          setCities(["Johnston City"]);
                        } else if (newValue === "Howland Island") {
                          setCities(["Howland City"]);
                        } else if (newValue === "Kingman Reef") {
                          setCities(["Kingman City"]);
                        } else if (newValue) {
                          const selectedStateObj = State.getStatesOfCountry(
                            "US"
                          ).find((state) => state.name === newValue);
                          const stateCode = selectedStateObj?.isoCode;
                          if (stateCode) {
                            const citiesInState = City.getCitiesOfState(
                              "US",
                              stateCode
                            );
                            setCities(citiesInState.map((city) => city.name));
                          }
                        } else {
                          setCities([]);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          variant="outlined"
                          error={!!errors.state}
                          helperText={errors.state ? errors.state.message : ""}
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
                  )}
                />

                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={cities}
                      onChange={(event, newValue) => {
                        field.onChange(newValue || null);
                        setSelectedCity(newValue || null);
                      }}
                      disabled={!selectedState}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          variant="outlined"
                          error={!!errors.city}
                          helperText={errors.city ? errors.city.message : ""}
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
                  )}
                />
              </Box>

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.message}
                    helperText={errors.message ? errors.message.message : ""}
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
              />

              <Button
                type="submit"
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
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
