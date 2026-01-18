const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 5000
});
