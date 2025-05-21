// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { type AWS } from "@serverless/typescript";
import type { WebLambdaFunctionInterface } from "../interfaces/WebLambdaFunctionInterface";

export function GetWebLambdaFunctions(functions?: AWS["functions"]): WebLambdaFunctionInterface[] {
    if (functions === undefined) {
        return [];
    }

    return Object.keys(functions)
        .filter((key) => {
            const fn = functions[key];

            return (
                fn.url !== undefined || fn.events?.some((e: unknown) => Boolean(e.httpApi) || Boolean(e.http) || e.alb)
            );
        })
        .map((key) => {
            return {
                name: key,
                usesLambdaUrl: functions[key].url !== undefined,
            };
        });
}
