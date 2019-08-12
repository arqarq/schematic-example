import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (process.argv[3]) {
      console.log("z linii komend:", process.argv[3]);
    } else {
        console.log("ze schema_.json lub nadpisane:", _options.arek);
    }
    return tree;
  };
}
