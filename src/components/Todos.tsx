import * as React from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@material-ui/core';
import Swal from 'sweetalert2';

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
        textField: {
            width: '100%',
            textAlign: 'center',
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const schema = Yup.object({
    todo: Yup.string()
        .required('Add an item')
        .min(4, 'Must be greater than or equals to 4 characters')
});

export interface TodosProps {

}

const getAllTodos = async () => {
    return await fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

const addTodo = async (title) => {
    var result = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify({ title })
    });
    console.log(result);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'A todo is added',
        showConfirmButton: false,
        timer: 1500
      })
    return result;
}


const deleteTodo = async (id) => {
    return await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'A todo is deleted',
                showConfirmButton: false,
                timer: 1500
              })
            return data;
        })
        .catch(err => console.log(err))
}

const updateTodo = async (id, title) => {
    return await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title })
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'A todo is updated',
                showConfirmButton: false,
                timer: 1500
              })
            return data;
        })
        .catch(err => console.log(err))
}



const Todos: React.SFC<TodosProps> = () => {

    const classes = useStyles();
    const [todo, setTodo] = React.useState('')
    const [todos, setTodos] = React.useState([])
    const [fetchData, setFetchData] = React.useState(false)
    const [currentId, setCurrentId] = React.useState(null);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [currentTitle,setCurrentTitle]=React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        ; (async () => {
            var data = await getAllTodos();
            console.log("data", data);
            setTodos(data);
            setFetchData(false);
        })()
    }, [fetchData])



    return (
        <div className={classes.parent}>
            <div>
                <Formik
                    initialValues={{ todo: todo }}
                    validationSchema={schema}
                    onSubmit={(value, { resetForm }) => {
                        console.log('todo', value.todo)
                        setTodo('')
                        addTodo(value.todo);
                        resetForm();
                        setFetchData(true);
                        setIsUpdate(false);
                        setCurrentId(null);
                        
                    }}

                >
                    {(formik: any) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={4}>
                                    <div>
                                        <Field
                                            type='todo'
                                            as={TextField}
                                            variant="outlined"
                                            label="Todo"
                                            name="todo"
                                            id="todo"
                                            className={classes.textField}
                                        />
                                        <br />
                                        <ErrorMessage name='todo' render={(msg: string) => (
                                            <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
                                        )} />
                                        <br />
                                    </div>

                                    <div>
                                        <Button variant="contained" color="primary" type="submit" className={classes.textField} >
                                            Add Todo
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Form>
                    )}

                </Formik>
            </div>

            <Grid container justify="center">
                <Grid item xs={12} sm={4}>
                    {
                        <List>
                            {todos.map(todo => (
                                <ListItem key={todo.ref['@ref'].id} className={classes.dataDisplay}>
                                    <ListItemText
                                        primary={todo.data.title}
                                    />
                                    <ListItemSecondaryAction>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            <div style={modalStyle} className={classes.paper}>
                                                <Formik
                                                    initialValues={{ todo: currentTitle }}
                                                    validationSchema={schema}
                                                    onSubmit={(value, { resetForm }) => {
                                                        console.log('todo', value.todo)
                                                        updateTodo(currentId, value.todo)
                                                        resetForm();
                                                        setFetchData(true);
                                                        setIsUpdate(false);
                                                        setCurrentId(null);
                                                        setCurrentTitle('');
                                                        handleClose();
                                                    }}

                                                >
                                                    {(formik: any) => (
                                                        <Form onSubmit={formik.handleSubmit}>
                                                            <Grid container justify="center">
                                                                <Grid item xs={12}>
                                                                    <div>
                                                                        <Field
                                                                            type='todo'
                                                                            as={TextField}
                                                                            variant="outlined"
                                                                            label="Todo"
                                                                            name="todo"
                                                                            id="todo"
                                                                            className={classes.textField}
                                                                        />
                                                                        <br />
                                                                        <ErrorMessage name='todo' render={(msg: string) => (
                                                                            <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
                                                                        )} />
                                                                        <br />
                                                                    </div>

                                                                    <div>
                                                                        <Button variant="contained" color="primary" type="submit" className={classes.textField} >
                                                                            Update Todo
                                                                         </Button>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </Form>
                                                    )}

                                                </Formik>

                                            </div>

                                        </Modal>
                                        <IconButton edge="end" aria-label="delete" onClick={() => {
                                            console.log('Update Button', todo.ref['@ref'].id);
                                            setTodo(todo.data.title);
                                            setCurrentId(todo.ref['@ref'].id)
                                            setCurrentTitle(todo.data.title)
                                            setIsUpdate(true);
                                            setOpen(true)
                                        }}>
                                            <CreateOutlinedIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={async () => {
                                            console.log('Delete Button', todo.ref['@ref'].id);
                                            var result = await deleteTodo(todo.ref['@ref'].id);
                                            console.log("result", result);
                                            setFetchData(true);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>))}
                        </List>
                    }
                </Grid>
            </Grid>
        </div >
    )
}

export default Todos;