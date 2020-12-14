import * as React from "react"
import AddTodo from '../components/addTodo'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';



const baseURL = ".netlify/functions/faunadb-crud/";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            textAlign:'center',
        },
        parent:{
          textAlign:'center'
        }
    }),
);

const renderTodos = (todos) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
)

// markup
const IndexPage = () => {

  const classes=useStyles();

  const [todos, setTodos] = React.useState([
    {
      id: '123',
      title: "Get Milk"
    },
    {
      id: '124',
      title: "Take Med"
    },
    {
      id: '125',
      title: "Sleep Well"
    },
  ])



  return (
    <div className={classes.parent}>
      <title>Todos</title>
      <h1>Todos</h1>
      <AddTodo />
      {renderTodos(todos)}
    </div>
  )
}

export default IndexPage
