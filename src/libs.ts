import fetch from 'node-fetch';

export type CategoryId =
  'my-model-id-0' |
  'my-model-id-1' |
  'my-model-id-2' |
  'my-model-id-3' |
  'my-model-id-4' |
  'my-model-id-5' |
  'my-model-id-6' |
  'my-model-id-7' |
  'my-model-id-8' |
  'my-model-id-9' |
  'my-model-id-10' |
  'my-model-id-11' |
  'my-model-id-12' |
  'my-model-id-13' |
  'my-model-id-14' |
  'my-model-id-15' |
  'my-model-id-16'

export const categoryIds: CategoryId[] = [
  'my-model-id-0',
  'my-model-id-1',
  'my-model-id-2',
  'my-model-id-3',
  'my-model-id-4',
  'my-model-id-5',
  'my-model-id-6',
  'my-model-id-7',
  'my-model-id-8',
  'my-model-id-9',
  'my-model-id-10',
  'my-model-id-11',
  'my-model-id-12',
  'my-model-id-13',
  'my-model-id-14',
  'my-model-id-15',
  'my-model-id-16',
];

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
      confidence: Partial<{
        // eslint-disable-next-line no-unused-vars
        [key in CategoryId]: number;
      }>
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
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      name,
      realtime,
      categoryMapping: {
        'my-model-id-0': 'kj287XEBrIRcahlYvQoS', // 中國影響力
        'my-model-id-1': 'kz3c7XEBrIRcahlYxAp6', // 性少數與愛滋病
        'my-model-id-2': 'lD3h7XEBrIRcahlYeQqS', // 女權與性別刻板印象
        'my-model-id-3': 'lT3h7XEBrIRcahlYugqq', // 保健秘訣、食品安全
        'my-model-id-4': 'lj2m7nEBrIRcahlY6Ao_', // 基本人權問題
        'my-model-id-5': 'lz2n7nEBrIRcahlYDgri', // 農林漁牧政策
        'my-model-id-6': 'mD2n7nEBrIRcahlYLAr7', // 能源轉型
        'my-model-id-7': 'mT2n7nEBrIRcahlYTArI', // 環境生態保護
        'my-model-id-8': 'mj2n7nEBrIRcahlYdArf', // 優惠措施、新法規、政策宣導
        'my-model-id-9': 'mz2n7nEBrIRcahlYnQpz', // 科技、資安、隱私
        'my-model-id-10': 'nD2n7nEBrIRcahlYwQoW', // 免費訊息詐騙
        'my-model-id-11': 'nT2n7nEBrIRcahlY6QqF', // 有意義但不包含在以上標籤
        'my-model-id-12': 'nj2n7nEBrIRcahlY-gpc', // 無意義
        'my-model-id-13': 'nz2o7nEBrIRcahlYBgqQ', // 廣告
        'my-model-id-14': 'oD2o7nEBrIRcahlYFgpm', // 只有網址其他資訊不足
        'my-model-id-15': 'oT2o7nEBrIRcahlYKQoM', // 政治、政黨
        'my-model-id-16': 'oj2o7nEBrIRcahlYRAox', // 轉發協尋、捐款捐贈
      },
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.status !== 200) {
    console.error(response.status);
    console.error(response.statusText);
    console.error(response.text);
  }

  return await (response).json();
};

export const getModels = async (): Promise<Model[]> => {
  const url = `${API_URL}/models`;
  return (await (await fetch(url)).json()).result;
};

export const getTasks = async (modelId: string, apiKey: string): Promise<Task[]> => {
  const url = `${API_URL}/tasks?modelId=${modelId}&apiKey=${apiKey}`;
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
