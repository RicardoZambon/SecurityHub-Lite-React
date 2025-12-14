import React from 'react';
import styles from './ButtonsContainer.module.css';

type ButtonsContainerProps = {
  buttons?: React.ReactNode,
};

export function ButtonsContainer({
  buttons,
}: ButtonsContainerProps) {
  return (
    <div className={styles.buttonsContainer}>
      {React.isValidElement(buttons) && buttons}
    </div>
  )
}