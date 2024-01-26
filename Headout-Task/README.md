# Express HTTP Server

A simple HTTP server implemented in Express.js that fulfills the specified requirements. The server responds to incoming GET requests on the endpoint `/data` and accepts two query parameters: `n` for file name and `m` for line number.

## Requirements

- Set up an HTTP server in a language/framework of your choice.
- Respond to incoming GET requests on the endpoint `/data`.
- Accept 2 query params, `n` for file name, and `m` for line number.
- If both `n` and `m` are provided, return the content of file `/tmp/data/n.txt` at line number `m`.
- If only `n` is provided, return the contents of file `/tmp/data/n.txt` entirely.
- Each file should be around 100MB in size, with more than 30 different files (e.g., 1.txt, 2.txt, ..., n.txt).

## Sample Input and Output

**Request:** `/data?n=1&m=30`
**Response:** `vyAF9kLDTIbqkv5R7hFqGDXaxezu3WMV5pcPd6RdudWMqMGJBQ9YLOoCQt`

**Request:** `/data?n=1`
**Response:**
```
MSMJ53ZZt9BHPtgsuBwrSYeAG7N7HJW76aC85lajC2OCBU4oxkT6YDsVK9fxSHRCO
Cx7WP2Q9iXcFxiS1gjQaoVww5enIWX57Xj1cjxeAbvMALn37fuE0jv5SKtFqCZdLNdpcX5goGzfDMtaN3H
oXEBnCjYAzYHl1p5X6YAQLNbqgjFoRoRpa84jDGXH4TNq2AqsUypnrYQOUlZwpp
```

## Runtime Requirements

- Bundle everything inside a Docker image.
- Dockerfile should be compatible with ARM architecture and x86.
- Expose port 8080.
- Allocate a maximum of 1500 MB RAM and 2 Core CPU to the Docker container.

## Project Structure

- `Dockerfile`: Docker configuration file.
- `index.js`: Express server implementation.
- `package.json`: Node.js package configuration.
- `tmp/data`: Directory for storing data files.

## Usage

1. Build the Docker image:

   ```bash
   docker build -t express-http-server .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 8080:8080 --memory 1500m --cpus 2 express-http-server
   ```

3. Access the server at [http://localhost:8080](http://localhost:8080).

## Development

- For development purposes, generate 30 different data files with random text content and place them in the `tmp/data` directory.

## Notes

- Adapt the code as needed for your specific requirements.
- Ensure the data files are appropriately generated for testing.

Feel free to modify this README file based on your project's specifics and additional information.