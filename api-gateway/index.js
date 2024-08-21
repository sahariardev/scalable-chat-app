import express from 'express';
import dotenv from "dotenv";
import {createProxyMiddleware} from "http-proxy-middleware";

dotenv.config();
const port = process.env.PORT || 6000;
const app = express();

const routes = {
    "/api/auth": "http://localhost:5000",
    "/api/users": "http://localhost:5000",
    "/api/msgs": "http://localhost:8080"
};

for (const route in routes) {
    const target = routes[route];
    app.use(route, createProxyMiddleware({
        target: target,
        changeOrigin: true
    }));
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});