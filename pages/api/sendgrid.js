import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
async function sendEmail(req, res) {
  const sendCopy = req.body.sendCopy;
  const msg = {
    to: ['samsonshamdev@gmail.com', sendCopy && req.body.email], // Change to your recipient
    from: 'milkteaholo@gmail.com', // Change to your verified sender
    subject: 'MilkteaCode Contact Us', // 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Contact MilkteaCode</title>
      <meta name="description" content="Contact MilkteaCode">
      <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
        <div class="container" style="margin-left: 20px;margin-right: 20px;">
          <p>A new mail from <strong>${req.body.name}</strong></p>
          <div style="font-size: 16px;">
            <p><strong>Email:</strong></p>
            <p>${req.body.email}</p>
            <p><strong>Message:</strong></p>
            <p>${req.body.msg}</p>
            <br>
          </div>
          <img src="https://ik.imagekit.io/c5xc1x6srka/screenshot/apple-icon_L7U_-gyLxRO.png" class="logo-image" style="height: 40px;width: 40px;border-radius: 5px;overflow: hidden;">
          <p class="footer" style="font-size: 16px;padding-bottom: 20px;">Regards<br>MilkteaCode</p>
        </div>
      </div>
    </body>
    </html>`,
  };
  try {
    await sendgrid
      .send(msg, sendCopy)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '' });
}
export default sendEmail;
