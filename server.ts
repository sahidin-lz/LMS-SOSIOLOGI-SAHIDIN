import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { EXAMS_DATA } from './src/data/sociologyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'SocioEdu Architect' });
  });

  // CBT Exam Submission & Score Calculation Engine
  app.post('/api/exam/submit', (req, res) => {
    try {
      const { user_id, exam_id, answers, duration_spent_seconds, tab_switch_count } = req.body;

      const exam = EXAMS_DATA.find((e) => e.id === exam_id);
      if (!exam) {
        return res.status(404).json({ error: 'Ujian tidak ditemukan' });
      }

      let total_correct = 0;
      let total_incorrect = 0;
      let total_unanswered = 0;

      let weighted_earned_points = 0;
      let weighted_total_points = 0;

      exam.questions.forEach((q) => {
        // Assign IRT difficulty weight (HOTS = 1.6, Medium = 1.3, Basic = 1.0)
        let weight = 1.0;
        if (q.difficulty === 'Hard' || q.text.length > 250 || q.explanation.length > 100) {
          weight = 1.6;
        } else if (q.difficulty === 'Medium' || q.text.length > 150) {
          weight = 1.3;
        }
        weighted_total_points += weight;

        const userAnswer = answers?.[q.id]?.selected_option;
        if (!userAnswer) {
          total_unanswered++;
        } else if (
          userAnswer === q.correct_answer ||
          (q.correct_answer && q.correct_answer.includes(userAnswer))
        ) {
          total_correct++;
          weighted_earned_points += weight;
        } else {
          total_incorrect++;
        }
      });

      // Calculate Normal Score (0 - 100) and IRT Score (0 - 100)
      const normalScore = Math.round((total_correct / exam.total_questions) * 100);
      const irtRatio = weighted_total_points > 0 ? (weighted_earned_points / weighted_total_points) : 0;
      const irtScore = Math.min(100, Math.round(irtRatio * 100));

      // Calculate XP earned (Bonus for high accuracy + completing exam)
      let xpEarned = exam.xp_reward;
      if (normalScore >= 80) xpEarned += 50;
      if (tab_switch_count === 0) xpEarned += 20; // Integrity bonus

      const sessionResult = {
        id: `session_${Date.now()}`,
        user_id: user_id || 'usr_siswa_01',
        exam_id: exam.id,
        exam_title: exam.title,
        category: exam.category,
        start_time: new Date(Date.now() - duration_spent_seconds * 1000).toISOString(),
        end_time: new Date().toISOString(),
        duration_spent_seconds,
        total_questions: exam.total_questions,
        score: irtScore, // Primary score in scale 100 is IRT
        normal_score: normalScore,
        irt_score: irtScore,
        is_completed: true,
        total_correct,
        total_incorrect,
        total_unanswered,
        xp_earned: xpEarned,
        tab_switch_count: tab_switch_count || 0,
        answers: answers || {},
      };

      res.json({ success: true, session: sessionResult });
    } catch (err: any) {
      console.error('Error submitting exam:', err);
      res.status(500).json({ error: 'Gagal memproses hasil ujian' });
    }
  });

  // AI Sociology Tutor Endpoint (Gemini)
  app.post('/api/ai/explain', async (req, res) => {
    try {
      const { questionText, topic, studentAnswer, correctAnswer } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          explanation: `[Pakar Sosiologi Virtual]: Konsep sosiologi untuk topik "${topic || 'Sosiologi'}" menekankan bahwa interaksi sosial dan fenomena di lapangan harus dianalisis secara objektif. Jawaban yang benar adalah ${correctAnswer}.`,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Kamu adalah "SocioEdu Architect", seorang Pakar Kurikulum Sosiologi SMA & UTBK SNBT Senior. 
Jelaskan secara komprehensif, komunikatif, dan mudah dipahami konsep sosiologi berikut untuk siswa SMA:

Soal Sosiologi: "${questionText}"
Topik: "${topic}"
Jawaban Siswa: "${studentAnswer || 'Belum dijawab'}"
Jawaban Benar: "${correctAnswer}"

Tuliskan penjelasan dalam 2-3 paragraf singkat Bahasa Indonesia:
1. Mengapa pilihan ${correctAnswer} adalah jawaban paling tepat secara konsep sosiologis.
2. Analisis kesalahan atau jebakan pada opsi lainnya.
3. Tips cepat mengingat konsep ini saat UTBK SNBT Sosiologi.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ explanation: response.text });
    } catch (error: any) {
      console.error('AI Explain Error:', error);
      res.status(500).json({ error: 'Gagal menghasilkan penjelasan AI' });
    }
  });

  // Vite Middleware Setup
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SocioEdu Architect Server running on http://localhost:${PORT}`);
  });
}

startServer();
