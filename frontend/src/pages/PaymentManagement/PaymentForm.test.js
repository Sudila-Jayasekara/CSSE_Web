// PaymentForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import { paymentService } from "../../services/paymentService";

import '@testing-library/jest-dom';


jest.mock("../../services/paymentService"); // Mock paymentService

describe("PaymentForm", () => {
  beforeEach(() => {
    // Setting up the default amount to be passed
    const mockLocation = {
      state: { amount: 100 },
    };
    screen.debug();

    // Render the component inside a Router to mimic routing
    render(
      <Router>
        <PaymentForm location={mockLocation} />
      </Router>
    );
  });

  it("renders the payment form", () => {
    expect(screen.getByText(/Payment Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount to Pay:/i)).toBeInTheDocument();
  });

  it("allows input of card details", () => {
    fireEvent.change(screen.getByLabelText(/Name on card/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Card number/i), {
      target: { value: "4111 1111 1111 1111" },
    });
    expect(screen.getByLabelText(/Name on card/i).value).toBe("John Doe");
    expect(screen.getByLabelText(/Card number/i).value).toBe("4111 1111 1111 1111");
  });



  it("submits the payment", async () => {
    fireEvent.change(screen.getByLabelText(/Name on card/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Card number/i), {
      target: { value: "4111 1111 1111 1111" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "1234567890" },
    });
    
    // Mock the implementation of paymentService.savePayment
    paymentService.savePayment.mockResolvedValueOnce(); // Mock success

    fireEvent.click(screen.getByRole("button", { name: /Submit Payment/i }));

    expect(paymentService.savePayment).toHaveBeenCalledTimes(1);
    expect(paymentService.savePayment).toHaveBeenCalledWith(expect.objectContaining({
      amount: 100, // Check that the amount passed is correct
      user: expect.any(Object), // Check that a user object is being passed
    }));
  });

  it("displays success message after successful payment", async () => {
    fireEvent.change(screen.getByLabelText(/Name on card/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Card number/i), {
      target: { value: "4111 1111 1111 1111" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "1234567890" },
    });
    
    paymentService.savePayment.mockResolvedValueOnce(); // Mock success

    fireEvent.click(screen.getByRole("button", { name: /Submit Payment/i }));

    // Wait for the success popup to appear
    const successMessage = await screen.findByText(/Payment Success/i);
    expect(successMessage).toBeInTheDocument();
  });
});
