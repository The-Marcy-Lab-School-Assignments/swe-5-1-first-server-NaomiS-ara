# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use the exact terms and concepts from the lesson.

Your responses will be evaluated out of 6 points. You can earn 3 points for writing quality and 3 points for the accuracy and precision of the technical content.

---

## Question 1: Server Basics

What does it mean for a server to be "listening"? In your answer, explain the roles of **host**, **port**, and **localhost**.

**Your answer here**:
When a server is listening it means that it’s active and waiting for incoming connections on a specific port. There are multiple ports, and each one acts like a door that an application uses to accept requests. The host is the address where the server runs, such as an IP address, and it tells clients where to send their request. The port is the specific communication endpoint on that host, which allows multiple services to run on the same machine without conflict. localhost is a special hostname that refers to your own computer (usually 127.0.0.1), meaning the server is only accessible from your machine during development.

---

## Question 2: req and res

In the callback passed to `http.createServer((req, res) => { ... })`, what are `req` and `res`? Give at least one example of a property or method from each, and explain what it does.

**Your answer here**:In http.createServer((req, res) => { ... }), req is the IncomingMessage object that represents the client’s request, and res is the ServerResponse object that represents the server’s response. For example, req.url tells you the path the client is requesting (like /about), and req.method tells you whether it’s a GET or POST request. On the response side, res.write() sends data back to the client, and res.end() finishes the response and sends it. You can also use res.statusCode = 404 to set the HTTP status code before ending the response. Together, req and res allow the server to read information from the client and send back an appropriate response.

---

## Question 3: Routing

What is **routing** in the context of a server, and how do you implement it using `node:http`? Why is it important to use `return` after calling `res.end()`?

**Your answer here**:Routing is the process of deciding how a server should respond based on the request’s URL and HTTP method. In node:http, you implement routing by checking values like req.url and req.method inside the server callback and using if or switch statements to handle different paths. For example, if req.url === '/', you might send a homepage response, but if it equals /about, you send different content. After calling res.end(), it is important to use return to stop the function from continuing to run additional code. Without return, the server might try to send another response, which would cause an error because a response can only be ended once.
