export type HearderProps = {
  title: string
}

function Header ({title}: HearderProps) {

  return (
    <>
    <header>
      {title}
    </header>
    </>
  )
}

export default Header