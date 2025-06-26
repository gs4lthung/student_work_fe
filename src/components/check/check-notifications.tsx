"use client";

import React, { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useNotificationStore } from "@/stores/notification-store";
export default function CheckNotification() {
  const { setNotifications } = useNotificationStore();
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const connect = new HubConnectionBuilder()
      .withUrl(
        `${process.env.NEXT_PUBLIC_API_URL}/notificationHub?access_token=${accessToken}`
      )
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(connect);
    connect
      .start()
      .then(() => {
        connect.on("UnreadNotifications", (message) => {
          console.log("New notification received:", message);
          setNotifications(message);
        });
      })
      .catch((error) => {
        console.error("Error establishing connection:", error);
      });
    return () => {
      if (connection) {
        connection
          .stop()
          .then(() => {
            console.log("Connection stopped");
          })
          .catch((error) => {
            console.error("Error stopping connection:", error);
          });
      }
    };
  }, []);

  return <></>;
}
