import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addVote = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(addAnecdote(content));
    e.target.content.value = "";
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addVote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
