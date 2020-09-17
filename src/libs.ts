import fetch from 'node-fetch';

export type CategoryId = 'c1' | 'c2' | 'c3' | 'c3' | 'c4' | 'c5'

export type Task = {
  id: string;
  modelId: string;
  content: string;
  source: 'LINE';
}

export type Model = {
  id: string;
  name: string;
  apiKey: string;
  realTime: boolean;
  approved: boolean;
  createdAt: string;
}

export type TaskResult = {
  id: string;
  result: {
    prediction: {
      confidence: {
        [key: string]: number;
      }
    },
    time?: number,
  }
}

export const API_URL = 'https://ai-api-stag.cofacts.org/v1';

export const sleep = async (s: number) => {
  // eslint-disable-next-line promise/param-names
  return new Promise(r => setTimeout(r, s));
};

export const createModel = async (name: string, realtime: boolean = true): Promise<Model> => {
  const url = `${API_URL}/models`;
  const model = await (await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      name,
      realtime,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })).json();
  return model;
};

export const getModels = async (): Promise<Model[]> => {
  const url = `${API_URL}/models`;
  return (await (await fetch(url)).json()).result;
};

export const getTasks = async (modelId: string): Promise<Task[]> => {
  const url = `${API_URL}/tasks?modelId=${modelId}`;
  return (await fetch(url)).json();
};

export const returnTasks = async (taskResult: TaskResult[]) => {
  const url = `${API_URL}/tasks`;
  const result = await (await fetch(url, {
    method: 'post',
    body: JSON.stringify(taskResult),
    headers: {
      'content-type': 'application/json',
    },
  })).json();
  return result;
};
