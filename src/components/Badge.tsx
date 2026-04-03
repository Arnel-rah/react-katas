

const Badge = ({name, age, info}: user) => {

  return(
    <div>
      <h1>Badge pour {name}</h1>
      <p>name: {name}</p>
      <p>age: {age}</p>
      <p>info : {info}</p>
    </div>
  )

}

export default Badge
