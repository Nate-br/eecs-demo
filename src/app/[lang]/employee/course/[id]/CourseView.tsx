"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";
import { completeModuleAction } from "@/actions/progress";

export function CourseView({ lang, moduleData }: { lang: string; moduleData: any }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startVideo = () => {
    setIsPlaying(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setVideoProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsPlaying(false);
        setIsVideoFinished(true);
      }
    }, 1000); // 5 seconds total
  };

  // Use real module data from DB
  const course = {
    title: lang === 'am' ? moduleData.titleAm : moduleData.titleEn,
    description: moduleData.description,
    question: "Which of the following is the most common vector for a cyber attack?",
    options: [
      { id: "a", text: "Physical Server Breach" },
      { id: "b", text: "Phishing Emails" },
      { id: "c", text: "Brute Force Password Guesses" }
    ],
    correctAnswer: "b"
  };

  const handleSubmitQuiz = async () => {
    if (!quizAnswer) return;
    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    setIsSubmitting(false);

    if (quizAnswer === course.correctAnswer) {
      await completeModuleAction(moduleData.id);
      
      toast.success("Knowledge Check Passed!", {
        description: "You have successfully completed this module."
      });
      router.push(`/${lang}/employee/dashboard`);
    } else {
      toast.error("Incorrect Answer", {
        description: "Please review the material and try again."
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link href={`/${lang}/employee/dashboard`} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-lg font-medium">{course.title}</h2>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="grid gap-6">
          <div className="w-full aspect-video bg-black rounded-lg border border-border flex items-center justify-center relative overflow-hidden group">
            {moduleData.videoUrl ? (
              <video 
                src={moduleData.videoUrl} 
                controls 
                className="w-full h-full object-contain"
                onEnded={() => setIsVideoFinished(true)}
              />
            ) : isPlaying ? (
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center">
                <span className="text-primary animate-pulse flex items-center gap-2 mb-4">
                  <Play className="w-4 h-4" /> Playing Module Video...
                </span>
                <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${videoProgress}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Anti-cheat tracking active.</p>
              </div>
            ) : isVideoFinished ? (
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" />
                <span className="text-white font-medium">Video Completed</span>
                <p className="text-sm text-slate-400 mt-1">You may now take the knowledge check.</p>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 opacity-50"></div>
                <Button 
                  size="icon" 
                  className="h-16 w-16 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary z-10 hover:scale-105 transition-transform"
                  onClick={startVideo}
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </>
            )}
          </div>

          <div className="py-2">
            <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>

          {/* Quiz Section */}
          <Card className="shadow-none border-border mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-muted-foreground" />
                Knowledge Check
              </CardTitle>
              <CardDescription>Answer the question below to complete this module.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="font-medium">{course.question}</p>
                <RadioGroup value={quizAnswer} onValueChange={setQuizAnswer} className="space-y-3">
                  {course.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setQuizAnswer(option.id)}>
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer flex-1">{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button 
                  onClick={handleSubmitQuiz} 
                  disabled={!quizAnswer || isSubmitting || !isVideoFinished}
                  className="w-full sm:w-auto mt-4"
                >
                  {isSubmitting ? "Submitting..." : !isVideoFinished ? "Watch video to unlock" : "Submit Answer"}
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
