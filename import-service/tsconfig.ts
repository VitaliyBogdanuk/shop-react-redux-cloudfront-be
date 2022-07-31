{
    "compilerOptions": {
        "lib": ["es2017"],
        "removeComments": true,
        "moduleResolution": "node",
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "resolveJsonModule": true,
        "allowSyntheticDefaultImports": true,
        "sourceMap": true,
        "target": "es2017",
        "outDir": "lib"
    },
    "include": ["./**/*.ts"],
    "exclude": [
        "node_modules/**/*",
        ".serverless/**/*",
        ".webpack/**/*",
        "_warmup/**/*",
        ".vscode/**/*"
    ]
}