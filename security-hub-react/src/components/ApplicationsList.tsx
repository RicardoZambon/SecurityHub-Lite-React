import React from 'react';
import type { Application } from '../services/applicationService';
import styles from './ApplicationsList.module.scss';
import { Link } from 'react-router-dom';

type ApplicationListProps = {
    applications: Application[],
}

export function ApplicationsList({ applications }: ApplicationListProps) {
    if (applications.length === 0) {
        return <p>No applications found.</p>;
    }

    return (
        <div className={styles.root}>
            <h3 className={styles.title}>Registered Applications</h3>

            <ul className={styles.list}>
                {applications.map((app: Application) => (
                    <li key={app.id} className={styles.item}>
                        <Link
                        to={`/roles?appId=${app.id}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            <div className={styles.name}>{app.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}