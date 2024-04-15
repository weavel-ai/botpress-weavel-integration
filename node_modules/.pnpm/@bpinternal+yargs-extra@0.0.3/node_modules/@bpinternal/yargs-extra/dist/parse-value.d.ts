import yargs from 'yargs';
export declare const parseValue: <O extends yargs.Options>(yargSchema: O, envVarValue: string) => yargs.InferredOptionType<O> | undefined;
