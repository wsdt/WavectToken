import { store } from 'react-notifications-component';

export class NotificationService {
    private static defaultConfig = {
      dismiss: {
        duration: 5000,
        onScreen: true,
        showIcon: true, 
        pauseOnHover: true,
      },
      insert: 'top',
      container: 'bottom-right',
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
    }

    public static showError(message: string, err?: Error) {
        store.addNotification({
          ...NotificationService.defaultConfig,
          title: 'Error',
          message,
          type: 'error',
        });  
        console.error(message, err);
    }

    public static showSuccess(message: string) {
        store.addNotification({
          ...NotificationService.defaultConfig,
          title: 'Success',
          message,
          type: 'success',
        });  
        console.info(message);
    }
}