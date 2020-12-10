import styles from './LoadingIndicator.module.css';
import { LoadingIndicatorSmall } from './LoadingIndicatorSmall/LoadingIndicatorSmall';

export function LoadingIndicator(props: any) {
    return <div className={`bg-black bg-opacity-80 p-6 rounded-md w-max ${styles.loadingContainer}`}>
            <LoadingIndicatorSmall />
            <div className='text-white'>Loading..</div>
        </div>
}