import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import Swal from "sweetalert2";

const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+49", country: "Germany" },
];

export default function UserModal({ open, setOpen, carId }) {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [whatsappNotification, setWhatsappNotification] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    phoneNumber: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { firstName: "", phoneNumber: "" };

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Simple phone number validation (modify as needed)
    if (!phoneNumber.trim() || !/^\d{10,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // if (!validate()) return;

    if (firstName.trim() == "") {
      errors.firstName = "Please fill your name";
    }
    if (phoneNumber.trim() == "") {
      errors.phoneNumber = "Please enter mobile number";
    }

    let dataObj = {
      first_name: firstName,
      country_code: countryCode,
      phone_number: phoneNumber,
      allow_whatsapp_notification: whatsappNotification,
      carId,
    };

    try {
      let res = await axios.post(`http://localhost:5000/enquiry`, dataObj);
      if (res.status === 200) {
        setFirstName("");
        setPhoneNumber("");
        setCountryCode("+91");
        setWhatsappNotification(false);
        Swal.fire({
          title: "Good job!",
          text: "We received your enquiry, and we will contact you soon!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", mb: 1 }}
          >
            Fill your details
          </Typography>
          <p>We will connect you in 5 minutes</p>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Input
              placeholder="Full Name"
              value={firstName}
              required
              onChange={(e) => {
                validate();
                setFirstName(e.target.value);
              }}
              sx={{ height: "56px" }} // Set consistent height
              error={!!errors.firstName} // Display error state
            />
            {errors.firstName && (
              <Typography color="error" sx={{ mt: 1 }}>
                {errors.firstName}
              </Typography>
            )}
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              sx={{ mr: 1, flex: "0 1 auto", height: "56px" }} // Set consistent height
            >
              {countryCodes.map(({ code, country }) => (
                <MenuItem key={code} value={code}>
                  {code} {country}
                </MenuItem>
              ))}
            </Select>
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                validate();
                setPhoneNumber(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">{countryCode}</InputAdornment>
              }
              className="w-100"
              sx={{ height: "56px" }} // Set consistent height
              error={!!errors.phoneNumber} // Display error state
            />
          </FormControl>

          {errors.phoneNumber && (
            <p style={{ color: "red" }}>{errors.phoneNumber}</p>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={whatsappNotification}
                onChange={() => setWhatsappNotification(!whatsappNotification)}
              />
            }
            label="Allow notifications through WhatsApp"
            sx={{ mb: 2 }}
          />
          <Button
            variant="solid"
            color="warning"
            onClick={handleSubmit}
            sx={{ width: "100%", backgroundColor: "#ff6600", color: "#fff" }}
            disabled={
              !!errors.firstName ||
              !!errors.phoneNumber ||
              firstName.trim() == "" ||
              phoneNumber.trim() == ""
            } // Disable button if there are validation errors
          >
            Submit
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
