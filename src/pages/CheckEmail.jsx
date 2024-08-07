import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function CheckYourEmail() {
  return (
    <MDBContainer className="gradient-form">
      <MDBRow>
        <MDBCol col="12">
          <div className="d-flex flex-column justify-content-center vh-100">
            <h2 className="text-center">Check Your Email</h2>
            <p className="text-center">We have sent a password reset link to your email address. Please follow the instructions in the email to reset your password.</p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}