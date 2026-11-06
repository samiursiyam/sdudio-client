
"use client";

import { ArrowRight, CalendarDays, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getJwtToken, bearer } from "@/lib/get-jwt";
import { toast } from "@/components/ui/toast";

const toDateInputValue = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0];
};

const BookingCard = ({ destination }) => {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const user = session?.user;

    const { _id, price, departureDate, duration } = destination;

    const [isBooked, setIsBooked] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check whether the user has already booked this destination
    useEffect(() => {
        let isMounted = true;

        const checkBooking = async () => {
            if (!user?.email || !_id) {
                setIsBooked(false);
                setIsChecking(false);
                return;
            }

            try {
                setIsChecking(true);

                const token = await getJwtToken();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${encodeURIComponent(
                        user.email.trim().toLowerCase()
                    )}`,
                    { headers: { authorization: `Bearer ${token}` } }

                );

                // console.log("Check Booking Response:", res);

                if (!res.ok) {
                    throw new Error("Failed to check booking");
                }

                const bookings = await res.json();

                const alreadyBooked = bookings.some(
                    (booking) =>
                        String(booking.destinationId) === String(_id)
                );

                if (isMounted) {
                    setIsBooked(alreadyBooked);
                }
            } catch (error) {
                console.error("Check Booking Error:", error);
            } finally {
                if (isMounted) {
                    setIsChecking(false);
                }
            }
        };

        checkBooking();

        return () => {
            isMounted = false;
        };
    }, [user?.email, _id]);

    const handleBookNow = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            router.push(`/login?redirect=${encodeURIComponent(`/destinations/${_id}`)}`);
            return;
        }

        if (isBooked) {
            toast.add({
                type: "warning",
                title: "Already reserved",
                description: "You have already reserved this space.",
            });
            return;
        }

        if (isChecking || isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Get JWT token from Better Auth
            const { data: tokenData, error: tokenError } =
                await authClient.token();

            if (tokenError || !tokenData?.token) {
                throw new Error("JWT token not found. Please login again.");
            }

            
            const departureDateInput =
                e.target.elements["departure-date"].value;

            // Remove destination's existing MongoDB _id
            const { _id: destinationId, ...destinationData } = destination;

            const bookingData = {
                ...destinationData,
                destinationId: String(destinationId),
                departureDate: departureDateInput,
                price: price,
                userEmail: user.email.trim().toLowerCase(),
                bookingDate: new Date(),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...bearer(tokenData?.token),
                },
                body: JSON.stringify(bookingData),
            });

            const responseText = await res.text();

            let bookingdata;

            try {
                bookingdata = JSON.parse(responseText);
            } catch {
                console.error("Backend Response:", responseText);

                throw new Error(
                    `Backend থেকে JSON response আসেনি। HTTP Status: ${res.status}`
                );
            }

            if (res.status === 409) {
                setIsBooked(true);

                throw new Error(
                    bookingdata.message || "Already booked!"
                );
            }

            if (!res.ok) {
                console.error("Booking API Error:", bookingdata);

                throw new Error(
                    bookingdata.error ||
                    bookingdata.message ||
                    "Booking failed!"
                );
            }

            console.log("Booking Successful:", bookingdata);

            setIsBooked(true);

            toast.add({
                type: "success",
                title: "Reservation successful!",
                description: "Your booking has been confirmed.",
            });

            e.target.reset();

        } catch (error) {
            console.error("Booking Error:", error);

            toast.add({
                type: "error",
                title: "Booking failed",
                description: error.message || "Something went wrong!",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <aside
            id="book"
            className="h-fit border border-[#e3e7ec] bg-white p-6 lg:sticky lg:top-10"
        >
            <p className="text-xs text-foreground/60">
                Starting from
            </p>

            <p className="mt-1 flex items-baseline justify-between">
                <span className="text-3xl font-bold text-cyan-600">
                    ${price}
                </span>

                <span className="text-xs text-foreground/60">
                    per session
                </span>
            </p>

            <form onSubmit={handleBookNow}>
                <label
                    className="mt-6 block text-xs font-medium text-foreground/70"
                    htmlFor="departure-date"
                >
                    Session date
                </label>

                <input
                    id="departure-date"
                    name="departure-date"
                    type="date"
                    defaultValue={toDateInputValue(departureDate)}
                    min={toDateInputValue(new Date())}
                    className="mt-1 w-full border border-[#e3e7ec] bg-[#f7f8fa] px-3 py-2.5 text-sm text-foreground outline-none focus:border-cyan-600"
                    required
                    disabled={isBooked || isChecking || isSubmitting}
                />

                <button
                    type="submit"
                    disabled={isBooked || isChecking || isSubmitting}
                    className={`mt-6 flex w-full items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-white transition-colors ${
                        isBooked
                            ? "cursor-not-allowed bg-green-600"
                            : isChecking || isSubmitting
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-cyan-600 hover:bg-cyan-700"
                    }`}
                >
                    {isChecking
                        ? "Checking..."
                        : isBooked
                            ? "Already Reserved"
                            : isSubmitting
                                ? "Booking..."
                                : "Rent Now"}

                    {isBooked ? (
                        <Check className="size-4" aria-hidden />
                    ) : (
                        !isChecking &&
                        !isSubmitting && (
                            <ArrowRight className="size-4" aria-hidden />
                        )
                    )}
                </button>
            </form>

            <ul className="mt-6 space-y-3">
                {[
                    "Free cancellation up to 48 hours",
                    "Professional equipment included",
                    "24/7 customer support",
                ].map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-foreground/70"
                    >
                        <Check
                            className="size-4 text-green-600"
                            aria-hidden
                        />
                        {item}
                    </li>
                ))}
            </ul>

            <p className="mt-5 flex items-center gap-1.5 border-t border-[#e3e7ec] pt-4 text-xs text-foreground/60">
                <CalendarDays
                    className="size-3.5 text-cyan-600"
                    aria-hidden
                />
                {duration}
            </p>
        </aside>
    );
};

export default BookingCard;
