
import {NotificationManager} from 'react-notifications';

export class NotificationService {
    public static showError(msg: string) {
        NotificationManager.error(msg, null, 5000);
        console.error(msg);
      }
}