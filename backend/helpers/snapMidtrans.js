import Midtrans from 'midtrans-client';
import 'dotenv/config';

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY_MIDTRANS,
  clientKey: process.env.CLIENT_KEY_MIDTRANS,
});


export default snap;