import { useState, useCallback } from "react";

const useHtpp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const useApiHandler = useCallback(async (obj, applyData) => {
    try {
      const response = await fetch(obj.url, {
        method: obj.method ? obj.method : "GET",
        body: obj.taskText ? JSON.stringify({ text: obj.taskText }) : null,
        headers: obj.headerType ? obj.headerType : {},
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    error,
    isLoading,
    useApiHandler,
  };
};
export default useHtpp;
