import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://127.0.0.1:4001/graphql',
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    generates: {
        // Centralized schema types
        'src/shared/api/models.gen.ts': {
            plugins: [
                'typescript', // Generate types for schema
            ],
        },
        // Operation-specific types and hooks
        'src/': {
            preset: 'near-operation-file', // Generates files next to operations
            presetConfig: {
                extension: '.gen.ts', // Use `.gen.ts` for generated files
                baseTypesPath: 'shared/api/models.gen.ts', // Path to schema types
            },
            plugins: [
                'typescript-operations', // Generate types for queries/mutations
                'typescript-react-apollo', // Generate hooks for React
            ],
        },
    },
};

export default config;
