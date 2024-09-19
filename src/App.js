import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHtpp from "./components/custom-hooks/use-api-handler";

async function App() {
  const [tasks, setTasks] = useState([]);
  const applyData = (data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  };
  // If there is any chamge in custom hook then the one who is using it will also be re-evaluated
  const { error, isLoading, useApiHandler: fetchTasks } = useHtpp();
  /*
From the custom hook we will have access here so we have access to fetchTasks as well so we can call it from here as well
*/
  //fetchTasks({url: 'https://react-http-6b4a6.firebaseio.com/tasks.json'},applyData);
  useEffect(() => {
    fetchTasks(
      { url: "https://react-http-6b4a6.firebaseio.com/tasks.json" },
      applyData
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
