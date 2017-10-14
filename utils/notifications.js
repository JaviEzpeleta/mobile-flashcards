import { View, StyleSheet, AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

const NOTIFICATION_KEY = "MobileFlashcards:notifications"

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function createNotification() {
  return {
    title: "Become a better you! Study!",
    body: "Learn something new every day. Practice flashcards NOW!",
    ios: {
      sound: true
    },
    android: {
      sticky: false,
      sound: true,
      vibrate: true,
      priority: "high"
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()

            let today = new Date()
            today.setDate(today.getDate())
            today.setHours(19, 0, 0)

            const notification = createNotification()

            Notifications.scheduleLocalNotificationAsync(notification, {
              time: today,
              repeat: "day"
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
