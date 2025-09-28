import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addVote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const newNote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newNote));
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
