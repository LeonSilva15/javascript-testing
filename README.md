# JavaScript Testing
Testing in software development is a crucial process aimed at ensuring the quality, functionality, and reliability of software applications. It involves executing software with the intent of identifying errors, gaps, or missing requirements compared to the desired outcomes. The process of software testing can be broadly categorized into several key types, each serving a specific purpose within the development lifecycle

### You can also read:
* [Vitest](./Vitest.md)
* [Types of Testing](./Types%20of%20Testing.md)
* [Best Practices](./Best%20Practices.md)

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
    ```text
    scripts: {
        ...
        "test": "vitest"
    }
    ```
7. Run your tests in watch mode
    ```bash
    npm run test
    ```

![1 - vitest running](https://github.com/LeonSilva15/javascript-testing/assets/36859776/a70c8404-cc68-4d07-bb7b-94cd8184fca8)
![2 - vitest commands](https://github.com/LeonSilva15/javascript-testing/assets/36859776/9b2a5f74-7f57-4d1b-94a5-8ceab41b2e1c)

## Test UI
1. Install @vitest/ui
    ```bash
    npm install @vitest/ui
    ```
2. Add test:ui command to package.json
    ```text
    scripts: {
        ...
        "test:ui": "vitest --ui"
    }
    ```
3. Run the test:ui command
    ```bash
    npm run test:ui
    ```

![3 - vitest ui](https://github.com/LeonSilva15/javascript-testing/assets/36859776/c281794a-e987-43a8-b922-cc9d3bfa6e2d)
![4 - vitest ui 2](https://github.com/LeonSilva15/javascript-testing/assets/36859776/e7ad3a64-e596-41ff-b351-c87a9b7307a2)

## Code Coverage
1. Add the command to package.json
    ```text
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
5. Open your `index.html` file (recommended extension - LiveServer)

![5 - vitest coverage](https://github.com/LeonSilva15/javascript-testing/assets/36859776/673d06d6-4a44-4695-b30d-4f4193396ebb)
![6 - vitest coverage 2](https://github.com/LeonSilva15/javascript-testing/assets/36859776/853282df-1312-48d2-8a12-417ccf8d0c33)
