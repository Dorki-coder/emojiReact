import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./card.module.css";

type Props = {
  symbol: string;
  title: string;
  keywords: string;
};

export function Card({ symbol, title, keywords }: Props) {
  return (
    <div className={styles.card}>
      <CopyToClipboard text={symbol}>
        <div className={styles.symbol}>{symbol}</div>
      </CopyToClipboard>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{keywords}</div>
    </div>
  );
}
