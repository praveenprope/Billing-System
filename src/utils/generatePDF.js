// utils/generatePDF.js
import { jsPDF } from "jspdf";

export const generatePDF = (cartItems, totalAmount, shopName) => {
  const doc = new jsPDF();

  // Add shop name to PDF
  doc.text(`Shop Name: ${shopName}`, 20, 20);

  // Add table headers
  doc.text("Product", 20, 30);
  doc.text("Price per Kg", 60, 30);
  doc.text("Price per Quantity", 100, 30);
  doc.text("Quantity", 140, 30);
  doc.text("Total", 180, 30);

  // Add table data
  let yOffset = 40;
  cartItems.forEach((item) => {
    doc.text(item.product, 20, yOffset);
    doc.text(`₹${item.pricePerKg.toFixed(2)}`, 60, yOffset);
    doc.text(`₹${item.pricePerQuantity.toFixed(2)}`, 100, yOffset);
    doc.text(item.quantityWithUnit, 140, yOffset);
    doc.text(`₹${item.totalPrice.toFixed(2)}`, 180, yOffset);
    yOffset += 10; // Move to next row
  });

  // Add total amount
  doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, yOffset);

  // Save the PDF
  doc.save("bill.pdf");
};
