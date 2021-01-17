import yargs from 'yargs';
import { start, register } from './model';

const main = () => {
  let command: string[] = [];

  if (process.env.CFA_ACTION) {
    // read commands from environment
    console.log('[main] env = ', process.env);
    command = [
      process.env.CFA_ACTION,
      process.env.CFA_URL ? `--url=${process.env.CFA_URL}` : '',
      process.env.CFA_API_KEY ? `--apiKey=${process.env.CFA_API_KEY}` : '',
      process.env.CFA_ID ? `--id=${process.env.CFA_ID}` : '', // for dev
      process.env.CFA_NAME ? `--name=${process.env.CFA_NAME}` : '', // for dev
    ].filter(e => e.length !== 0);
  } else {
    // read commands from cli
    command = process.argv.slice(2);
  }
  console.log('[main] command = ', command);

  yargs(command)
    .usage('$0 <command> [args]')
    .command('register', 'Register and get API key', {
      runType: {
        describe: 'the type of model',
        choices: ['fast', 'slow'],
        default: 'fast',
        require: true,
      },
      name: {
        describe: 'the name of model',
        default: 'model-test-delete-me',
        type: 'string',
      },
    }, (argv) => {
      console.log('registering the model | argv: ', argv);
      register(argv.name, argv.runType as ('fast' | 'slow'))
        .then(console.log)
        .catch(console.error);
    })
    .command('start', 'Start up an app', {
      apiKey: {
        describe: 'the API key from registering',
        type: 'string',
        require: true,
      },
      id: {
        describe: 'the model id',
        type: 'string',
        require: true,
      },
    }, (argv) => {
      console.log('starting the model | argv:', argv);
      start(argv.id, argv.apiKey)
        .then(console.log)
        .catch(console.error);
    })
    .option('url', {
      describe: 'the url of cofacts API',
      default: 'https://ai-api-stag.cofacts.org/v1',
      type: 'string',
    })
    .demandCommand()
    .recommendCommands()
    .help()
    .wrap(72)
    .argv as any;
};

if (require.main === module) {
  main();
}
