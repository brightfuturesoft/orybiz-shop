import { exec } from "child_process";
import axios from "axios";

interface UserData {
  domain_info: {
    domain: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const BACKEND_URL = "http://localhost:5005/api/v1/user";
async function startFrontend() {
  try {
    const res = await axios.get<UserData>(BACKEND_URL);
    const userData = res.data;

    const domain = userData.domain_info.domain;
    const url = new URL(domain);
    const port = url.port || "3000";

    console.log(`Starting frontend on port: ${port}`);

    const cmd = `npx next dev -p ${port}`;
    const child = exec(cmd);

    child.stdout?.on("data", (data) => console.log(data.toString()));
    child.stderr?.on("data", (data) => console.error(data.toString()));
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to fetch user data from backend:", err.message);
    } else if (err instanceof Error) {
      console.error("An error occurred:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
  }
}

startFrontend();
