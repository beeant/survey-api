const {BASE_URL} = process.env;

export default {
  en: {
    subject: () => `You have been invited to take a Survey`,
    html: ({
      survey,
    }) => `
      <html>
        <body>
          <div>Hello,</div>
          <div>You have been invited to take a survey</div>
          <div>Please click the link below to take a survey.</div>
          <div>
            <a href="${BASE_URL}/survey/${survey.id}">
              TAKE A SURVEY
            </a>
          </div>
          <div>Thank you,</div>
          <div>Survey Team</div>
        </body>
      </html>
    `,
  },
};
