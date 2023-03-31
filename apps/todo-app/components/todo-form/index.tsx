import { todoActions, TodoModel, todoSelectors } from '@cnc-nextjs-template-fe/data';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../state/store';

const FormContainer = styled.div`
  .todoForm {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
    }

    input,
    select,
    textarea {
      display: block;
      width: 100%;
      padding: 8px;
      border: 2px solid #ccc;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .buttonContainer {
      display: flex;
      justify-content: space-between;

      button {
        color: black;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid green;
        border-radius: 3px;
        cursor: pointer;
        background-color: transparent;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:first-child {
          background-color: transparent;
          margin-right: 10px;
        }

        &:last-child {
          border: 2px solid red;
          background-color: transparent;
        }
      }
    }
  }
`;

/**
 * Represents a form component for creating and updating a to-do item.
 *
 * @param {object} props - The props object containing the isEditMode flag.
 * @param {boolean} props.isEditMode - The flag to indicate if the form is in edit mode.
 * @returns {JSX.Element} The TodoForm component.
 */
const TodoForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  /**
   * The Redux dispatch hook.
   */
  const dispatch = useAppDispatch();

  /**
   * The Next.js router hook.
   */
  const router = useRouter();

  /**
   * The id of the to-do item being edited.
   */
  const { id } = router.query;

  /**
   * The selector hook to retrieve to-do entities.
   */
  const selectTodoEntities = useAppSelector(todoSelectors.selectTodoEntities);
  const loading = useAppSelector(todoSelectors.selectLoadingStatus);

  /**
   * The selector hook to retrieve the selected to-do item.
   */
  const selectedTodo = useAppSelector(todoSelectors.selectedTodo);

  /**
   * The effect hook to fetch the to-do item by id if in edit mode.
   */
  useEffect(() => {
    if (id && isEditMode && !selectTodoEntities[id as string]) {
      dispatch(todoActions.getTodoById(id as string));
    }
  }, [dispatch, id, isEditMode, selectTodoEntities]);

  /**
   * The form submission handler.
   *
   * @param {TodoModel} values - The form values as a TodoModel.
   * @returns {Promise<void>} A promise that resolves when the form is submitted.
   */
  const onSubmit = async (values: TodoModel) => {
    const payload: TodoModel = {
      ...values,
      createdAt: new Date().toString(),
    };
    await dispatch(
      todoActions[isEditMode ? 'updateTodo' : 'createTodo'](payload)
    ).unwrap();
    router.push('/');
  };

  /**
   * The cancel button click handler.
   *
   * @returns {void}
   */
  const handleCancel = (): void => {
    router.push('/');
  };

  if (loading === 'loading') {
    return <div> loading...!!! </div>;
  }

  return (
    <FormContainer>
      <div className="todoForm">
        <Form
          onSubmit={onSubmit}
          initialValues={
            isEditMode
              ? ((selectTodoEntities[id as string] ||
                  selectedTodo) as TodoModel)
              : {
                  priority: 'LOW',
                  completed: 'In-progress',
                }
          }
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Title</label>
                      <input type="text" 
                        {...input} 
                        placeholder="Title" />
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <Field
                name="priority"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Priority</label>
                      <select {...input}>
                        {['LOW', 'MEDIUM', 'HIGH'].map((priority) => (
                          <option key={priority} 
                            value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Description</label>
                      <textarea placeholder="description" 
                        {...input} />
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <Field
                name="completed"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Completed</label>
                      <select {...input}>
                        {['In-progress', 'Completed'].map((completed) => (
                          <option key={completed} 
                            value={completed}>
                            {completed}
                          </option>
                        ))}
                      </select>
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <div className="buttonContainer">
                <button type="submit" 
                  disabled={submitting}>
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
                <button type="button" 
                  onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </FormContainer>
  );
};

export default TodoForm;
