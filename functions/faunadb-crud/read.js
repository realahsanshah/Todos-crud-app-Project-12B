/* Import faunaDB sdk */
// const process = require('process')

const { query, Client } = require('faunadb')

require('dotenv').config();

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const handler = async (event) => {
  // console.log('event',event)
  const { id } = event
  console.log('id',id);
  console.log(`Function 'read' invoked. Read id: ${id}`)
  return client
    .query(query.Get(query.Ref(query.Collection('todos'),id)))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { handler }
