import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ButtonProps, todoActions, TodoModel } from '@cnc-nextjs-template-fe/data';
import { useAppDispatch } from '../../state/store';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 10px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  color: black;
`;

const CardHeader = styled.div`
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const CardTitle = styled.p`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const CardBody = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<ButtonProps>`
  color: black;
  font-size: 16px;
  margin: 16px;
  padding: 4px 16px;
  border: 2px solid ${(props) => (props.edit ? '#ff9933' : '#ff3333')};
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
`;

/**
 * React functional component that represents the view of a todo card.
 *
 * @param {Object} props - The component props.
 * @param {TodoModel} props.item - An object of type TodoModel that contains properties such as "title", "priority", "description", and "completed".
 *
 * @returns {JSX.Element} - A React component that renders a card with todo information and buttons for editing and deleting.
 */
const CardView = ({ item }: { item: TodoModel }) => {
  /**
   * The Redux dispatch function that allows the component to dispatch actions to the store.
   *
   * @type {Function}
   */
  const dispatch = useAppDispatch();

  /**
   * The Next.js router object that allows the component to handle navigation and redirection.
   *
   * @type {Object}
   */
  const router = useRouter();

  /**
   * Asynchronous function that dispatches a deleteTodo action with the todo's ID when the user clicks on the "Delete" button.
   *
   * @param {string} id - The ID of the todo to be deleted.
   *
   * @returns {Promise<void>} - A promise that resolves when the deleteTodo action is completed.
   */
  const deleteTodo = async (id: string) => {
    await dispatch(todoActions.deleteTodo(id)).unwrap();
  };
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>Title: {item?.title}</CardTitle>
        <CardTitle>Priority: {item?.priority}</CardTitle>
      </CardHeader>
      <CardBody>Description: {item?.description}</CardBody>
      <CardBody>Completed: {item?.completed}</CardBody>
      <ButtonContainer>
        <Button edit 
          onClick={() => router.push('/edit-todo/' + item?.id)}>
          Edit
        </Button>
        <Button onClick={() => deleteTodo(item?.id)}>Delete</Button>
      </ButtonContainer>
    </CardContainer>
  );
};

export default CardView;
