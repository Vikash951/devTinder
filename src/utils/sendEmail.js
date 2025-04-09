const { SendEmailCommand } =  require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
    return new SendEmailCommand({
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h3>${body}</h3>`,
          },
          Text: {
            Charset: "UTF-8",
            Data: body, // Optional plain-text version
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: fromAddress,
      ReplyToAddresses: [fromAddress], // Optional: reply will go to sender
    });
  };

  
  const run = async (subject, body) => {
    const sendEmailCommand = createSendEmailCommand(
      "vikashkumargupta951@gmail.com",
      "vikash@godeveloper.live",
      subject, body
    );
  
    try {
      return await sesClient.send(sendEmailCommand);
    } catch (caught) {
      if (caught instanceof Error && caught.name === "MessageRejected") {
       
        const messageRejectedError = caught;
        return messageRejectedError;
      }
      throw caught;
    }
  };
  
  // snippet-end:[ses.JavaScript.email.sendEmailV3]
  module.exports = { run };