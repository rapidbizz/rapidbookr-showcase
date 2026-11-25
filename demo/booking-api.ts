// Demo example — a small mock booking API client in TypeScript.
// Illustrative example only, not product code.

export type BookingType = "tour" | "transfer" | "activity";

export interface Tour {
  id: string;
  title: string;
  type: BookingType;
  priceAed: number;
  seatsLeft: number;
  rating: number;
}

export interface Booking {
  id: string;
  tourId: string;
  customerName: string;
  guests: number;
  date: string;
  totalAed: number;
  status: "pending" | "confirmed" | "cancelled";
}

const TOURS: Tour[] = [
  { id: "t1", title: "Desert Safari Evening", type: "tour", priceAed: 150, seatsLeft: 8, rating: 4.8 },
  { id: "t2", title: "Dubai Airport Transfer", type: "transfer", priceAed: 80, seatsLeft: 20, rating: 4.9 },
  { id: "t3", title: "Dhow Cruise Dinner", type: "activity", priceAed: 120, seatsLeft: 5, rating: 4.7 },
  { id: "t4", title: "City Tour Half Day", type: "tour", priceAed: 110, seatsLeft: 12, rating: 4.6 },
];

let bookings: Booking[] = [];
let nextId = 1;

/** List tours, optionally filtered by type and sorted by rating. */
export function listTours(type?: BookingType): Tour[] {
  const list = type ? TOURS.filter((t) => t.type === type) : [...TOURS];
  return list.sort((a, b) => b.rating - a.rating);
}

/** Find one tour by id. */
export function getTour(id: string): Tour | undefined {
  return TOURS.find((t) => t.id === id);
}

/** Create a booking if seats are available. Returns null when sold out. */
export function createBooking(
  tourId: string,
  customerName: string,
  guests: number,
  date: string,
): Booking | null {
  const tour = getTour(tourId);
  if (!tour || tour.seatsLeft < guests) return null;
  tour.seatsLeft -= guests;
  const booking: Booking = {
    id: `b${nextId++}`,
    tourId,
    customerName,
    guests,
    date,
    totalAed: tour.priceAed * guests,
    status: "pending",
  };
  bookings.push(booking);
  return booking;
}

/** Confirm a pending booking. */
export function confirmBooking(id: string): Booking | undefined {
  const booking = bookings.find((b) => b.id === id);
  if (booking) booking.status = "confirmed";
  return booking;
}

/** Cancel a booking and release the seats. */
export function cancelBooking(id: string): Booking | undefined {
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return undefined;
  const tour = getTour(booking.tourId);
  if (tour) tour.seatsLeft += booking.guests;
  booking.status = "cancelled";
  return booking;
}

/** All bookings for one customer. */
export function bookingsFor(customerName: string): Booking[] {
  return bookings.filter((b) => b.customerName === customerName);
}
