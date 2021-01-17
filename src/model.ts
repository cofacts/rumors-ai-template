import { TaskResult, createModel, getTasks, returnTasks, sleep, categoryIds } from './libs';

const MODE = {
  fast: {
    defaultModel: 'fast-template',
    sleepTime: 100,
    isRealtime: true,
  },
  slow: {
    defaultModel: 'show-template',
    sleepTime: 10 * 1000,
    isRealtime: false,
  },
};

export const start = async (modelId: string, apiKey: string, mode: 'fast' | 'slow' = 'fast') => {
  console.log(`[start] mode = ${mode}`);

  const { sleepTime } = MODE[mode];

  while (true) {
    const tasks = await getTasks(modelId, apiKey);
    console.log(`[start] get task, length = ${tasks.length}`);

    await sleep(sleepTime);
    const taskResults: TaskResult[] = tasks.slice(0, 50).map((t: any, index) => (
      {
        id: t.id,
        result: {
          prediction: { confidence: { [categoryIds[index % categoryIds.length]]: Math.random() } },
        },
      }
    ));
    const result = await returnTasks(taskResults);
    console.log('[start] result = ', result);

    if (tasks.length === 0) break;
  }
  console.log('[done]');
};

export const register = async (name: string, mode: 'fast' | 'slow' = 'fast') => {
  return createModel(name, mode === 'fast');
};
