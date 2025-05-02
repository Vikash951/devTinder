const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("42 21 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log("Sending emails to:", listOfEmails);

    for (const email of listOfEmails) {
      try {
        const subject = "New Friend Requests pending";
        const body = `Hi ${email}, you have new friend requests pending from yesterday. Check your DevTinder inbox now!`;

        const res = await sendEmail.run(subject, body, email);
        console.log("Email sent to:", email, res);
      } catch (err) {
        console.error("Error sending to", email, err);
      }
    }
  } catch (err) {
    console.error("Cron job error:", err);
  }
});
