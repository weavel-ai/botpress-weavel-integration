import { YargsArgv, YargsConfig, YargsSchema } from './type-utils';
declare function cleanupConfig<Y extends YargsSchema>(schema: Y, rawConfig: YargsArgv<Y>): YargsConfig<Y>;
declare function cleanupConfig<Y extends YargsSchema>(schema: Y, rawConfig: Partial<YargsArgv<Y>>): Partial<YargsConfig<Y>>;
export { cleanupConfig };
