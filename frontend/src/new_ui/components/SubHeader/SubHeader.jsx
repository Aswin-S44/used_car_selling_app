import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";

function SubHeader() {
  return (
    <div className="sub-header">
      <div class="container-fluid bg-light p-0">
        <div class="row gx-0 d-none d-lg-flex">
          <div class="col-lg-7 px-5 text-start">
            <div class="h-100 d-inline-flex align-items-center py-3 me-4">
              <small class="fa fa-map-marker-alt text-primary me-2"></small>
              <small style={{ color: "#e34120", fontFamily: "sans-serif" }}>
                Limited Time Offer:
              </small>
            </div>
            <div class="h-100 d-inline-flex align-items-center py-3">
              <small class="far fa-clock text-primary me-2"></small>
              <small>
                <span
                  style={{
                    fontSize: "20px",
                    color: "#e34120",
                    fontWeight: "bold",
                  }}
                >
                  20% Off{" "}
                </span>
                on All Used Cars!
              </small>
            </div>
          </div>
          <div class="col-lg-5 px-5 text-end">
            <div class="h-100 d-inline-flex align-items-center py-3 me-4">
              <small class="fa fa-phone-alt text-primary me-2"></small>
              <small style={{ fontWeight: "bold", color: "#444" }}>
                <PhoneIcon />
                +91-9898112121
              </small>
            </div>
            <div class="h-100 d-inline-flex align-items-center">
              <a class="btn btn-sm-square bg-white text-primary me-1" href="">
                <FacebookIcon style={{ color: "blue" }} />
              </a>
              <a class="btn btn-sm-square bg-white text-primary me-1" href="">
                <InstagramIcon style={{ color: "#d62976" }} />
              </a>
              <a class="btn btn-sm-square bg-white text-primary me-1" href="">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubHeader;
