import {
    Rule, Tree, SchematicsException,
    apply, url, applyTemplates, move,
    chain, mergeWith
} from '@angular-devkit/schematics';
import { strings, normalize, experimental } from '@angular-devkit/core';
import { Schema as MyServiceSchema } from './schema';

export function myService(options: MyServiceSchema): Rule {
    return (tree: Tree) => {
        return tree;
    };
}
