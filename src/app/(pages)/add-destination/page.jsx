"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { getJwtToken, bearer } from "@/lib/get-jwt";

const categories = [
  "Photo Studio",
  "Film Stage / Cinema Studio",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
  "Dance Studio",
  "Rehearsal Studio",
  "Podcast & Streaming Studio",
  "Video Editing Studio",
  "Creative Event Space",
];

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AddDestination() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleCancel = () => {
    setForm(initialForm);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate category first (it has no native "required" support)
    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {

      /* Attach the logged-in user's email so listings can be filtered later,
         plus the creation time so the newest ones can be shown first */
      const session = await authClient.getSession();
      const token = await getJwtToken();
      // console.log("JWT Token:", token); // এই লাইনটি যোগ করো
      const payload = {
        ...form,
        userEmail: session?.data?.user?.email || "",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // JWT token in the Authorization header
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (!res.ok) {
        setError("Failed to add studio space. Please try again.");
        return;
      }

      setForm(initialForm);
      setError("");
      router.push("/my-listings");
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Is it running on port 5000?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12 sm:px-10 lg:px-24">
      <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
        Add New Studio Space
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-14 max-w-[600px] border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:mt-16 sm:p-10"
      >
        {/* Destination Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="destination-name" className="text-sm">
            Studio Name
          </Label>
          <Input
            id="destination-name"
            required
            placeholder="Elite Downtown Photo Studio"
            value={form.name}
            onChange={setField("name")}
            className="h-10 rounded-md bg-[#f7f8fa]"
          />
        </div>

        {/* Country + Category */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="country" className="text-sm">
              Location
            </Label>
            <Input
              id="country"
              required
              placeholder="e.g., Banani, Dhaka"
              value={form.country}
              onChange={setField("country")}
              className="h-10 rounded-md bg-[#f7f8fa]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm">Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) => {
                setForm((prev) => ({ ...prev, category: value }));
                setError("");
              }}
            >
              <SelectTrigger className="h-10 w-full rounded-md bg-[#f7f8fa]">
                <SelectValue placeholder="Photo Studio" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price + Duration */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price" className="text-sm">
              Price (USD) / Session
            </Label>
            <Input
              id="price"
              required
              type="number"
              min="0"
              step="1"
              placeholder="e.g., 149"
              value={form.price}
              onChange={setField("price")}
              className="h-10 rounded-md bg-[#f7f8fa]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="duration" className="text-sm">
              Duration
            </Label>
            <Input
              id="duration"
              required
              placeholder="e.g., 3 Hours / Half Day"
              value={form.duration}
              onChange={setField("duration")}
              className="h-10 rounded-md bg-[#f7f8fa]"
            />
          </div>
        </div>

        {/* Session Date */}
        <div className="mt-6 flex flex-col gap-1.5">
          <Label htmlFor="departure-date" className="text-sm">
            Session Date
          </Label>
          <Input
            id="departure-date"
            required
            type="date"
            value={form.departureDate}
            onChange={setField("departureDate")}
            className="h-10 rounded-md bg-[#f7f8fa]"
          />
        </div>

        {/* Image URL */}
        <div className="mt-6 flex flex-col gap-1.5">
          <Label htmlFor="image-url" className="text-sm">
            Image URL
          </Label>
          <Input
            id="image-url"
            required
            type="url"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={setField("imageUrl")}
            className="h-10 rounded-md bg-[#f7f8fa]"
          />
        </div>

        {/* Description */}
        <div className="mt-6 flex flex-col gap-1.5">
          <Label htmlFor="description" className="text-sm">
            Description
          </Label>
          <Textarea
            id="description"
            required
            placeholder="Describe the studio space.."
            value={form.description}
            onChange={setField("description")}
            className="min-h-32 rounded-md bg-[#f7f8fa]"
          />
        </div>

        {error ? (
          <p role="alert" className="mt-4 text-right text-sm text-red-500">
            {error}
          </p>
        ) : null}

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="h-10 rounded-md border-red-200 bg-white px-5 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-4" aria-hidden />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 rounded-md bg-[#17a2c6] px-5 text-white hover:bg-[#1491b5] disabled:opacity-60"
          >
            <CalendarPlus className="size-4" aria-hidden />
            {isSubmitting ? "Adding..." : "Add Travel Package"}
          </Button>
        </div>
      </form>
    </main>
  );
}
