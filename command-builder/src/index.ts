import { JsonObject } from '@angular-devkit/core';
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import * as childProcess from 'child_process';

interface Options extends JsonObject {
  command: string
  args: string[]
}

export default createBuilder(_commandBuilder)

function _commandBuilder(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  context.reportStatus(`Executing "${options.command}"...`);
  const child = childProcess.spawn(options.command, options.args, {stdio: 'pipe'});
  child.stdout.on('data', (dat) => {
    context.logger.info(dat.toString())
  });
  child.stderr.on('data', (dat) => {
    context.logger.error(dat.toString())
  });
  return new Promise<BuilderOutput>((resolve) => {
    child.on('close', (code) => {
      resolve({success: code === 0})
    })
  })
}
