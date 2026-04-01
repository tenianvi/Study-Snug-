import React, { useState, useRef } from 'react';
import { Upload, FileText, Sparkles, Headphones, Loader2, Play, Pause, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Modality } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AIAssistant: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyGuide, setStudyGuide] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setError(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const generateStudyMaterial = async () => {
    if (!file) {
      setError("Please upload a study material first.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setStudyGuide(null);
    setAudioUrl(null);

    try {
      const base64Data = await fileToBase64(file);
      const mimeType = file.type;

      // 1. Generate Study Guide
      const guideResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "Analyze this study material and create a comprehensive study guide. Include key concepts, definitions, a summary, and 5 practice questions. Format it nicely in Markdown." },
              { inlineData: { data: base64Data, mimeType } }
            ]
          }
        ]
      });

      const guideText = guideResponse.text || "Failed to generate study guide.";
      setStudyGuide(guideText);

      // 2. Generate Audio Review Script & Audio
      // We'll ask for a concise review and then use TTS
      const reviewPrompt = `Based on the following study guide, create a 5-10 minute spoken review script. The script should be engaging, clear, and cover all major points. 
      
      Study Guide:
      ${guideText}`;

      const audioResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Speak this study review clearly and encouragingly: ${reviewPrompt}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBlob = await fetch(`data:audio/wav;base64,${base64Audio}`).then(res => res.blob());
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      }

    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setError("An error occurred while generating your study materials. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Upload Section */}
      <div className="glass-card p-8 text-center space-y-6">
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-brand-200 rounded-3xl bg-brand-50/50 hover:bg-brand-100/50 transition-all cursor-pointer relative group">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {previewUrl ? (
            <div className="space-y-4">
              {file?.type.startsWith('image/') ? (
                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-2xl shadow-md mx-auto" />
              ) : (
                <div className="w-32 h-32 bg-brand-200 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText size={48} className="text-brand-600" />
                </div>
              )}
              <p className="text-sm font-bold text-brand-700">{file?.name}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto text-brand-600 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <div>
                <p className="text-lg font-bold text-brand-800">Upload Study Material</p>
                <p className="text-sm text-brand-400">Drag and drop or click to browse (Images/PDFs)</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-500 bg-red-50 p-3 rounded-xl">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <button
          onClick={generateStudyMaterial}
          disabled={!file || isGenerating}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all ${
            !file || isGenerating 
              ? 'bg-brand-200 text-brand-400 cursor-not-allowed' 
              : 'bg-brand-700 text-white hover:bg-brand-800 shadow-lg'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span>AI is analyzing your material...</span>
            </>
          ) : (
            <>
              <Sparkles size={24} />
              <span>Generate AI Study Guide & Audio Review</span>
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {(studyGuide || audioUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Audio Review Card */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24 space-y-6">
                <div className="flex items-center space-x-3 text-brand-800">
                  <Headphones className="text-brand-500" />
                  <h3 className="text-xl font-serif font-bold">Audio Review</h3>
                </div>
                
                {audioUrl ? (
                  <div className="space-y-4">
                    <div className="p-8 bg-brand-100 rounded-3xl flex flex-col items-center justify-center space-y-4">
                      <button
                        onClick={toggleAudio}
                        className="w-16 h-16 bg-brand-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                      </button>
                      <p className="text-sm font-bold text-brand-700">5-10 Min AI Review</p>
                    </div>
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                    <p className="text-xs text-brand-400 text-center leading-relaxed">
                      Listen to a comprehensive summary of your study material generated by our AI tutor.
                    </p>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-brand-200">
                    <Loader2 size={48} className="animate-spin mb-4" />
                    <p className="text-sm font-medium">Preparing audio...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Guide Card */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center space-x-3 text-brand-800 border-b border-brand-100 pb-6">
                  <Sparkles className="text-brand-500" />
                  <h3 className="text-2xl font-serif font-bold">AI Study Guide</h3>
                </div>
                
                <div className="prose prose-brand max-w-none">
                  <div className="markdown-body text-brand-800 leading-relaxed">
                    <ReactMarkdown>{studyGuide || ''}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!studyGuide && !audioUrl && !isGenerating && (
        <div className="py-20 flex flex-col items-center justify-center text-brand-200 space-y-6">
          <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center">
            <Sparkles size={48} className="opacity-20" />
          </div>
          <div className="text-center">
            <p className="text-xl font-serif font-bold text-brand-400">Ready to boost your learning?</p>
            <p className="text-sm font-medium mt-2">Upload your notes, textbook pages, or diagrams to get started.</p>
          </div>
        </div>
      )}
    </div>
  );
};
