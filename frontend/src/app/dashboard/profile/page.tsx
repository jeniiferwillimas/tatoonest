"use client";

import { useState } from "react";
import { User, Mail, MapPin, Globe, Camera } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Button, Input, Textarea } from "@/components/ui";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Manage your account and public profile details.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Avatar Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent)] text-2xl font-bold text-white">
            {name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U"}
            <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 transition-colors hover:bg-gray-200">
              <Camera size={14} />
            </button>
          </div>
          <p className="text-base font-semibold">{name || "User"}</p>
          <p className="text-sm" style={{ color: "#999" }}>{email}</p>
          <p className="mt-1 text-xs font-medium capitalize" style={{ color: "var(--accent)" }}>{user?.role || "User"}</p>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-bold">Personal Information</h2>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={16} />}
              />
              <Input
                label="Email"
                value={email}
                disabled
                icon={<Mail size={16} />}
              />
            </div>

            <Textarea
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. New York"
                icon={<MapPin size={16} />}
              />
              <Input
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United States"
                icon={<Globe size={16} />}
              />
            </div>

            <h3 className="pt-2 text-base font-semibold">Social Links</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://your.website"
                icon={<Globe size={16} />}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
