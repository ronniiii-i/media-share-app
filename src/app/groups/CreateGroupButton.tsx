"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "./actions";

export default function CreateGroupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) return;
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("groupName", name);
      const newGroup = await createGroup(formData);
      setIsOpen(false);
      setName("");
      router.push(`/groups/${newGroup?.id}`);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

 return (
   <>
     <button
       onClick={() => setIsOpen(true)}
       className="bg-primary text-primary-foreground rounded-xl px-6 py-2 text-sm font-bold shadow-sm transition hover:opacity-90"
     >
       + New Group
     </button>

     {isOpen && (
       <div className="bg-background fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
         <div className="animate-in fade-in zoom-in border-border bg-secondary w-full max-w-sm rounded-2xl border p-6 shadow-2xl duration-200">
           <h2 className="text-foreground mb-1 text-xl font-bold">
             Create Group
           </h2>
           <p className="text-muted-foreground mb-6 text-sm">
             Give your new vault a name.
           </p>

           <input
             autoFocus
             placeholder="e.g. Summer Memories"
             className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:ring-primary mb-6 w-full rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none"
             value={name}
             onChange={(e) => setName(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && handleCreate()}
           />

           <div className="flex gap-3">
             <button
               onClick={() => setIsOpen(false)}
               className="bg-background border-border hover:bg-accent flex-1 rounded-lg border py-3 text-sm font-medium transition"
             >
               Cancel
             </button>
             <button
               disabled={isPending}
               onClick={handleCreate}
               className="bg-primary text-primary-foreground flex-1 rounded-lg py-3 text-sm font-bold disabled:opacity-50"
             >
               {isPending ? "Creating..." : "Confirm"}
             </button>
           </div>
         </div>
       </div>
     )}
   </>
 );
}
