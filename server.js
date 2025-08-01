import express from "express";
import dotenv from "dotenv";
import { testTagGenerate } from "./services/tagService.js";
import { OpenAI } from 'openai';
import postRouter, { init } from "./routes/posts.js";
import { connectDB } from "./database/db.js";
import cors from "cors";
import { handleSSEConnection } from "./sse/sseManager.js";

// 환경변수
dotenv.config();

const app = express();
const PORT = process.env.PORT;
//onst OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// cors 설정
app.use(cors());    // 인자값이 공란일 경우, 모든 도메인 허용

// JSON형태의 데이터를 객체로 변환
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 라우터 미들웨어 등록
// /posts/ 등 라우터 사용
app.use("/posts", postRouter);

app.get("/events", handleSSEConnection);

app.listen(PORT, async () => {
    console.log("server running at", PORT);
    const db = await connectDB();
    init(db);
    //console.log("OPENAI_API_KEY", OPENAI_API_KEY);
    //testTagGenerate(OPENAI_API_KEY);
    //console.log(MONGODB_URI);
    //connectDB();
});