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

export interface TodosProps {
    
}
 

const renderTodos = (todos) => (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )


const Todos: React.SFC<TodosProps> = () => {

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
          {renderTodos(todos)}
        </div>
      )
}
 
export default Todos;