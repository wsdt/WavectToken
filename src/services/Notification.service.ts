
import {NotificationManager} from 'react-notifications';

export class NotificationService {
    public static showError(msg: string, err?: Error) {
        NotificationManager.error(msg, null, 5000);
        console.error(msg, err);
      }

    public static showSuccess(msg: string) {
        NotificationManager.success(msg, null, 5000);
        console.info(msg);
      }
}