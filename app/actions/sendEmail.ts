"use server";

import nodemailer from "nodemailer";

export async function sendRecommendationEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const productInfo = formData.get("productInfo") as string;

  if (!name || !productInfo) {
    return { error: "Name and Product Info are required." };
  }

  const userEmail = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!userEmail || !pass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
    return { error: "Email configuration is missing on the server. Please set EMAIL_USER and EMAIL_PASS." };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: pass,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: userEmail, // Send to the owner's email account
      subject: `New Product Recommendation from ${name}`,
      text: `Hello,\n\nYou have a new product recommendation from ${name}.\n\nProduct Name / URL:\n${productInfo}\n\nBest,\nPureFinds`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "Failed to send email. Please try again later." };
  }
}
