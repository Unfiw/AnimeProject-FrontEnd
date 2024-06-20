export type DataProps = {
  name: string
  studio:string
  description:string
  showData: boolean
}

function Data ({name, studio,description,  showData}: DataProps) {
  return (
    <section className='dataContainer'>
    {
      showData && (
        <>
          <p>Studio: {studio} </p>
          <p>Description: {description}</p>
          <p>Name: {name}</p>
        </>
      )
    }
    </section>
  )
}

export default Data