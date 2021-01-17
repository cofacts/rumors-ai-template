import yargs from 'yargs';
import { start, register } from './model';

const main = () => {
  yargs(process.argv.slice(2))
    .usage('$0 <command> [args]')
    .command('register', 'Register and get API key', {
      runType: {
        describe: 'the type of model',
        choices: ['fast', 'slow'],
        default: 'fast',
        require: true,
      },
    }, (argv) => {
      console.log('registering the model | argv: ', argv);
      register('rumors-ai-template', argv.runType as ('fast' | 'slow'))
        .then(console.log)
        .catch(console.error);
    })
    .command('start', 'Start up an app', {
      modelId: {
        describe: 'the model id',
        type: 'string',
        require: true,
      },
      apiKey: {
        describe: 'the API key from registering',
        type: 'string',
        require: true,
      },
    }, (argv) => {
      console.log('starting the model | argv:', argv);
      start(argv.modelId, argv.apiKey)
        .then(console.log)
        .catch(console.error);
    })
    // .command({
    //   command: 'configure <key> [value]',
    //   aliases: ['config', 'cfg'],
    //   describe: 'Set a config variable',
    //   builder: (yargs) => yargs.default('value', 'true'),
    //   handler: (argv) => {
    //     console.log(`setting ${argv.key} to ${argv.value}`);
    //   },
    // })
    .option('url', {
      describe: 'the url of cofacts API',
      default: 'https://ai-api-stag.cofacts.org/v1',
      type: 'string',
    })
    .demandCommand()
    .recommendCommands()
    .strict()
    .help()
    .wrap(72)
    .argv as any;

  // console.log(argv);
};

if (require.main === module) {
  main();
}
