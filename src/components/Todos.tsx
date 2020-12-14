import * as React from "react"
import AddTodo from '../components/addTodo'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Avatar, List, ListItem, TextField, ListItemText, ListItemSecondaryAction,IconButton  } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';


const baseURL = ".netlify/functions/faunadb-crud/";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            textAlign: 'center',
        },
        parent: {
            textAlign: 'center'
        },
        dataDisplay: {
            backgroundColor: '#eeeeee',
            marginBottom: '10px'
        },
    }),
);

export interface TodosProps {

}


const renderTodos = (todos) => {
    const classes = useStyles();

    return (
        <List>
            {todos.map(todo => (
                <ListItem key={todo.id} className={classes.dataDisplay}>
                    <ListItemText
                        primary={todo.title}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={()=>{
                            console.log('Update Button',todo.id);
                        }}>
                            <CreateOutlinedIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={()=>{
                            console.log('Delete Button',todo.id);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>))}
        </List>
    )
}


const Todos: React.SFC<TodosProps> = () => {

    const classes = useStyles();

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
            <Grid container justify="center">
                <Grid item xs={12} sm={4}>
                    {renderTodos(todos)}
                </Grid>
            </Grid>
        </div>
    )
}

export default Todos;