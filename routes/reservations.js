const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing hotel reservations
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 description: The ID of the client making the reservation
 *                 example: "64b53b3b4c72a4b4f1d4c6c7"
 *               roomId:
 *                 type: string
 *                 description: The ID of the reserved room
 *                 example: "A102"
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 description: Check-in date for the reservation
 *                 example: "2023-12-15"
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 description: Check-out date for the reservation
 *                 example: "2023-12-20"
 *               totalAmount:
 *                 type: number
 *                 description: Total amount for the reservation
 *                 example: 250.5
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 */
router.post("/", ReservationController.ReservationCreated);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of all reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Server error
 */
router.get("/", ReservationController.getAll);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reservation
 *     responses:
 *       200:
 *         description: Reservation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.get("/:id", ReservationController.getById);

/**
 * @swagger
 * /reservations/client/{client_id}:
 *   get:
 *     summary: Get reservations by client_id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client_id of the client
 *     responses:
 *       200:
 *         description: List of reservations for the specified client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: No reservations found for this client
 *       500:SSS
 *         description: Server error
 */
router.get("/client/:client_id", ReservationController.getByClientId);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Update an existing reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reservation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 description: Updated check-in date
 *                 example: "2023-12-16"
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 description: Updated check-out date
 *                 example: "2023-12-21"
 *               totalAmount:
 *                 type: number
 *                 description: Updated total amount for the reservation
 *                 example: 300.75
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 */
router.put("/:id", ReservationController.ReservationUpdated);

/**
 * @swagger
 * /reservations/{id}/cancel:
 *   put:
 *     summary: Cancel a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reservation to cancel
 *     responses:
 *       200:
 *         description: Reservation canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 */
router.put("/:id/cancel", ReservationController.ReservationCanceled);

/**
 * @swagger
 * /reservations/{id}/fail:
 *   put:
 *     summary: Mark a reservation as failed
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reservation to mark as failed
 *     responses:
 *       200:
 *         description: Reservation marked as failed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 */
router.put("/:id/fail", ReservationController.ReservationFailed);

/**
 * @swagger
 * /reservations/{id}/confirm:
 *   put:
 *     summary: Confirm a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reservation to confirm
 *     responses:
 *       200:
 *         description: Reservation confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 */
router.put("/:id/confirm", ReservationController.ReservationConfirmed);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         reservation_id:
 *           type: string
 *           description: Unique identifier of the reservation.
 *           example: "64b53b3b4c72a4b4f1d4c6c7"
 *         client_id:
 *           type: string
 *           description: The ID of the client associated with the reservation.
 *           example: "63c7f9b1c02c65b2d1234567"
 *         roomId:
 *           type: string
 *           description: The ID of the reserved room.
 *           example: "A102"
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: Check-in date for the reservation.
 *           example: "2023-12-15"
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: Check-out date for the reservation.
 *           example: "2023-12-20"
 *         totalAmount:
 *           type: number
 *           description: Total amount for the reservation.
 *           example: 250.5
 *         status:
 *           type: string
 *           enum:
 *             - Created
 *             - Updated
 *             - Canceled
 *             - Failed
 *             - Confirmed
 *           description: Current status of the reservation.
 *           example: "Confirmed"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the reservation was created.
 *           example: "2023-11-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the reservation was last updated.
 *           example: "2023-11-02T15:30:00Z"
 */
