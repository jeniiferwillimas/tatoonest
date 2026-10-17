"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layouts/Footer";
import {
  Check,
  Upload,
  X,
  Star,
  Camera,
  User,
  FileText,
  Send,
  AtSign,
} from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadFromStorage } from "@/store/slices/authSlice";
import {
  fetchArtistProfile,
  createArtistProfile,
  updateArtistDetails,
  uploadArtistImage,
  deleteArtistImage,
  updateImagePrice,
  submitArtistProfile,
} from "@/store/slices/artistProfileSlice";
import { fetchLandingData } from "@/store/slices/landingSlice";
import { imgSrc } from "@/utils/urlHelper";

const STEPS = [
  { icon: User, title: "Start your profile", desc: "Your name and studio info" },
  { icon: AtSign, title: "Verify your identity", desc: "Quick verification to confirm it's you" },
  { icon: Camera, title: "Add your photos", desc: "6 photos minimum" },
  { icon: FileText, title: "Add your details", desc: "Name, bio, location, styles" },
  { icon: Send, title: "Submit for review", desc: "Finish the steps above first" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, token } = useAppSelector((s) => s.auth);
  const { exists, profile, loading, uploading, error } = useAppSelector((s) => s.artistProfile);
  const { styles: allStyles } = useAppSelector((s) => s.landing);

  const [activeStep, setActiveStep] = useState(0);
  const [isStudio, setIsStudio] = useState(false);
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!token && typeof window !== "undefined") {
      const stored = localStorage.getItem("token");
      if (!stored) router.push("/join");
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      dispatch(fetchArtistProfile());
      dispatch(fetchLandingData());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (profile) {
      setActiveStep(profile.currentStep);
      setIsStudio(profile.isStudio);
      setBio(profile.bio || "");
      setCity(profile.city || "");
      setCountry(profile.country || "");
      setSelectedStyles(profile.styles || []);
    }
  }, [profile]);

  const handleCreateProfile = async () => {
    await dispatch(createArtistProfile({ isStudio }));
    setActiveStep(1);
  };

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      await dispatch(uploadArtistImage({ file: files[i] }));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [dispatch]);

  const handlePriceChange = (imageId: number, value: string) => {
    const price = value === "" ? null : parseInt(value, 10);
    if (value !== "" && isNaN(price!)) return;
    dispatch(updateImagePrice({ imageId, price }));
  };

  const handleSaveDetails = async () => {
    await dispatch(updateArtistDetails({ bio, city, country, isStudio, styles: selectedStyles }));
    await dispatch(fetchArtistProfile());
    setActiveStep(4);
  };

  const handleSubmit = async () => {
    const result = await dispatch(submitArtistProfile());
    if (submitArtistProfile.fulfilled.match(result)) {
      setActiveStep(5);
    }
  };

  const toggleStyle = (name: string) => {
    setSelectedStyles((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  if (!token) return null;

  const imageCount = profile?.images?.length ?? 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            TattooNest
          </Link>
          <p className="text-sm" style={{ color: "#999" }}>Artist Onboarding</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Steps */}
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-2 mb-6">
              <Star size={20} className="text-[var(--accent)]" />
              <span className="text-lg font-bold">{isStudio ? "Studio" : "Artist"}</span>
            </div>

            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const done = profile ? profile.currentStep > idx : false;
              const current = activeStep === idx;

              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-start gap-4 py-4 border-t border-[var(--border)] first:border-t-0 text-left transition-colors ${current ? "" : "opacity-60 hover:opacity-100"}`}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${done ? "border-[var(--accent)] bg-[var(--accent)] text-white" : current ? "border-[var(--accent)] text-[var(--accent)]" : "border-gray-200"}`}
                  >
                    {done ? <Check size={16} /> : <Icon size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#999" }}>{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="min-h-[400px]">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Step 0: Start Profile */}
            {activeStep === 0 && !exists && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Start your profile</h2>
                  <p className="mt-2 text-sm" style={{ color: "#666" }}>
                    Set up your artist profile. Enter your details to get started.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isStudio"
                    checked={isStudio}
                    onChange={(e) => setIsStudio(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="isStudio" className="text-sm">This is a studio (not a solo artist)</label>
                </div>

                <Button size="lg" onClick={handleCreateProfile} disabled={loading}>
                  {loading ? "Creating..." : "Create Profile"}
                </Button>
              </div>
            )}

            {/* Step 0: Already created, show info */}
            {activeStep === 0 && exists && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Profile created</h2>
                  <p className="mt-2 text-sm" style={{ color: "#666" }}>
                    Your profile has been created. Continue with the next steps.
                  </p>
                </div>
                <Button size="lg" onClick={() => setActiveStep(1)}>Continue</Button>
              </div>
            )}

            {/* Step 1: Verification */}
            {activeStep === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Verify your identity</h2>
                  <p className="mt-2 text-sm" style={{ color: "#666" }}>
                    Use this verification code to confirm your identity. You can share it with our team when prompted.
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border)] bg-gray-50 p-6 text-center">
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#999" }}>Your verification code</p>
                  <p className="text-2xl font-mono font-bold tracking-widest text-[var(--accent)]">
                    TF-{user?.userId?.slice(0, 8).toUpperCase() || "XXXXXXXX"}
                  </p>
                </div>

                <p className="text-sm" style={{ color: "#666" }}>
                  Save this code — you may need it during the review process.
                </p>

                <Button size="lg" onClick={() => setActiveStep(2)}>Continue</Button>
              </div>
            )}

            {/* Step 2: Photos */}
            {activeStep === 2 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Add your photos</h2>
                  <p className="mt-2 text-sm" style={{ color: "#666" }}>
                    Upload at least 6 photos of your work. These will be shown on your profile.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${imageCount >= 6 ? "text-[var(--accent)]" : ""}`}>
                    {imageCount} of 6 minimum
                  </span>
                  {imageCount >= 6 && <Check size={16} className="text-[var(--accent)]" />}
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {profile?.images?.map((img) => (
                    <div key={img.id} className="flex flex-col gap-1.5">
                      <div className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--border)]">
                        <img
                          src={imgSrc(img.imageUrl)}
                          alt={img.fileName}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => dispatch(deleteArtistImage(img.id))}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <Input
                        type="number"
                        placeholder="Price"
                        defaultValue={img.price ?? ""}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handlePriceChange(img.id, e.target.value)}
                        icon={<span className="text-xs" style={{ color: "#999" }}>$</span>}
                        className="!py-1 !text-xs"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {uploading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
                    ) : (
                      <>
                        <Upload size={24} />
                        <span className="text-xs">Upload</span>
                      </>
                    )}
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <Button
                  size="lg"
                  onClick={() => setActiveStep(3)}
                  disabled={imageCount < 6}
                >
                  Continue ({imageCount}/6 photos)
                </Button>
              </div>
            )}

            {/* Step 3: Details */}
            {activeStep === 3 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Add your details</h2>
                  <p className="mt-2 text-sm" style={{ color: "#666" }}>
                    Tell people about yourself and your work.
                  </p>
                </div>

                <Textarea
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people about your tattoo style, experience, and what makes your work unique..."
                  rows={4}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. New York" />
                  <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. United States" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Styles (select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {allStyles.map((style) => (
                      <button
                        key={style.slug}
                        onClick={() => toggleStyle(style.name)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${selectedStyles.includes(style.name) ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Button size="lg" onClick={handleSaveDetails} disabled={loading || !bio || !city}>
                  {loading ? "Saving..." : "Save & Continue"}
                </Button>
              </div>
            )}

            {/* Step 4: Submit */}
            {activeStep === 4 && profile?.status !== "pending_review" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Submit for review</h2>
                  <p className="mt-2 text-sm" style={{ color: "#666" }}>
                    Review your profile before submitting. Our team will check everything and get back to you.
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border)] p-6">
                  <h3 className="text-sm font-semibold mb-4">Profile Summary</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "#666" }}>Location</span>
                      <span className="font-medium">{profile?.city}, {profile?.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#666" }}>Photos</span>
                      <span className={`font-medium ${imageCount >= 6 ? "text-[var(--accent)]" : "text-red-500"}`}>{imageCount} uploaded</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#666" }}>Styles</span>
                      <span className="font-medium">{profile?.styles?.join(", ") || "—"}</span>
                    </div>
                  </div>
                </div>

                <Button size="lg" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit for Review"}
                </Button>
              </div>
            )}

            {/* Submitted state */}
            {(activeStep === 5 || profile?.status === "pending_review") && (
              <div className="flex flex-col items-center gap-6 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <Check size={32} className="text-[var(--accent)]" />
                </div>
                <h2 className="text-2xl font-bold">Profile submitted!</h2>
                <p className="max-w-md text-sm" style={{ color: "#666" }}>
                  Your profile is now under review. Our team checks every profile personally.
                  You&apos;ll receive an email once your profile is approved.
                </p>
                <Link href="/">
                  <Button variant="outline" size="lg">Back to Home</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
