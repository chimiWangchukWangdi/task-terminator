import dynamic from 'next/dynamic';

const TodoListing = dynamic(import('../components/todo-listing'));
export default function Home() {
  return (
      <div>
        <TodoListing></TodoListing>
      </div>
  );
}
