"use client";

import { useState, useEffect } from "react";
import {
  Github,
  Mic,
  Globe,
  Zap,
  Users,
  Play,
  Pause,
  StopCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export function LandingPage() {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      setVoices(synth.getVoices());
    };
    updateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleGenerate = () => {
    setShowInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText && selectedVoice) {
      const newUtterance = new SpeechSynthesisUtterance(inputText);
      newUtterance.voice =
        voices.find((voice) => voice.name === selectedVoice) || null;
      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-background">
        <a href="/" className="text-2xl font-bold font-bricolage">
          VoiceForge
        </a>
        <a
          href="https://github.com/rinkitadhana/text-to-speech"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Github className="mr-2 h-4 w-4" />
          Star on GitHub
        </a>
      </header>
      <main className="flex-grow">
        <section className="py-12 px-4 text-center">
          <h2 className=" md:text-5xl text-4xl font-extrabold mb-4 animate-fade-in font-bricolage">
            Transform Text into Natural Speech
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 animate-slide-up">
            VoiceForge brings your words to life with cutting-edge AI
            technology, creating natural-sounding voices for various
            applications.
          </p>
          <Button
            onClick={handleGenerate}
            size="lg"
            className={showInput ? "" : "animate-bounce"}
          >
            Generate Speech
          </Button>
        </section>

        {showInput && (
          <section className="py-12 px-4">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-4"
            >
              <Textarea
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px]"
              />
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={!inputText || !selectedVoice || isPlaying}
                >
                  Convert to Speech
                </Button>
                {isPlaying ? (
                  <Button type="button" onClick={handlePause}>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </Button>
                ) : (
                  utterance && (
                    <Button type="button" onClick={handleResume}>
                      <Play className="mr-2 h-4 w-4" /> Resume
                    </Button>
                  )
                )}
                {(isPlaying || utterance) && (
                  <Button
                    type="button"
                    onClick={handleStop}
                    variant="destructive"
                  >
                    <StopCircle className="mr-2 h-4 w-4" /> Stop
                  </Button>
                )}
              </div>
            </form>
          </section>
        )}

        <section className="py-16 px-4 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 font-bricolage">
              Why Choose VoiceForge?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <Mic className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold mb-2 font-bricolage">
                  Natural-Sounding Voices
                </h4>
                <p className="text-muted-foreground">
                  Our AI-powered voices sound incredibly natural and human-like,
                  ensuring an engaging listening experience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold mb-2 font-bricolage">
                  Multiple Languages
                </h4>
                <p className="text-muted-foreground">
                  Support for a wide range of languages and accents, allowing
                  you to reach a global audience with ease.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold mb-2 font-bricolage">
                  Fast Processing
                </h4>
                <p className="text-muted-foreground">
                  Lightning-fast text-to-speech conversion, enabling real-time
                  applications and quick content production.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6 font-bricolage">
              How It Works
            </h3>
            <ol className="list-decimal list-inside text-left space-y-4">
              <li className="text-lg">
                Enter your text into our user-friendly interface.
              </li>
              <li className="text-lg">
                Choose from a variety of voices and languages.
              </li>
              <li className="text-lg">
                Click 'Generate' and let our AI work its magic.
              </li>
              <li className="text-lg">
                Listen to your high-quality audio or integrate it directly into
                your project.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6 font-bricolage">
              Who Can Benefit?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-2 font-bricolage">
                  Content Creators
                </h4>
                <p className="text-muted-foreground">
                  Easily convert your written content into engaging audio for
                  podcasts, videos, and more.
                </p>
              </div>
              <div>
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-2 font-bricolage">
                  Developers
                </h4>
                <p className="text-muted-foreground">
                  Integrate natural-sounding voices into your applications,
                  games, or interactive experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-4 px-4 text-center text-muted-foreground">
        © 2023 VoiceForge. All rights reserved.
      </footer>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&display=swap");

        .font-bricolage {
          font-family: "Bricolage Grotesque", sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
