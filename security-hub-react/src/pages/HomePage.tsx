import style from './HomePage.module.css';

function HomePage() {
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

export default HomePage;