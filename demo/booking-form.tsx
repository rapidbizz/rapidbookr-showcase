// Demo example — a small, self-contained booking form component.
// This is an illustrative example only. It is NOT part of the RapidBookr
// product code, which stays in a private repository.
import { useState } from "react";

export type BookingType = "tour" | "transfer" | "activity";

export interface BookingRequest {
  name: string;
  email: string;
  type: BookingType;
  date: string;
  guests: number;
}

export function BookingForm() {
  const [booking, setBooking] = useState<BookingRequest>({
    name: "",
    email: "",
    type: "tour",
    date: "",
    guests: 2,
  });

  const update = <K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // In the real product this is sent to the booking API.
        console.log("Demo booking request:", booking);
      }}
    >
      <label>
        Name
        <input
          value={booking.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={booking.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />
      </label>
      <label>
        Booking type
        <select
          value={booking.type}
          onChange={(e) => update("type", e.target.value as BookingType)}
        >
          <option value="tour">Tour</option>
          <option value="transfer">Transfer</option>
          <option value="activity">Activity</option>
        </select>
      </label>
      <label>
        Date
        <input
          type="date"
          value={booking.date}
          onChange={(e) => update("date", e.target.value)}
          required
        />
      </label>
      <label>
        Guests
        <input
          type="number"
          min={1}
          value={booking.guests}
          onChange={(e) => update("guests", Number(e.target.value))}
        />
      </label>
      <button type="submit">Request booking</button>
    </form>
  );
}
