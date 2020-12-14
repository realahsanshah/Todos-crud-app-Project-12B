import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField,  Button, Grid} from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: '100%',
            textAlign:'center',
        },
    }),
);

export interface AddTodoProps {

}

const schema = Yup.object({
    todo: Yup.string()
        .required('Add an item')
        .min(4, 'Must be greater than or equals to 4 characters')
});

const AddTodo: React.SFC<AddTodoProps> = () => {
    const [todo,setTodo]=React.useState('')
    const classes=useStyles();
    return (
        <div>
            <Formik
                initialValues={{ todo: todo }}
                validationSchema={schema}
                onSubmit={(value,{resetForm}) => {
                    console.log('todo', value.todo)
                    setTodo('')
                    resetForm();
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
                                <span style={{ color: "red",fontSize:'18sp' }}>{msg}</span>
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
    );
}

export default AddTodo;