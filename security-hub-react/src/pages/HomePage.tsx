import style from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <div className={style.title}>
        Home Page
      </div>
      <div className={style.subtitle}>
        Welcome to the Security Hub
      </div>
    </>
  )
}