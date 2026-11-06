'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { authClient } from "@/lib/auth-client";
import { getJwtToken, bearer } from "@/lib/get-jwt";
import { toast } from "@/components/ui/toast";

const DeleteDestination = ({id, redirectTo = "/destinations"}) => {

    const router = useRouter();
    const [error, setError] = useState("");

    const hendleDeletDestination = async ()=>{
       setError("");

       /* Only the email that created this destination may delete it */
       const session = await authClient.getSession();
       const userEmail = session?.data?.user?.email || "";
       const token = await getJwtToken();

       const res = await fetch(`/backend/destination/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...bearer(token),
        },
        body: JSON.stringify({ userEmail }),
       })
       const data = await res.json();

       if (!res.ok) {
         if (res.status === 403 || res.status === 401) {
           setError("You are not owner of this studio");
         } else {
           setError(data?.message || "Failed to delete destination. Please try again.");
         }
         return;
       }

       toast.add({
         type: "success",
         title: "Destination deleted",
         description: "The listing has been permanently removed.",
       });
       router.push(redirectTo);
    }
    return (
        <div>
            



    <AlertDialog>
      <AlertDialogTrigger
        render={ <button
                            type="button"
                            className="flex items-center gap-1.5 border border-red-200 px-3.5 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                        >
                            <Trash2 className="size-3.5" aria-hidden />
                            Delete
                        </button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Item?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this destination. Only the email
            that added it is allowed to remove it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <div role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-500">
            <p className="font-medium">{error}</p>
            <p className="mt-1">Add your studio</p>
          </div>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={hendleDeletDestination} variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  

        </div>
    );
};

export default DeleteDestination;
