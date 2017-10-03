import dotenv from 'dotenv';
import Nexmo from 'nexmo';

dotenv.config();

export default (groupInfo, groupMembers, message) => {
  const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
  });
  nexmo.message.sendSms('PostIt', '2347069749945', message, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.dir(response);
    }
  });
};
