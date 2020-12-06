import styles from './LoadingIndicator.module.css';

export function LoadingIndicator(props: any) {
    return <div className={`w-20 h-20 border-4 border-black rounded-full ${styles.loader}`}></div>
}