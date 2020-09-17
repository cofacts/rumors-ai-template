import { Model, TaskResult, createModel, getModels, getTasks, returnTasks, sleep } from './libs';

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

const main = async () => {
  const mode = process.env.MODE || 'fast';
  console.log(`[main] mode = ${mode}`);

  if (mode !== 'fast' && mode !== 'slow') {
    console.error(`[main] wrong mode = ${mode}`);
    return;
  }

  const { defaultModel, sleepTime, isRealtime } = MODE[mode];
  const models = (await getModels()).filter(m => m.name === defaultModel);

  let myModel: Model;
  if (models.length === 0) {
    myModel = await createModel(defaultModel, isRealtime);
  } else {
    myModel = models[0];
  }

  // const modelId = '5f630fddac463d4fdcfb373c';
  const modelId = myModel.id;
  while (true) {
    const tasks = await getTasks(modelId);
    console.log(`[main] get task, length = ${tasks.length}`);

    await sleep(sleepTime);
    const taskResults: TaskResult[] = tasks.slice(0, 50).map((t: any) => (
      {
        id: t.id,
        result: {
          prediction: { confidence: { c1: 0 } },
        },
      }
    ));
    const result = await returnTasks(taskResults);
    console.log('[main] result = ', result);

    if (tasks.length === 0) break;
  }
  console.log('[done]');
};

export default main;

if (require.main === module) {
  main();
}
