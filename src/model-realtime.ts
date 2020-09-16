import { API_URL } from './constants';
import fetch from 'node-fetch';

const main = async () => {
  const url = `${API_URL}/models`;
  const models = await (await fetch(url)).json();

  console.log(models);
};

export default main;

if (require.main === module) {
  main();
}
