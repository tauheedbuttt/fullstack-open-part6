import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotification } from "./contexts/NotificationContest";

const App = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedNote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedNote.id ? updatedNote : anecdote
        )
      );
      setNotification(`anecdote '${updatedNote.content}' voted`);
    },
    onError: (error) => {
      const message = error?.response?.data?.error ?? error.message;
      setNotification(message);
    },
  });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const anecdotes = result.data ?? [];

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
