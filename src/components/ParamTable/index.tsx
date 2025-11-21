import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type Item = {
  name: string;
  type?: string;
  desc?: React.ReactNode; // 允许传入字符串或包含内联代码的 JSX
};

type ParamTableProps = {
  title?: string;               // 可选标题，默认 "Parameters"
  items: Item[];
  className?: string;
};

export default function ParamTable({ title = 'Parameters', items, className }: ParamTableProps) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.header}>{title}</div>
      <table className={styles.table}>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx} className={styles.row}>
              <td className={styles.nameCell}>
                <code className={styles.code}>{it.name}</code>
              </td>
              <td className={styles.descCell}>
                {it.type && <strong className={styles.type}>{it.type}</strong>}
                {it.type ? <span>: </span> : null}
                <span className={styles.desc}>{it.desc}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}