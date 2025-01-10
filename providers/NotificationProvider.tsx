import { registerForPushNotificationsAsync } from "@/lib/notification";
import { ExpoPushToken } from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  const {profile}=useAuth()
  const [notification, setNotification] =
    useState<Notifications.Notification>();

    const savePushToken =async(newToken:string|undefined) =>{
      setExpoPushToken(newToken)
if(!newToken){
  return
}
// console.log(profile.id)
 await supabase.from('profiles').update({expo_push_token:newToken}).eq('id',profile.id)

    }
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      savePushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  console.log(notification);
  console.log(expoPushToken);
  return <>{children}</>;
};
export default NotificationProvider;
