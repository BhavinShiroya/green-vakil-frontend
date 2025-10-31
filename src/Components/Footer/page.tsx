"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { apiService, ApiError } from "../../services/api";

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
    .test(
      "phone-format",
      "Phone number must be in format: XXX XXX XXXX",
      function (value) {
        if (!value || value === "") return true; // Allow empty
        return /^\d{3} \d{3} \d{4}$/.test(value);
      }
    ),
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
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      legalService: "",
      state: "",
      city: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Show success message
      toast.success("Message sent successfully! We will contact you soon.", {
        duration: 4000,
        position: "top-right",
      });

      // Reset form and all state variables
      setSelectedLegalService(null);

      setSelectedState("");
      setCities([]);

      // Clear form fields manually to avoid validation triggers
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("email", "");
      setValue("phoneNumber", "");
      setValue("message", "");
      setValue("legalService", "");
      setValue("state", "");
      setValue("city", "");

      // Reset form state after clearing values
      setTimeout(() => {
        reset();
      }, 100);
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error message
      toast.error(
        "❌ Failed to send message. Please check your connection and try again.",
        {
          duration: 4000,
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedLegalService, setSelectedLegalService] = useState<
    string | null
  >(null);

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

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      setNewsletterError("Please enter a valid email address");
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      await apiService.subscribeToNewsletter(newsletterEmail);

      toast.success("Successfully subscribed to our newsletter!", {
        duration: 4000,
        position: "top-right",
      });

      setNewsletterEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);

      // Handle different error scenarios
      const apiError = error as ApiError;
      if (apiError.response?.status === 409) {
        setNewsletterError("This email is already subscribed");
      } else {
        toast.error("Failed to subscribe. Please try again later.", {
          duration: 4000,
          position: "top-right",
        });
      }
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          height: { xs: "1120px", md: "702px" },
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
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: { xs: "353px", md: "500px" },
              order: { xs: 0, md: 1 },
            }}
          >
            <Typography
              sx={{
                color: "#ffff",
                fontSize: { xs: "35px", md: "60px" },
                fontWeight: "800",
                lineHeight: "130%",
                fontFamily: "TTRamillas",
              }}
            >
              {`We Are Just A Message Away`}
            </Typography>
            <Typography
              sx={{
                color: "#ffff",
                fontSize: { xs: "15px", md: "16px" },
                fontWeight: "400",
                marginBottom: { xs: "0px", md: "30px" },
              }}
            >
              {` Whether you have questions or need legal help, we are here to connect
            you with the right support quickly and confidentially.`}
            </Typography>

            {/* Newsletter Subscription - Desktop View (in left column) */}
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
                mt: "80px",
              }}
            >
              <Typography
                sx={{
                  color: "#ffff",
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Stay Updated
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: "400",
                  marginBottom: "16px",
                  lineHeight: "160%",
                }}
              >
                Subscribe to our newsletter for legal insights, articles, and
                news.
              </Typography>
              <Box
                component="form"
                onSubmit={handleNewsletterSubmit}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: "12px",
                  alignItems: { xs: "stretch", md: "flex-start" },
                }}
              >
                <TextField
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    setNewsletterError("");
                  }}
                  error={!!newsletterError}
                  helperText={newsletterError}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      height: "48px",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3D74FF",
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                        padding: "12px 14px",
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.5)",
                          opacity: 1,
                        },
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "12px",
                    },
                  }}
                  disabled={isNewsletterSubmitting}
                />
                <Button
                  type="submit"
                  disabled={isNewsletterSubmitting || !newsletterEmail}
                  sx={{
                    backgroundColor: "#3D74FF",
                    color: "#fff",
                    borderRadius: "8px",
                    height: "48px",
                    padding: { xs: "12px 24px", md: "12px 32px" },
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    minWidth: "120px",
                    "&:hover": {
                      backgroundColor: "#2D5FDD",
                    },
                    "&:disabled": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                  {isNewsletterSubmitting ? (
                    <>
                      <CircularProgress
                        size={16}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Contact Form */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              padding: "0px",
              order: { xs: 1, md: 2 },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
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
                            errors.legalService
                              ? errors.legalService.message
                              : ""
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
                            pattern: "[0-9 ]*",
                            inputMode: "numeric",
                            maxLength: 12,
                          }}
                          onChange={(e) => {
                            // Only allow numbers and format as XXX XXX XXXX
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            let formattedValue = "";

                            if (value.length > 0) {
                              formattedValue = value.substring(0, 3);
                            }
                            if (value.length > 3) {
                              formattedValue += " " + value.substring(3, 6);
                            }
                            if (value.length > 6) {
                              formattedValue += " " + value.substring(6, 10);
                            }

                            field.onChange(formattedValue);
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
                        value={selectedState || null}
                        onChange={(event, newValue) => {
                          field.onChange(newValue || "");
                          setSelectedState(newValue || "");

                          setValue("city", ""); // Clear city form field
                          trigger("city"); // Revalidate city field
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
                        onInputChange={(event, newInputValue) => {
                          // Update selectedState when user types, so city field gets enabled
                          setSelectedState(newInputValue);
                          field.onChange(newInputValue || "");
                          // Clear city when state input is cleared or changed

                          setValue("city", "");
                          trigger("city");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            variant="outlined"
                            inputProps={{
                              ...params.inputProps,
                              maxLength: 12,
                            }}
                            error={!!errors.state}
                            helperText={
                              errors.state ? errors.state.message : ""
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
                        freeSolo
                        {...field}
                        options={cities}
                        value={watch("city") || ""}
                        onChange={(event, newValue) => {
                          field.onChange(newValue || "");
                          // Trigger validation to clear any errors
                          trigger("city");
                        }}
                        onInputChange={(event, newInputValue) => {
                          // Update form field value when user types custom city
                          field.onChange(newInputValue || "");

                          // Trigger validation to clear any errors
                          trigger("city");
                        }}
                        disabled={!watch("state")}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="City"
                            variant="outlined"
                            inputProps={{
                              ...params.inputProps,
                              maxLength: 17,
                            }}
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
                  disabled={isSubmitting}
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
                    "&:disabled": {
                      backgroundColor: "rgba(61, 116, 255, 0.5)",
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </form>
          </Box>

          {/* Newsletter Subscription */}
          <Box
            sx={{
              width: { xs: "100%", md: "500px" },
              order: { xs: 2, md: 3 },
              display: { xs: "block", md: "none" }, // Show only on mobile initially
            }}
          >
            <Typography
              sx={{
                color: "#ffff",
                fontSize: { xs: "18px", md: "20px" },
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Stay Updated
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: { xs: "14px", md: "15px" },
                fontWeight: "400",
                marginBottom: "16px",
                lineHeight: "160%",
              }}
            >
              Subscribe to our newsletter for legal insights, articles, and
              news.
            </Typography>
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "12px",
                alignItems: { xs: "stretch", md: "flex-start" },
              }}
            >
              <TextField
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  setNewsletterError("");
                }}
                error={!!newsletterError}
                helperText={newsletterError}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    height: "48px",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3D74FF",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff",
                      padding: "12px 14px",
                      "&::placeholder": {
                        color: "rgba(255, 255, 255, 0.5)",
                        opacity: 1,
                      },
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "12px",
                  },
                }}
                disabled={isNewsletterSubmitting}
              />
              <Button
                type="submit"
                disabled={isNewsletterSubmitting || !newsletterEmail}
                sx={{
                  backgroundColor: "#3D74FF",
                  color: "#fff",
                  borderRadius: "8px",
                  height: "48px",
                  padding: { xs: "12px 24px", md: "12px 32px" },
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  minWidth: "120px",
                  "&:hover": {
                    backgroundColor: "#2D5FDD",
                  },
                  "&:disabled": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                {isNewsletterSubmitting ? (
                  <>
                    <CircularProgress
                      size={16}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom Section */}
      <Box>
        <Box
          sx={{
            backgroundColor: "#1D2331",
            // borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingInline: { xs: "20px", md: "80px" },
            paddingBlock: { xs: "40px", md: "30px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: { xs: "30px", md: "60px" },
              maxWidth: "1500px",
              margin: "0 auto",
            }}
          >
            {/* Logo and Description */}
            <Box sx={{ width: { xs: "100%", md: "30%" } }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#fff",
                  fontFamily: "TTRamillas",
                  marginBottom: "15px",
                }}
              >
                Greenway Lawyer
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "160%",
                }}
              >
                Your trusted gateway to expert legal support. Connecting you
                with qualified attorneys across the United States.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box sx={{ width: { xs: "100%", md: "20%" } }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Quick Links
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Typography
                  component="a"
                  href="#about-us"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3D74FF",
                    },
                  }}
                >
                  About Us
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3D74FF",
                    },
                  }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3D74FF",
                    },
                  }}
                >
                  Terms of Service
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3D74FF",
                    },
                  }}
                >
                  Disclaimer
                </Typography>
              </Box>
            </Box>

            {/* Contact Info */}
            <Box sx={{ width: { xs: "100%", md: "25%" } }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Contact Info
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Email: info@greenwaylawyer.com
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Phone:<a href="tel:+15514207661"> +1 (551) 420-7661</a>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  United States
                </Typography>
              </Box>
            </Box>

            {/* Social Media Links */}
            <Box sx={{ width: { xs: "100%", md: "20%" } }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Follow Us
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                <Box
                  component="a"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#3D74FF",
                    },
                  }}
                >
                  <FaInstagram size={20} style={{ color: "#fff" }} />
                </Box>
                <Box
                  component="a"
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#3D74FF",
                    },
                  }}
                >
                  <FaXTwitter size={20} style={{ color: "#fff" }} />
                </Box>
                <Box
                  component="a"
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#3D74FF",
                    },
                  }}
                >
                  <FaYoutube size={20} style={{ color: "#fff" }} />
                </Box>
                <Box
                  component="a"
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#3D74FF",
                    },
                  }}
                >
                  <FaLinkedin size={20} style={{ color: "#fff" }} />
                </Box>
                <Box
                  component="a"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#3D74FF",
                    },
                  }}
                >
                  <FaFacebook size={20} style={{ color: "#fff" }} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Copyright */}
          <Box
            sx={{
              marginTop: { xs: "30px", md: "40px" },
              paddingTop: { xs: "20px", md: "30px" },
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              © {new Date().getFullYear()} Greenway Lawyer. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
