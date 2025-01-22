import { jsPDF } from "jspdf";

export const generatePDF = (cartItems, totalAmount, shopName) => {
  console.log("Cart Items:", cartItems); // Debugging
  const doc = new jsPDF();

  // Add shop name to PDF
  doc.setFontSize(18);
  doc.text(`Shop Name: ${shopName}`, 20, 20);

  // Add table headers
  doc.setFontSize(12);
  doc.text("Product", 20, 30);
  doc.text("Price per Kg", 60, 30);
  doc.text("Price per Quantity", 100, 30);
  doc.text("Quantity", 140, 30);
  doc.text("Total", 180, 30);

  // Add table data
  let yOffset = 40;
  cartItems.forEach((item) => {
    console.log("Item:", item); // Debugging
    doc.text(item.product, 20, yOffset);
    doc.text(`₹${item.pricePerKg?.toFixed(2) || "0.00"}`, 60, yOffset); // Use optional chaining
    doc.text(`₹${item.pricePerQuantity?.toFixed(2) || "0.00"}`, 100, yOffset); // Use optional chaining
    doc.text(item.quantityWithUnit, 140, yOffset);
    doc.text(`₹${item.totalPrice?.toFixed(2) || "0.00"}`, 180, yOffset); // Use optional chaining
    yOffset += 10; // Move to next row
  });

  // Add total amount
  doc.setFontSize(14);
  doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, yOffset + 10);

  // Save the PDF
  doc.save("bill.pdf");
};