import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL,
		pass: process.env.GOOGLE_APP_PASSWORD,
	},
});

export const sendForgotPwdMail = async (to: string, resetLink: string) => {
	await transporter.sendMail({
		from: '"Form Weaver Support" <kedarkolasecoc@gmail.com>',
		to,
		subject: "Reset Your Password - Form Weaver",
		text: `Hello,

We received a request to reset your password for your Form Weaver account.

Click the link below to reset your password:
${resetLink}

If you did not request a password reset, you can safely ignore this email.

– The Form Weaver Team`,
		html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; padding: 30px;">
      <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <tr>
          <td style="background: #4f46e5; padding: 20px; text-align: center; color: #fff;">
            <h1 style="margin: 0; font-size: 22px;">Form Weaver</h1>
            <p style="margin: 5px 0 0;">AI Form Builder</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="font-size: 20px; margin-bottom: 15px;">Reset Your Password</h2>
            <p>We received a request to reset your Form Weaver account password. If this was you, click the button below to set a new password.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: #4f46e5; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                 Reset Password
              </a>
            </div>
            
            <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4f46e5;">${resetLink}</p>
            
            <p>If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.</p>
          </td>
        </tr>
        <tr>
          <td style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            <p>© ${new Date().getFullYear()} Form Weaver. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </div>
    `,
	});
};
