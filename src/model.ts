import { Model, TaskResult, createModel, getModels, getTasks, returnTasks, sleep } from './libs';

const main = async () => {
  const defaultModel = 'template';
  const models = (await getModels()).filter(m => m.name === defaultModel);

  let myModel: Model;
  if (models.length === 0) {
    myModel = await createModel(defaultModel, true);
  } else {
    myModel = models[0];
  }

  // const modelId = '5f630fddac463d4fdcfb373c';
  const modelId = myModel.id;
  while (true) {
    const tasks = await getTasks(modelId);
    console.log(`[main] get task, length = ${tasks.length}`);
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
    await sleep(1 * 1000);
    if (tasks.length === 0) break;
  }
  console.log('[done]');
};

export default main;

if (require.main === module) {
  main();
}
