import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);
};
export const useOrderStatusSubscription = (id: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries({queryKey:["orders", id]})
        }
      )
      .subscribe();

      return ()=>{
        channels.unsubscribe()
      }
  }, []);
};
