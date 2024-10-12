# Decision Tree Backend API - Typescript | Node.Js | Express.Js

### Setup

 - Clone or download repo : `https://github.com/ekaur45/decision-tree-task.git`
 - Navigate to your project where `package.json` is located
 - Run `npm i` or `npm i --legacy-peer-deps`
 - copy `.env.example` to `.env` 
    - bash ``` cp .env.example .env ```


### Runing the project
 - Development: `npm run dev`
 - Build project: `npm run build`
 - Run build project: `cd build && npm run start:prod` or `cd ./build; npm run start:prod` make sure to install dependencies before run prod by `npm i` or `npm i --legacy-peer-deps`
 
 ### Project structure

 I'll extract the contents of the uploaded `scripts.zip` file to see the project structure and provide a suitable explanation to add to the `README.md`. Let me start by extracting the files.



---

### Project Structure

The project is organized as follows:

- **`/.env` & `.env.example`**: Environment configuration files. The `.env` file contains sensitive environment variables (should not be committed to source control), and `.env.example` serves as a template.

- **`/.gitignore`**: Specifies files and directories that should be ignored by Git.

- **`/jest.config.js`**: Configuration file for Jest, the testing framework used for this project.

- **`/package.json` & `package-lock.json`**: Manage project dependencies and scripts. The `package.json` includes scripts for building, testing, and running the project.

- **`/readme.md`**: This file, providing an overview of the project, usage instructions, and other relevant documentation.

- **`/swagger.json`**: The Swagger specification file used for API documentation.

- **`/tsconfig.json` & `/tslint.json`**: Configuration files for TypeScript compilation and linting, respectively.

- **`/scripts/`**: Contains shell scripts for deployment, such as `before_install.sh`, `after_install.sh`, and `application_start.sh`.

- **`/server/`**: The main backend implementation folder.
  - **`/server/app.ts`**: The entry point for the application, where the server is initialized.
  - **`/server/index.ts`**: The starting script for launching the server.
  - **`/server/src/`**: Source code for the backend, organized into subfolders:
    - **`/controllers/`**: Handles the incoming requests and orchestrates responses. For example, `decision-tree.controller.ts` manages decision tree-related actions.
    - **`/middlewares/`**: Contains middleware functions for request handling.
    - **`/models/`**: Defines the data models, including `decision-tree` and `dto` (Data Transfer Objects).
    - **`/routes/`**: Defines API endpoints, such as `decision-tree.router.ts`.
    - **`/services/`**: Contains business logic and service-related code, such as `decision-tree.service.ts`.
    - **`/utils/`**: Utility functions and helpers, such as database-related utilities.

- **`/__tests__/`**: Includes unit tests for the project, ensuring code functionality.

- **`/coverage/`**: Contains code coverage reports generated after running tests.

- **`/logs/`**: Stores log files for tracking application activity and errors.

This structure helps maintain a clean separation of concerns, making the project more manageable and easier to navigate.


### CI CD - with AWS Code build and repository, Github

---

### CI/CD Pipeline Setup for AWS EC2 using AWS CodeBuild and GitHub

The project includes a CI/CD configuration to automate the deployment process to an AWS EC2 instance using AWS CodeBuild, CodePipeline, and integration with GitHub. This setup enables automatic building, testing, and deployment of the application whenever changes are pushed to the repository.

#### Overview of the CI/CD Process:

1. **Source Code Management:**
   - The source code is hosted on GitHub, and a connection is set up with AWS CodePipeline to trigger the CI/CD pipeline whenever changes are pushed to specific branches.

2. **AWS CodePipeline Configuration:**
   - AWS CodePipeline orchestrates the CI/CD pipeline, consisting of multiple stages, including source, build, and deploy.
   - The pipeline is configured to monitor the GitHub repository for changes. When a commit is made or a pull request is merged, it triggers the pipeline automatically.

3. **AWS CodeBuild for Build and Test:**
   - CodeBuild is used to compile the TypeScript code, run tests, and create a production-ready build.
   - A `buildspec.yml` file is included in the project, specifying the steps for CodeBuild, such as installing dependencies, running tests, and compiling the TypeScript code.

4. **Deployment to AWS EC2:**
   - After a successful build, the application is deployed to an AWS EC2 instance.
   - The deployment process includes connecting to the EC2 instance via SSH and running deployment scripts located in the `/scripts` directory (e.g., `before_install.sh`, `after_install.sh`, `application_start.sh`) to automate tasks such as installing dependencies, configuring the environment, and starting the application.

5. **AWS CodeCommit Integration (Optional):**
   - If using AWS CodeCommit for version control, a pipeline can also be configured to pull the source code from the AWS repository instead of GitHub.

6. **Secrets and Credentials:**
   - Secure handling of sensitive information such as AWS credentials, GitHub tokens, and environment variables is managed through AWS Secrets Manager and IAM roles.

#### How the CI/CD Pipeline Works:

- **Source Stage:**
  - The pipeline monitors the GitHub repository for changes in the specified branch.
  - When a new commit or pull request is merged, CodePipeline retrieves the latest source code from the GitHub repository.

- **Build Stage (AWS CodeBuild):**
  - CodeBuild installs the necessary dependencies, runs automated tests, and compiles the TypeScript code using the instructions provided in `buildspec.yml`.
  - Artifacts, such as the compiled code or Docker image, are generated and passed to the next stage.

- **Deploy Stage:**
  - The deployment scripts are executed on the AWS EC2 instance to install or update dependencies, set up the environment, and restart the application.

#### Benefits:
- Enables seamless integration and continuous delivery with minimal manual intervention.
- Improves code quality by running automated tests before deployment.
- Uses cloud-native services for scalability, reliability, and security.

This CI/CD setup ensures that your project is continuously built, tested, and deployed to an AWS EC2 environment, integrating GitHub and AWS services for a streamlined development workflow.


### API Response

---

### Custom Response Utilities

The project includes a custom set of response utilities to streamline the process of sending consistent HTTP responses from the Express server. The utilities augment the `Response` interface in Express, adding custom methods to handle common response types, such as `Ok`, `BadRequest`, `NotFound`, `UnAuthorized`, and `InternalServerError`. These methods help to centralize and standardize the structure of API responses.

#### Overview of Custom Response Methods:

1. **`Ok<T>(Data: T, Message?: string): void`**
   - Sends a success response with a status code of 200.
   - Takes a data payload of type `T` and an optional message (default: `"Success"`).
   - Example: `res.Ok({ id: 1, name: "John" }, "Data retrieved successfully");`

2. **`BadRequest<T>(Data: T, Message?: string): void`**
   - Sends a response with a status code of 400 to indicate a bad request.
   - Takes a data payload of type `T` and an optional message (default: `"Bad Request"`).
   - Example: `res.BadRequest(null, "Invalid input data provided");`

3. **`NotFound<T>(Data: T, Message?: string): void`**
   - Sends a response with a status code of 404 to indicate a resource was not found.
   - Takes a data payload of type `T` and an optional message (default: `"Not Found"`).
   - Example: `res.NotFound(null, "User not found");`

4. **`UnAuthorized<T>(Data: T, Message?: string): void`**
   - Sends a response with a status code of 401 to indicate unauthorized access.
   - Takes a data payload of type `T` and an optional message (default: `"Unauthorized"`).
   - Example: `res.UnAuthorized(null, "You do not have permission to access this resource");`

5. **`InternalServerError(Data: any, Message?: string): void`**
   - Sends a response with a status code of 500 to indicate a server-side error.
   - Takes a data payload of any type and an optional message (default: `"Internal Server Error"`).
   - Example: `res.InternalServerError(error, "Something went wrong on the server");`

6. **`SendResponse(Status: any, Data: any, Message?: string): void`**
   - Sends a custom response with a specified status code.
   - Takes a status code, data payload, and an optional message.
   - Example: `res.SendResponse(201, { id: 1 }, "Resource created successfully");`

#### How It Works:

- The utilities are implemented by extending the `Response` interface from the `express-serve-static-core` module.
- Each method constructs a standardized response structure using a `ResponseModel` class, which includes `status`, `message`, and `data` fields.
- By default, the response is always sent with an HTTP status code of 200, even if the application-level status indicates an error. This can be customized if needed.
- The project also supports extending the `Request` interface to include additional properties like `user`, which represents the authenticated user data.

#### Benefits:

- **Consistency:** All responses follow a standard format, making it easier for frontend clients to handle and parse responses.
- **Readability:** The code becomes more readable by using named methods for different response scenarios.
- **Centralized Error Handling:** Provides a single place to control how responses are formatted, reducing repetition across the codebase.

#### Usage Example:

```typescript
import express from "express";
const app = express();

app.get("/example", (req, res) => {
  // Successful response
  res.Ok({ message: "Hello, World!" });

  // Error response
  res.BadRequest(null, "Invalid parameters");
});

app.use((err, req, res, next) => {
  // Handling server errors
  res.InternalServerError(err, "An unexpected error occurred");
});
```

With these custom response utilities, developers can streamline error handling and response management, resulting in more maintainable and consistent code.


If the decision is to always use an HTTP status of 200 for all responses while including the actual status code in the response body, here’s an updated section for the `README.md` addressing this choice and providing suggestions for future improvements while keeping this convention:

---

### Areas for Improvement and Future Enhancements

The custom response utilities currently use an HTTP status code of 200 for all responses, including error scenarios, with the actual application-specific status code embedded in the response body. While this approach has been chosen for consistency, there are some considerations and potential improvements to enhance the current implementation:

1. **Clarifying the Reason for Using HTTP Status 200:**
   - Using a consistent HTTP status of 200 simplifies the client-side handling of responses, as the status can be interpreted solely from the response body. However, it is important to clearly document this decision so that future developers understand why this approach was chosen over using standard HTTP status codes.


2. **Ensure Consistent Response Structure:**
   - Given that the HTTP status is always 200, it is crucial that the response body always includes a `status` field with the correct application-specific status code, along with the `message` and `data`. This ensures that all responses are uniform and predictable.
   - **Suggested Improvement:** Implement validation in the response utilities to check that the `status`, `message`, and `data` fields are always populated correctly before sending the response.

3. **Integrating Response Status Handling for the Client:**
   - Clients consuming the API should be provided with guidelines on how to handle the response status codes in the body, especially for different scenarios such as authentication failures, validation errors, or successful operations.
   - **Suggested Improvement:** Create a section in the `README.md` or a separate client integration guide detailing how clients should process and interpret the response body to handle different situations effectively.

4. **Centralizing Error Handling:**
   - Since the error information is conveyed in the response body, centralizing error handling on the server can simplify the process of managing different error types and returning consistent error responses.
   - **Suggested Improvement:** Develop a global error-handling mechanism that automatically formats exceptions and other errors into the standardized response format. This would ensure consistency across the application when sending error responses.

5. **Maintaining Compatibility with Standard HTTP Practices:**
   - Although a 200 status is used for all responses, the current approach may not align with typical RESTful conventions. To maintain some level of compatibility, consider using custom HTTP headers to indicate the actual application status or error type, in addition to including it in the response body.
   - **Suggested Improvement:** Add custom headers (e.g., `X-Application-Status`, `X-Error-Type`) to convey additional information about the response status. This can help bridge the gap between standard HTTP practices and the chosen approach.

6. **Logging and Monitoring Enhancements:**
   - With the use of a status 200 for all responses, the logging system should capture the application's internal status code and any error messages to aid in monitoring and debugging.
   - **Suggested Improvement:** Integrate a logging mechanism to capture the response details, including the application status and error messages, to facilitate better monitoring and debugging practices.

7. **Unit Testing with the Current Approach:**
   - When writing unit tests for the response utilities, ensure that the tests verify the correctness of the response body's `status`, `message`, and `data` fields for different scenarios.
   - **Suggested Improvement:** Include tests that validate the response format across various conditions, ensuring that the `status` is correctly set within the body and that the `message` and `data` align with expectations.

