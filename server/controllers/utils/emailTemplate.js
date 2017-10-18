export default {
  emailHTML: (firstName, token) => {
    const html =
        `<html>
          <head>
          <style>
          .button {
              background-color: #c51162;
              border: none;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
              border-radius: 5px;
          }
          </style>
          </head>
          <body>

          <b style="color: #c51162;">Hi ${firstName},</b>
          <p>You have requested  a password reset on your PostIt Account. Click below to reset your password</p>
          <div style="text-align: left">
          <a href="http://postit-api-victor.herokuapp.com/#/newpassword/${token}" class="button">Reset Password</a>
          </div>
          <br/>
          This email is valid for 10 minutes. <br/><br/>
          Thanks,<br/>
          Your friends at PostIt
          <hr/>
          If you did not request a password reset, please ignore this email, or send a compaint to postitnotify@gmail.com
          </body>
          </html>
          `;
    return html;
  }
};
