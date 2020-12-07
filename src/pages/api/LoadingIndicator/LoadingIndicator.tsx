import styles from './LoadingIndicator.module.css';

export function LoadingIndicator(props: any) {
    return <div className={`bg-black bg-opacity-80 p-6 rounded-md w-max ${styles.loadingContainer}`}>
            <div className={`mb-3 w-20 h-20 border-4 border-white rounded-full ${styles.loader}`}></div>
            <div className='text-white'>Loading..</div>
        </div>
}