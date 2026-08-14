import { useState, useCallback, type ReactNode, useRef } from "react";
import { Sparkles, Upload, X, ImagePlus, Loader2, Download, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { SectionHead } from "@/components/site/bits";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateAIVisualization } from "@/lib/gemini-image.server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const SPACE_OPTIONS = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Office",
  "Reception",
  "Commercial Space",
  "Retail Space",
  "Hostel / PG",
  "Other",
] as const;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function AiVisualizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [spaceType, setSpaceType] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const validateFile = useCallback((f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return "Unsupported format. Please upload JPG, PNG or WEBP.";
    }
    if (f.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 10MB.";
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (f: File) => {
      setError(null);
      setGenerationError(null);
      setGeneratedImage(null);
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    },
    [validateFile],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile],
  );

  const onBrowse = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
    },
    [handleFile],
  );

  const clearFile = useCallback(() => {
    setFile(null);
    setPreview(null);
    setGeneratedImage(null);
    setGenerationError(null);
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const canGenerate = file && spaceType && description.trim().length > 0;

  const handleGenerate = useCallback(async () => {
    if (!canGenerate || !file) return;
    setIsGenerating(true);
    setError(null);
    setGenerationError(null);

    try {
      const base64Data = await fileToBase64(file);
      const result = await (generateAIVisualization as any)({
        data: {
          imageData: base64Data,
          spaceType,
          description: description.trim(),
        },
      });

      if (result.success && result.image) {
        setGeneratedImage(result.image);
      } else {
        setGenerationError(result.message || "We couldn't create the visualization this time. Please try again.");
      }
    } catch {
      setGenerationError("We couldn't create the visualization this time. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [canGenerate, file, spaceType, description]);

  const handleDownload = useCallback(() => {
    if (generatedImage) {
      downloadImage(generatedImage, "payal-decor-ai-visualization.png");
    }
  }, [generatedImage]);

  const handleTryAgain = useCallback(() => {
    setGeneratedImage(null);
    setGenerationError(null);
  }, []);

  const handleCreateAnother = useCallback(() => {
    setFile(null);
    setPreview(null);
    setSpaceType("");
    setDescription("");
    setGeneratedImage(null);
    setGenerationError(null);
  }, []);

  const showSuccess = generatedImage && !generationError;
  const showError = generationError && !generatedImage;

  return (
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHead
            eyebrow="AI Visualizer"
            title="Visualize Your Space With AI"
            lead="Upload a photo of your space, describe what you need, and create an AI-powered furniture visualization."
            align="center"
          />
          <div className="mt-6">
            <Button
              onClick={scrollToForm}
              className="bg-brand-gradient text-primary-foreground hover:shadow-[var(--shadow-lift)]"
            >
              <Sparkles className="mr-2 size-4" />
              Start Visualizing
            </Button>
          </div>
        </div>
      </Reveal>

      <div ref={formRef} className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Left: Upload + Form */}
        <div className="space-y-5">
          {/* Upload */}
          <Reveal>
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-semibold">Upload Your Space</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Drop your image here or browse. Supported formats: JPG, JPEG, PNG, WEBP.
                </p>

                {!preview ? (
                  <div
                    onDrop={onDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    className={`mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                      dragOver
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                      <Upload className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Drop your image here or <span className="text-primary">browse</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Maximum file size: 10MB
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={onBrowse}
                      className="hidden"
                      id="ai-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("ai-upload")?.click()}
                    >
                      <ImagePlus className="mr-2 size-4" />
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Uploaded space preview"
                        className="h-64 w-full object-cover sm:h-72"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-2 size-8 rounded-full bg-card/90 shadow"
                        onClick={clearFile}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-secondary/40 px-4 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{file?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file?.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearFile}
                        className="shrink-0"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}

                {(error || generationError) && (
                  <p className="mt-2 text-xs text-red-500">{error || generationError}</p>
                )}
              </CardContent>
            </Card>
          </Reveal>

          {/* Space Type */}
          <Reveal delay={80}>
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-semibold">What&apos;s the space?</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select the type of space you want to visualize.
                </p>
                <div className="mt-3">
                  <Select value={spaceType} onValueChange={setSpaceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select space type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPACE_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Description */}
          <Reveal delay={160}>
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-semibold">Describe What You Need</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tell us what furniture or interior elements you&apos;d like to visualize.
                </p>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: Add a modern reception desk, comfortable seating and storage cabinets. Keep the existing wall and flooring."
                  className="mt-3 min-h-[120px]"
                />
              </CardContent>
            </Card>
          </Reveal>

          {/* Generate Button */}
          <Reveal delay={240}>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className="bg-brand-gradient text-primary-foreground hover:shadow-[var(--shadow-lift)] disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating your space...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Generate Visualization
                  </>
                )}
              </Button>
              {showSuccess && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleTryAgain}
                  >
                    <RefreshCw className="mr-2 size-4" />
                    Try Again
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCreateAnother}
                  >
                    Create Another Visualization
                  </Button>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* Right: Result area */}
        <div className="space-y-5">
          <Reveal delay={120}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="size-12 animate-spin text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Creating your space...</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Our AI is visualizing your furniture and interior requirements.
                      </p>
                    </div>
                  </div>
                ) : showSuccess && generatedImage ? (
                  <div className="flex w-full flex-col items-center gap-4">
                    <p className="text-sm font-semibold">Your AI Visualization</p>
                    <div className="w-full overflow-hidden rounded-xl border border-border">
                      <img
                        src={generatedImage}
                        alt="AI generated visualization"
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                      >
                        <Download className="mr-2 size-4" />
                        Download Image
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleTryAgain}
                      >
                        <RefreshCw className="mr-2 size-4" />
                        Try Again
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCreateAnother}
                      >
                        Create Another Visualization
                      </Button>
                    </div>
                  </div>
                ) : showError ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
                      <Sparkles className="size-7" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Unable to generate visualization</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {generationError}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
                      <Sparkles className="size-7" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Your visualization will appear here</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Upload an image, select a space type and describe your requirements to get started.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
