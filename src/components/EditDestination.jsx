"use client";

import { useState } from "react";
import { CalendarPlus, Trash2, Pencil } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

// HTML <input type="date"> এর জন্য YYYY-MM-DD দরকার
const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

// destination prop থেকে form-init বানানোর helper
const buildForm = (destination) => ({
  name: destination?.name ?? "",
  country: destination?.country ?? "",
  category: destination?.category ?? "",
  price: destination?.price ?? "",
  duration: destination?.duration ?? "",
  departureDate: toDateInputValue(destination?.departureDate),
  imageUrl: destination?.imageUrl ?? "",
  description: destination?.description ?? "",
});

const EditDestination = ({ destination }) => {
 
  const [form, setForm] = useState(() => buildForm(destination));
  const [error, setError] = useState("");
  const [isOwnerError, setIsOwnerError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  // Cancel চাপলে destination-এর আগের value-তেই ফিরে যাবে
  const handleCancel = () => {
    setForm(buildForm(destination));
    setError("");
    setIsOwnerError(false);
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setIsOwnerError(false);

    try {
      const { _id, ...update } = form;

      /* The server only allows the owner's email to edit */
      const session = await authClient.getSession();
      const userEmail = session?.data?.user?.email || "";
      const token = await getJwtToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...bearer(token) },
          body: JSON.stringify({ ...update, userEmail }),
        }
      );

      const data = await res.json();
      console.log("Server response:", data);

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          setError("You are not owner of this studio");
          setIsOwnerError(true);
        } else {
          setError(data?.message || "Failed to save changes. Please try again.");
          setIsOwnerError(false);
        }
        return;
      }

      setForm(buildForm(destination));
      setError("");
      setOpen(false);

      // ✅ puro page reload (full navigation)
      window.location.href = `/destinations/${destination._id}`;
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Is it running on port 5000?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ── Edit Trigger Button ── */}
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1.5 rounded-md border border-[#e3e7ec] bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f7f8fa]"
          >
            <Pencil className="size-3.5" aria-hidden />
            Edit
          </Button>
        }
      />

      {/* ── Dialog (bora + responsive + scrollable) ── */}
      <DialogContent className="w-[95vw] max-w-[95vw] gap-0 p-0 sm:max-w-[560px] md:max-w-[680px] lg:max-w-[760px] max-h-[92vh] overflow-hidden">
        <form onSubmit={handleSubmit} className="flex max-h-[92vh] flex-col">
          {/* Header */}
          <DialogHeader className="border-b border-[#e5e7eb] px-5 py-4 sm:px-7 sm:py-5">
            <DialogTitle className="text-lg font-semibold sm:text-xl">
              Edit Destination
            </DialogTitle>
            <DialogDescription className="text-xs text-foreground/60 sm:text-sm">
              Update the details of your studio space below.
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
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
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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
                  placeholder="e.g., 1299"
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
            <div className="mt-5 flex flex-col gap-1.5">
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
            <div className="mt-5 flex flex-col gap-1.5">
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
            <div className="mt-5 flex flex-col gap-1.5">
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
              <div
                role="alert"
                className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-500"
              >
                <p className="font-medium">{error}</p>
                {isOwnerError ? <p className="mt-1">Add your studio</p> : null}
              </div>
            ) : null}          </div>

          {/* Sticky Footer */}
          <DialogFooter className="flex flex-col-reverse gap-3 border-t border-[#e5e7eb] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-7 sm:py-5">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-10 w-full rounded-md border-red-200 bg-white px-5 text-red-500 hover:bg-red-50 hover:text-red-600 sm:w-auto"
            >
              <Trash2 className="size-4" aria-hidden />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full rounded-md bg-[#17a2c6] px-5 text-white hover:bg-[#1491b5] disabled:opacity-60 sm:w-auto"
            >
              <CalendarPlus className="size-4" aria-hidden />
              {isSubmitting ? "Saving..." : "SAVE"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestination;