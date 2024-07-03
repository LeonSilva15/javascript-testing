# JavaScript Testing
Testing in software development is a crucial process aimed at ensuring the quality, functionality, and reliability of software applications. It involves executing software with the intent of identifying errors, gaps, or missing requirements compared to the desired outcomes. The process of software testing can be broadly categorized into several key types, each serving a specific purpose within the development lifecycle

## Initial setup
1. Initialize your project
    ```bash
    npm init
    ```
2. Create your project
    ```bash
    npm create vite@latest
    ```
    For this project choose Vanilla
3. Install the dependencies
    ```bash
    npm install
    ```
4. You can verify that everything is ok
    ```bash
    npm run dev
    ```
5. Install Vitest as a development dependency
    ```bash
    npm i -D vitest
    ```
6. Add the test command to your package.json
    ```json
    scripts: {
        ...
        "test": "vitest"
    }
    ```
7. Run your tests in watch mode
    ```bash
    npm run test
    ```

## Test UI
1. Install @vitest/ui
    ```bash
    npm install @vitest/ui
    ```
2. Add test:ui command to package.json
    ```json
    scripts: {
        ...
        "test:ui": "vitest --ui"
    }
    ```
3. Run the test:ui command
    ```bash
    npm run test:ui
    ```

## Code Coverage
1. Add the command to package.json
    ```json
    scripts: {
        ...
        "coverage": "vitest run --coverage"
    }
    ```
2. Run the coverage command and install the dependencies
    ```bash
    npm run coverage
    ```
3. Re-run the command
    ```bash
    npm run test:ui
    ```
4. Go to the generated `coverage` directory
5. Open your `index.html` file

### You can also read:
* [Vitest](./Vitest.md)
* [Types of Testing](./Types%20of%20Testing.md)
* [Best Practices](./Best%20Practices.md)
