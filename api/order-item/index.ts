import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesInsert } from "@/src/database.types";

export const useInsertOrderItem = () => {
  return useMutation({
    async mutationFn(data: TablesInsert<"order_items">[]) {
      const { error } = await supabase
        .from("order_items")
        .insert(
        data
        )
        .select();

      if (error) {
        throw new Error(error.message);
      }
    },
  });
};
