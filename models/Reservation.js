const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation"},
  client_id: { type: String, required: true },
  roomId: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["Created", "Updated", "Canceled", "Failed", "Confirmed"], 
    default: "Created" 
  },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);

