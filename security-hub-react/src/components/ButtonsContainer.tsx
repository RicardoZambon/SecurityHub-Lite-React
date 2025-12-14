import React from 'react';
import styles from './ButtonsContainer.module.css';

type ButtonsContainerProps<T> = {
  buttons?: React.ReactNode,
};

export function ButtonsContainer<T>({
  buttons,
}: ButtonsContainerProps<T>) {
  return (
    <div className={styles.buttonsContainer}>
      {React.isValidElement(buttons) && buttons}
    </div>
  )
}