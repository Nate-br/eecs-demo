import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const getPhishingTemplate = (templateName: string, trackingUrl: string) => {
  switch (templateName) {
    case "Microsoft 365 Password Expiry":
      return {
        subject: "Action Required: Your Microsoft 365 Password Expires Today",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" width="120" style="margin-bottom: 20px;" />
            <h2 style="color: #333;">Password Expiration Notice</h2>
            <p>Your Microsoft 365 password is set to expire in <strong>24 hours</strong>.</p>
            <p>To keep your current password or set a new one, please click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trackingUrl}" style="background-color: #0078d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Keep Current Password</a>
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 40px;">This is a mandatory security update from the IT Department.</p>
          </div>
        `
      };
    case "Google Workspace Suspicious Login":
      return {
        subject: "Security Alert: Suspicious sign-in attempt prevented",
        html: `
          <div style="font-family: Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dadce0; border-radius: 8px; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png" width="48" />
            </div>
            <h2 style="text-align: center; font-weight: 400; color: #202124;">Suspicious sign-in prevented</h2>
            <p style="color: #3c4043; font-size: 16px; margin-top: 24px;">Someone just used your password to try to sign in to your account from a non-Google app.</p>
            <p style="color: #3c4043; font-size: 16px;">Details:<br/>Time: Just now<br/>Location: Unknown</p>
            <p style="color: #3c4043; font-size: 16px;">We stopped this sign-in attempt, but you should review your recently used devices now.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${trackingUrl}" style="background-color: #1a73e8; color: white; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">Check activity</a>
            </div>
          </div>
        `
      };
    case "HR Payroll Update Required":
      return {
        subject: "URGENT: Payroll Direct Deposit Verification",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c00;">ACTION REQUIRED: Direct Deposit Update</h2>
            <p>Dear Employee,</p>
            <p>We are transitioning to a new payroll processor this week. To ensure your upcoming paycheck is not delayed, you must verify your direct deposit information immediately.</p>
            <p>Failure to complete this verification within 24 hours will result in a paper check being mailed to your address on file, which may delay receipt by up to 7-10 business days.</p>
            <div style="margin: 30px 0;">
              <a href="${trackingUrl}" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Payroll Details Here</a>
            </div>
            <p>Thank you,<br/>Human Resources Department</p>
          </div>
        `
      };
    default:
      return {
        subject: "Security Update",
        html: `<p>Please <a href="${trackingUrl}">click here</a> to update your security settings.</p>`
      };
  }
};
