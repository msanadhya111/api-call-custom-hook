import useHtpp from "../custom-hooks/use-api-handler";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { error, isLoading, useApiHandler } = useHtpp();
  const applyData = async (taskText, response) => {
    const data = await response.json();

    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    await useApiHandler(
      {
        url: "https://react-http-6b4a6.firebaseio.com/tasks.json",
        method: "POST",
        taskText: JSON.stringify({ text: taskText }),
        headerType: {
          "Content-Type": "application/json",
        },
      },
      applyData.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
