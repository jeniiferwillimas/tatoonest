"use client";

import { useState } from "react";
import { Globe, Bell, Shield, Palette, Mail, Database } from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("TattooNest");
  const [siteDescription, setSiteDescription] = useState("Discover talented tattoo artists and get inspired for your next piece of body art.");
  const [contactEmail, setContactEmail] = useState("hello@tattonest.com");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  const sections = [
    {
      icon: Globe,
      title: "General",
      color: "#2563eb",
      content: (
        <div className="space-y-4">
          <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          <div>
            <label className="mb-1 block text-sm font-medium">Site Description</label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
          <Input label="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} icon={<Mail size={16} />} />
        </div>
      ),
    },
    {
      icon: Bell,
      title: "Notifications",
      color: "#f59e0b",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs" style={{ color: "#999" }}>Send email alerts for new bookings and messages.</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative h-6 w-11 rounded-full transition-colors ${emailNotifications ? "bg-[var(--accent)]" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${emailNotifications ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
      ),
    },
    {
      icon: Shield,
      title: "Security & Access",
      color: "#9333ea",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">Auto-approve Artists</p>
              <p className="text-xs" style={{ color: "#999" }}>Automatically approve new artist profiles without manual review.</p>
            </div>
            <button
              onClick={() => setAutoApprove(!autoApprove)}
              className={`relative h-6 w-11 rounded-full transition-colors ${autoApprove ? "bg-[var(--accent)]" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${autoApprove ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">Maintenance Mode</p>
              <p className="text-xs" style={{ color: "#999" }}>Temporarily disable public access to the site.</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative h-6 w-11 rounded-full transition-colors ${maintenanceMode ? "bg-red-500" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${maintenanceMode ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
      ),
    },
    {
      icon: Database,
      title: "Data",
      color: "#16a34a",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">Database</p>
              <p className="text-xs" style={{ color: "#999" }}>PostgreSQL — 12 artists, 12 styles seeded.</p>
            </div>
            <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">Connected</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">File Storage</p>
              <p className="text-xs" style={{ color: "#999" }}>Local filesystem storage for uploads.</p>
            </div>
            <span className="rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700">Local</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>Platform configuration and preferences.</p>
        </div>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ background: section.color }}>
                <section.icon size={18} />
              </div>
              <h2 className="text-lg font-bold">{section.title}</h2>
            </div>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
