import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
// Our builder forwards the STDOUT of the command to the logger.
import { logging, schema } from '@angular-devkit/core';

describe('Command Runner Builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);

    // TestingArchitectHost() takes workspace and current directories.
    // Since we don't use those, both are the same in this case.
    architectHost = new TestingArchitectHost(__dirname, __dirname);
    architect = new Architect(architectHost, registry);

    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage('..');
  });

  // This might not work in Windows.
  it('can run ls', async () => {
    // Create a logger that keeps an array of all messages that were logged.
    const logger = new logging.Logger('');
    const logs: string[] = [];
    logger.subscribe(ev => logs.push(ev.message));

    // A "run" can have multiple outputs, and contains progress information.
    const run = await architect.scheduleBuilder('@arqarq/command-runner-example', {
      command: 'cmd',
      args: [
        "/c",
        "type",
        "touch_test.txt"
      ]
    }, {logger});  // We pass the logger for checking later.

    // The "result" member (of type BuilderOutput) is the next output.
    const output = await run.result;

    // Stop the builder from running. This stops Architect from keeping
    // the builder-associated states in memory, since builders keep waiting
    // to be scheduled.
    await run.stop();

    // Expect that it succeeded.
    expect(output.success).toBe(true);

    // Expect that this file was listed. It should be since we're running
    // `ls $__dirname`.
    expect(logs).toContain('ABC');
  });
});
