import { useState, useCallback, useRef, useEffect } from "react";
import { Sparkles, Upload, X, ImagePlus, Loader2, RefreshCw, Armchair, LayoutGrid, Palette, Lightbulb, Ruler, AlertTriangle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { SectionHead } from "@/components/site/bits";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { generateAIVisualization } from "@/lib/gemini-image.server";

const SESSION_KEY = "ai-furniture-suggestion-session";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const SPACE_OPTIONS = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Office",
  "Reception",
  "Commercial Office",
  "Retail",
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

export default function AiVisualizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [spaceType, setSpaceType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [persistedFile, setPersistedFile] = useState<{ name: string; size: number } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        if (state.preview) setPreview(state.preview);
        if (state.spaceType) setSpaceType(state.spaceType);
        if (state.result) setResult(state.result);
        if (state.error) setError(state.error);
        if (state.fileName) setPersistedFile({ name: state.fileName, size: state.fileSize || 0 });
      }
    } catch {
      // ignore parse/storage errors
    }
  }, []);

  useEffect(() => {
    if (!result) return;
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          preview,
          spaceType,
          result,
          error,
          fileName: file?.name || persistedFile?.name,
          fileSize: file?.size || persistedFile?.size || 0,
        }),
      );
    } catch {
      // quota exceeded or other storage error
    }
  }, [result, preview, spaceType, error, file?.name, file?.size, persistedFile]);

  const validateFile = useCallback((f: File): string | null => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_TYPES.includes(f.type) && !["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
      return "Unsupported format. Please upload JPG, JPEG, PNG or WEBP.";
    }
    if (f.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 10MB.";
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (f: File) => {
      setError(null);
      setResult(null);
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        setFile(null);
        setPreview(null);
        setPersistedFile(null);
        try { sessionStorage.removeItem(SESSION_KEY); } catch {}
        return;
      }
      setFile(f);
      setPersistedFile({ name: f.name, size: f.size });
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(f);
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
    setPersistedFile(null);
    setResult(null);
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const canAnalyze = (file || preview) && spaceType;

  const handleAnalyze = useCallback(async () => {
    if (!canAnalyze || (!file && !preview)) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const base64Data = file ? await fileToBase64(file) : (preview || "");
      const response = await (generateAIVisualization as any)({
        data: {
          imageData: base64Data,
          spaceType,
        },
      });

      if (response.success && response.recommendations) {
        setResult(response);
      } else {
        setError(response.message || "We couldn't analyze your space this time. Please try again.");
      }
    } catch {
      setError("We couldn't analyze your space this time. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [canAnalyze, file, preview, spaceType]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
  }, []);

  const handleStartOver = useCallback(() => {
    setFile(null);
    setPreview(null);
    setPersistedFile(null);
    setSpaceType("");
    setResult(null);
    setError(null);
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
  }, []);

  const showResult = result && !error;
  const showError = error && !result;

  const SectionIcon = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
        <Icon className="size-4" />
      </div>
      <h3 className="text-sm font-semibold">{label}</h3>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHead
            eyebrow="AI Furniture Suggestions"
            title="Get AI Furniture Suggestions"
            lead="Upload a photo of your space, select the space type, and our AI will analyze it to suggest the best furniture and interior solutions from Payal Decor."
            align="center"
          />
          <div className="mt-6">
            <Button
              onClick={scrollToForm}
              className="bg-brand-gradient text-primary-foreground hover:shadow-[var(--shadow-lift)]"
            >
              <Sparkles className="mr-2 size-4" />
              Start Analyzing
            </Button>
          </div>
        </div>
      </Reveal>

      <div ref={formRef} className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Left: Upload + Form */}
        <div className="space-y-5">
          <Reveal>
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-semibold">Upload Your Space Image</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Drop your image here or browse. Supported formats: JPG, JPEG, PNG, WEBP. Maximum size: 10MB.
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
                      accept="image/jpeg,image/jpg,image/png,image/webp"
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
                        <p className="truncate text-sm font-medium">{file?.name || persistedFile?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file?.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : (persistedFile?.size ? `${(persistedFile.size / 1024 / 1024).toFixed(2)} MB` : "")}
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

                {(error) && (
                  <p className="mt-2 text-xs text-red-500">{error}</p>
                )}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-semibold">Select Space Type</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose the type of space in your uploaded image.
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

          <Reveal delay={160}>
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze || isAnalyzing}
              className="w-full bg-brand-gradient text-primary-foreground hover:shadow-[var(--shadow-lift)] disabled:opacity-60"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Analyzing your space...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  Get AI Furniture Suggestions
                </>
              )}
            </Button>
          </Reveal>
        </div>

        {/* Right: Result area */}
        <div className="space-y-5">
          <Reveal delay={120}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-10">
                    <Loader2 className="size-12 animate-spin text-primary" />
                    <div className="text-center">
                      <p className="text-sm font-semibold">Analyzing your space...</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Our AI is identifying furniture opportunities and matching them with Payal Decor solutions.
                      </p>
                    </div>
                  </div>
                ) : showResult && result ? (
                  <div className="flex h-full flex-col gap-5 overflow-y-auto">
                    <div>
                      <p className="text-sm font-semibold text-primary">AI Furniture Suggestions</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Based on your {spaceType.toLowerCase()} analysis
                      </p>
                    </div>

                    {result.recommendations.furniture?.length > 0 && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4">
                        <SectionIcon icon={Armchair} label="Recommended Furniture" />
                        <ul className="mt-3 space-y-2">
                          {result.recommendations.furniture.map((item: string, i: number) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <ArrowRight className="mt-0.5 size-3 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.recommendations.layout?.length > 0 && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4">
                        <SectionIcon icon={LayoutGrid} label="Space & Layout Suggestions" />
                        <ul className="mt-3 space-y-2">
                          {result.recommendations.layout.map((item: string, i: number) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <ArrowRight className="mt-0.5 size-3 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.recommendations.materials?.length > 0 && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4">
                        <SectionIcon icon={Palette} label="Material & Colour Suggestions" />
                        <ul className="mt-3 space-y-2">
                          {result.recommendations.materials.map((item: string, i: number) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <ArrowRight className="mt-0.5 size-3 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.recommendations.optimization?.length > 0 && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4">
                        <SectionIcon icon={Lightbulb} label="Space Optimization" />
                        <ul className="mt-3 space-y-2">
                          {result.recommendations.optimization.map((item: string, i: number) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <ArrowRight className="mt-0.5 size-3 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.recommendations.considerations?.length > 0 && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4">
                        <SectionIcon icon={Ruler} label="Design Considerations" />
                        <ul className="mt-3 space-y-2">
                          {result.recommendations.considerations.map((item: string, i: number) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <ArrowRight className="mt-0.5 size-3 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.matchedProducts?.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold">Matched Payal Decor Products</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Products from our catalogue that suit your space
                        </p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {result.matchedProducts.map((product: any, i: number) => (
                            <Card key={i} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="aspect-video w-full overflow-hidden bg-secondary/40">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="size-full object-cover"
                                  />
                                </div>
                                <div className="p-3">
                                  <p className="text-xs font-semibold">{product.name}</p>
                                  <p className="mt-1 line-clamp-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                                    {product.desc}
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    <Button asChild size="sm" variant="outline" className="h-7 text-[0.65rem]">
                                      <Link to={product.url}>View Product</Link>
                                    </Button>
                                    <Button asChild size="sm" className="h-7 bg-brand-gradient text-[0.65rem] text-primary-foreground">
                                      <Link to="/contact">Request Quote</Link>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 rounded-lg border border-border bg-accent/30 p-3">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
                      <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
                        AI suggestions are for general guidance only and do not replace professional interior design consultation.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                      >
                        <RefreshCw className="mr-2 size-3" />
                        Try Another Image
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleStartOver}
                      >
                        Start Over
                      </Button>
                    </div>
                  </div>
                ) : showError ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
                      <Sparkles className="size-7" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Unable to analyze space</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {error}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      <RefreshCw className="mr-2 size-3" />
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
                      <Sparkles className="size-7" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Your suggestions will appear here</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Upload an image and select a space type to get AI furniture suggestions.
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
