import sendgrid from '@sendgrid/mail';

import invite from "./invite";

const {
  NOREPLY_EMAIL,
  SENDGRID_API_KEY,
} = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const templates = {
  invite,
};

export default async (templateKey, {
  from = NOREPLY_EMAIL,
  to,
  locale,
  data,
}) => {
  if (!to) {
    return;
  }
  const template = templates[templateKey];
  const {
    subject,
    html,
    //text,
  } = template[locale] || template.en;

  const msg = {
    from,
    to,
    subject: subject(data),
    html: html(data),
  };
  try {
    await sendgrid.send(msg);
    return true;
  } catch (e) {
    console.log(e, e.response);
    return false;
  }
};
