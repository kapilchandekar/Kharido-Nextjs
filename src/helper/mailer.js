import nodemailer from "nodemailer";


export const sendEmail = async (email, generateOtp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465, // Mailtrap port is usually 2525
      auth: {
        user: "kapilchandekar13637@gmail.com  ",
        pass: "dhxa utep ahzs lise",
      },
    });

    const mailOptions = {
      from: '"Kharido" <kharido.com>',
      to: email,
      subject: "Reset your password",
      html: `<p>OTP is ${generateOtp}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
