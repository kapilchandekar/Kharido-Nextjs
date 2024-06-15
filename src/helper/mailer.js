import nodemailer from "nodemailer";


export const sendEmail = async (email, generateOtp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525, // Mailtrap port is usually 2525
      auth: {
        user: "9505bbf09b8f6d",
        pass: "fe860de53e4879",
      },
    });

    const mailOptions = {
      from: '"kharid te raho 👻" <kharido.com>',
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
