import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const configPath = 'tsconfig.strict.json';

const host = ts.sys;
const parsedConfig = ts.getParsedCommandLineOfConfigFile(
  configPath,
  {},
  {
    ...host,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      reportDiagnostics([diagnostic]);
      process.exit(1);
    },
  },
);

if (!parsedConfig) {
  console.error(`Could not parse ${configPath}.`);
  process.exit(1);
}

const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options,
  projectReferences: parsedConfig.projectReferences,
});

const rootFiles = new Set(parsedConfig.fileNames.map((fileName) => normalizePath(fileName)));

const diagnostics = ts.getPreEmitDiagnostics(program).filter((diagnostic) => {
  if (!diagnostic.file) {
    return false;
  }

  return rootFiles.has(normalizePath(diagnostic.file.fileName));
});

if (diagnostics.length > 0) {
  reportDiagnostics(diagnostics);
  process.exit(1);
}

console.log(`Strict typecheck passed for ${configPath}.`);

function reportDiagnostics(diagnostics) {
  const cwd = host.getCurrentDirectory();
  const output = diagnostics.map((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, host.newLine);

    if (!diagnostic.file || diagnostic.start === undefined) {
      return `error TS${diagnostic.code}: ${message}`;
    }

    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    const fileName = path.relative(cwd, diagnostic.file.fileName);

    return `${fileName}:${position.line + 1}:${position.character + 1} - error TS${diagnostic.code}: ${message}`;
  });

  console.error(output.join(host.newLine));
}

function normalizePath(fileName) {
  return path.resolve(fileName);
}
