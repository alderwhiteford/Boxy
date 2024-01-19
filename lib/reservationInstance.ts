import Reservations from "@/models/reservations";
import prisma from "lib/db";

const persistentReservationInstance = new Reservations(prisma.reservations);

export default persistentReservationInstance;
