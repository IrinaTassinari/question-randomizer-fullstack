const API_URL = import.meta.env.VITE_API_URL;
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 10000);

function getApiUrl() {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  return API_URL;
}

async function parseResponseBody(res: Response) {
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();

  return text ? { message: text } : {};
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers = new Headers(init.headers ?? {});

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      signal: controller.signal,
      headers,
    });

    const result = await parseResponseBody(res);

    if (!res.ok) {
      const message =
        typeof result === "object" && result && "message" in result
          ? String(result.message)
          : "Request failed";

      throw new Error(message);
    }

    return result as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The server took too long to respond. Please try again.");
    }

    if (error instanceof TypeError) {
      throw new Error("API is unavailable right now. Check the server, CORS, or network.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  role: "teacher" | "student";
}) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signInUser(data: {
  email: string;
  password: string;
}) {
  return request("/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProfile(token: string) {
  return request("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchQuestions() {
  return request("/questions");
}

export async function createQuestion(
  token: string,
  data: {
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    question: string;
    answer: string;
    explanation: string;
  }
) {
  return request("/questions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
