import * as React from "react"


// markup
const IndexPage = () => {
  fetch('/.netlify/functions/faunadb-crud/faunadb-crud',{method:'GET'})
  .then(response=>response.json())
  .then(data=>console.log('result',data))
  .catch(err=>console.log('error',err));
  return (
   <div>
     <title>Todos</title>
     <h1>Todos</h1>
   </div>
  )
}

export default IndexPage
