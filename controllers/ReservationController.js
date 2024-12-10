const Reservation = require("../models/Reservation");

module.exports = {
  async ReservationCreated(req, res) {
    const { client_id, roomId, checkInDate, checkOutDate, totalAmount } = req.body;
    try {
      const reservation = new Reservation({
        client_id,
        roomId,
        checkInDate,
        checkOutDate,
        totalAmount,
        status: "Created",
      });
      const savedReservation = await reservation.save();
      res.status(201).json(savedReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reservations", error });
    }
  },
  
  async getById(req, res) {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reservation", error });
    }
  },

  async getByClientId(req, res) {
    try {
      const reservations = await Reservation.find({ client_id: req.params.client_id });
      if (!reservations || reservations.length === 0) {
        return res.status(404).json({ message: "No reservations found for this client" });
      }
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reservations", error });
    }
  },

  async ReservationUpdated(req, res) {
    const { id } = req.params;
    const { checkInDate, checkOutDate, totalAmount } = req.body;
    try {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        id,
        { checkInDate, checkOutDate, totalAmount, status: "Updated" },
        { new: true }
      );
      res.json(updatedReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async ReservationCanceled(req, res) {
    const { id } = req.params;
    try {
      const canceledReservation = await Reservation.findByIdAndUpdate(
        id,
        { status: "Canceled" },
        { new: true }
      );
      res.json(canceledReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async ReservationFailed(req, res) {
    const { id } = req.params;
    try {
      const failedReservation = await Reservation.findByIdAndUpdate(
        id,
        { status: "Failed" },
        { new: true }
      );
      res.json(failedReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async ReservationConfirmed(req, res) {
    const { id } = req.params;
    try {
      const confirmedReservation = await Reservation.findByIdAndUpdate(
        id,
        { status: "Confirmed" },
        { new: true }
      );
      res.json(confirmedReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
};
