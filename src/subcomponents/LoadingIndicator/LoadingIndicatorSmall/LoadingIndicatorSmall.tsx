import styles from "./LoadingIndicatorSmall.module.css";

export function LoadingIndicatorSmall(props: any) {
    return <div className={`mt-1 ${styles.ldsRipple}`}><div></div><div></div></div>;
}