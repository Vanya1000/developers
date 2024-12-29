import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://127.0.0.1:4001/graphql',
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    generates: {
        'src/shared/api/models.gen.ts': {
            plugins: [
                'typescript',
            ],
        },
        'src/': {
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.gen.ts',
                baseTypesPath: 'shared/api/models.gen.ts',
            },
            plugins: [
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                prepend: [
                    "// @ts-nocheck",
                ],
            },
        },
    },
};

export default config;
