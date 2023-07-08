import { useEffect, useState } from "react";
import { List } from "./list.tsx";
import { Robot } from "../types.ts";

export function App() {
  const [robotsList, setRobotsList] = useState<Robot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const data_url = "https://api.npoint.io/86690d80ff3d455133f0";
        const response = await fetch(data_url);
        const data = await response.json() as Robot[];
        // console.table(data);
        // console.log(`${data.length} items loaded`);
        setRobotsList(data);
      } catch (error: unknown) {
        setErrorMsg(`fetch operation failed: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    }
    getData().catch(console.log);
  }, []);

  return (
    <div className="app">
      <div className="header">
        <h1 className="headline white-text">Show me the list!</h1>
      </div>
      {errorMsg ? (
        <h1>{errorMsg}</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <List listData={robotsList} />
      )}
    </div>
  );
}
