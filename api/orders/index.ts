import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Order } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TablesInsert, TablesUpdate } from "@/src/database.types";

export const useAdminOrderlist = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order('created_at',{ascending:false});
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderlist = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  // console.log(typeof(id),id)
  return useQuery({
    queryKey: ["orders", { user_id: id }],
    queryFn: async () => {
      if (!id) {
        throw new Error("id is not defined");
      }
      const { data, error } = await supabase
        .from("orders")
        .select('*')
        
        .eq("user_id", id)
        .order('created_at',{ascending:false})

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetail = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select('*,order_items(*,products(*))')
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  // console.log(session + "session")
  const userId = session?.user?.id;
  return useMutation({
    async mutationFn(data: TablesInsert<"orders">) {
      if (!userId) return null;
      const { error, data: newOrder } = await supabase
        .from("orders")
        .insert({
          ...data,
          user_id: userId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};


export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({id,updatedFields}:{id:number,updatedFields:TablesUpdate<'orders'>}) {
      const { error, data: updatedorder } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedorder;
    },

    async onSuccess(_, data) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

      await queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
    },
  });
};