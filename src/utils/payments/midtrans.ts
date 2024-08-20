import * as midtransClient from 'midtrans-client';


let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY || '',
  clientKey: process.env.CLIENT_KEY || ''
});

export default snap;