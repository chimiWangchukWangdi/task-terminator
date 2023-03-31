import { todoActions, TodoModel, todoSelectors } from '@cnc-nextjs-template-fe/data';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../state/store';

const CardView = dynamic(import('../card-view'));

const Button = styled.button`
  color: black;
  font-size: 16px;
  margin: 5px;
  padding: 4px 16px;
  border: 2px solid #00cc44;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
`;

const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ListingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;

  .sub__title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .create-todo {
    text-align: end;
  }
`;

/**
 * Renders the TodoListing component which displays a list of todos.
 * The component fetches the todo entities from the state using selectors and
 * dispatches the fetchTodo action to retrieve the .
 * Users can create a new todo by clicking the "Create Todo" button.
 * @returns JSX.Element
 */
const TodoListing = () => {
  const todoEntites = useAppSelector(todoSelectors.selectTodoEntities);
  const selectTodoIds = useAppSelector(todoSelectors.selectTodoIds);
  const loading = useAppSelector(todoSelectors.selectLoadingStatus);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    // Dispatch the fetchTodo action to retrieve the todo data
    dispatch(todoActions.fetchTodo());
  }, [dispatch]);

  /**
   * Navigates to the "create-todo" route when the user clicks on the "Create Todo" button.
   * @returns void
   */
  const navigateRoute = () => {
    router.push('/create-todo');
  };

  if (loading === 'loading') {
    return <div> loading... ! </div>;
  }
  return (
    <div>
      <ListingContainer>
        <div className="sub__title">
          <Title>Todo Listing</Title>
          <Button onClick={navigateRoute} 
            className="create-todo">
            Create Todo
          </Button>
        </div>

        {selectTodoIds.map((id) => (
          <CardView key={id} 
          item={todoEntites[id] as TodoModel} />
        ))}
      </ListingContainer>
    </div>
  );
};

export default TodoListing;
