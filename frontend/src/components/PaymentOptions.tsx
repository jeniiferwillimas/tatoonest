"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Moon,
  ArrowRightLeft,
  Copy,
  Check,
  Loader2,
  ExternalLink,
  Bitcoin,
  Download,
  MousePointerClick,
  Coins,
  Send,
  MailCheck,
  Bot,
} from "lucide-react";
import urlHelper from "@/utils/urlHelper";

type Tab = "crypto" | "card";
type Provider = "alchemy" | "moonpay" | "transak";

interface GuideStep {
  title: string;
  desc: string;
}

interface PaymentOptionsProps {
  amount: number;
  productName: string;
  bookingId?: number;
}

const alchemySteps: GuideStep[] = [
  { title: "“Proceed to Payment” opens Alchemy Pay in a new tab", desc: "Do not close this tab. The amount will already be filled in USD." },
  { title: "Paste the wallet address you copied in Step 1", desc: "Look for “Wallet Address” or “Receiving Address” — this is critical." },
  { title: "Choose your payment method", desc: "Visa, Mastercard, Apple Pay, or Google Pay." },
  { title: "Enter your email for verification", desc: "Alchemy Pay sends a code to your email. Enter it to proceed." },
  { title: "Complete identity verification (first time only)", desc: "Photo of your ID or passport and a quick selfie. Takes 1–3 minutes." },
  { title: "Enter your card details", desc: "Card number, expiry date, and CVV. Double-check before continuing." },
  { title: "Review the summary and tap “Confirm”", desc: "You’ll see the total including fees. Don’t close the page until you see success." },
  { title: "Wait for confirmation", desc: "ETH is purchased and sent to your wallet. Usually takes 2–10 minutes." },
];

const moonpaySteps: GuideStep[] = [
  { title: "“Proceed to Payment” opens MoonPay in a new tab", desc: "Your amount will be pre-filled in USD. Keep this tab open." },
  { title: "Paste the wallet address you copied in Step 1", desc: "Without this address, the crypto has nowhere to go." },
  { title: "Create a MoonPay account or sign in", desc: "Enter your email. MoonPay sends a verification link or code." },
  { title: "Complete identity verification (first time only)", desc: "Photo of ID (front and back) and a selfie. Takes about 2–5 minutes." },
  { title: "Choose your payment method", desc: "Credit/Debit Card, Apple Pay, Google Pay, or Bank Transfer." },
  { title: "Enter your billing address", desc: "Must match what your bank has on file." },
  { title: "Review and tap “Buy Now”", desc: "Double-check the amount, wallet address, and payment details." },
  { title: "Wait for your payment to arrive", desc: "MoonPay purchases ETH and sends it to your wallet. Usually 5–15 minutes." },
];

const transakSteps: GuideStep[] = [
  { title: "“Proceed to Payment” opens Transak in a new tab", desc: "Make sure it says “Buy” (not “Sell”). Enter your amount in USD." },
  { title: "Make sure crypto is set to ETH (Ethereum)", desc: "If it shows something else, tap it and search for “ETH”." },
  { title: "Paste the wallet address you copied in Step 1", desc: "This is critical — without it, your crypto will not arrive." },
  { title: "Enter your email and verify it", desc: "Check your inbox (and spam folder) for the verification code." },
  { title: "Complete identity verification (first time only)", desc: "Select country, upload government ID, take a live selfie. Takes 1–5 minutes." },
  { title: "Select your payment method and enter card details", desc: "Credit Card, Debit Card, Apple Pay, or Google Pay." },
  { title: "Confirm and pay", desc: "Review the final summary. Your bank may send a verification SMS." },
  { title: "Wait for your payment", desc: "Transak buys ETH and sends it to your wallet. Usually 3–10 minutes." },
];

const providers = [
  { value: "alchemy" as Provider, label: "Alchemy Pay", Icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { value: "moonpay" as Provider, label: "MoonPay", Icon: Moon, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { value: "transak" as Provider, label: "Transak", Icon: ArrowRightLeft, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
];

function getSteps(provider: Provider): GuideStep[] {
  if (provider === "alchemy") return alchemySteps;
  if (provider === "moonpay") return moonpaySteps;
  return transakSteps;
}

function providerColors(p: Provider) {
  if (p === "alchemy") return { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", tipBg: "bg-blue-50", tipBorder: "border-blue-100", tipText: "text-blue-700" };
  if (p === "moonpay") return { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", tipBg: "bg-purple-50", tipBorder: "border-purple-100", tipText: "text-purple-700" };
  return { text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200", tipBg: "bg-cyan-50", tipBorder: "border-cyan-100", tipText: "text-cyan-700" };
}

export default function PaymentOptions({ amount, productName, bookingId }: PaymentOptionsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("crypto");
  const [walletAddress, setWalletAddress] = useState("");

  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [cryptoError, setCryptoError] = useState("");

  const [selectedProvider, setSelectedProvider] = useState<Provider>("alchemy");
  const [cardLoading, setCardLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const [copied, setCopied] = useState(false);

  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [confirmTxId, setConfirmTxId] = useState("");
  const [confirmMethod, setConfirmMethod] = useState("Crypto");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    fetch(urlHelper.payments.walletConfig)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setWalletAddress(data.data.walletAddress);
      })
      .catch(() => {});
  }, []);

  function copyWallet() {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCryptoCheckout() {
    if (!amount) { setCryptoError("No amount set"); return; }
    setCryptoError("");
    setCryptoLoading(true);
    try {
      const res = await fetch(urlHelper.payments.cryptoCheckout, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, bookingId }),
      });
      const data = await res.json();
      if (data.success && data.data.invoiceUrl) {
        window.location.href = data.data.invoiceUrl;
      } else {
        setCryptoError(data.message || "Failed to create checkout. Please try Card/Wallet payment instead.");
      }
    } catch {
      setCryptoError("Failed to connect. Please try Card/Wallet payment instead.");
    } finally {
      setCryptoLoading(false);
    }
  }

  async function handleCardCheckout() {
    if (!amount) { setCardError("No amount set"); return; }
    setCardError("");
    setCardLoading(true);
    try {
      const params = new URLSearchParams({ provider: selectedProvider, amount: String(amount) });
      const res = await fetch(`${urlHelper.payments.cardRampUrl}?${params.toString()}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to get payment URL");
      setWalletAddress(data.data.walletAddress);
      window.open(data.data.url, "_blank");
    } catch (e: unknown) {
      setCardError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setCardLoading(false);
    }
  }

  const steps = getSteps(selectedProvider);
  const colors = providerColors(selectedProvider);
  const providerLabel = providers.find((p) => p.value === selectedProvider)?.label ?? "";

  const cryptoSteps = [
    { Icon: Download, title: "Don’t have a crypto wallet?", desc: "Download Trust Wallet or Binance to proceed." },
    { Icon: MousePointerClick, title: "Review your booking details", desc: "Make sure the amount and service are correct before paying." },
    { Icon: ExternalLink, title: "Redirect to crypto payment page", desc: "You’ll be taken to our secure crypto checkout to continue." },
    { Icon: Coins, title: "Select a cryptocurrency", desc: "Choose your coin (e.g., USDT-TRC20, BTC, ETH) and tap NEXT STEP." },
    { Icon: Copy, title: "Get your unique wallet address", desc: "A one-time address is generated for your payment." },
    { Icon: Send, title: "Send the payment", desc: "Copy the address and send the exact amount from your wallet." },
    { Icon: MailCheck, title: "Confirmation", desc: "Your booking will be confirmed automatically within ~5 minutes." },
  ];

  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-2xl px-4">
        <p className="mb-6 text-sm" style={{ color: "#666" }}>
          Choose a payment method below. Complete payments only through the options provided.
        </p>

        {/* Tab Selector */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab("crypto")}
            className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
              activeTab === "crypto"
                ? "border-orange-500 ring-2 ring-orange-500/20 bg-orange-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <Bitcoin size={32} className={activeTab === "crypto" ? "text-orange-500" : "text-gray-400"} />
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-bold uppercase text-orange-600">
                Fast
              </span>
            </div>
            <div className="text-sm font-bold" style={{ color: "var(--text)" }}>Crypto</div>
            <div className="text-[10px]" style={{ color: "#999" }}>Bitcoin &amp; major cryptocurrencies</div>
          </button>

          <button
            onClick={() => setActiveTab("card")}
            className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
              activeTab === "card"
                ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <CreditCard size={32} className={activeTab === "card" ? "text-emerald-500" : "text-gray-400"} />
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-600">
                Secure
              </span>
            </div>
            <div className="text-sm font-bold" style={{ color: "var(--text)" }}>Card / Wallet</div>
            <div className="text-[10px]" style={{ color: "#999" }}>Credit/Debit &middot; Apple Pay &middot; Google Pay</div>
          </button>
        </div>

        <p className="mb-6 text-center text-[10px]" style={{ color: "#bbb" }}>
          For your safety, complete payments only through the options above.
        </p>

        {/* CRYPTO TAB */}
        {activeTab === "crypto" && (
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <Bitcoin size={20} className="text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>Crypto Payment</h2>
                <p className="text-xs" style={{ color: "#999" }}>Pay with BTC, ETH, USDT, and 100+ cryptocurrencies</p>
              </div>
            </div>

            {cryptoError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {cryptoError}
              </div>
            )}

            {/* Step-by-step */}
            <div className="mb-5 space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#999" }}>Crypto Payment Step by Step</div>
              <p className="text-xs" style={{ color: "#666" }}>
                Follow these steps to complete your payment safely.
              </p>
              <div className="space-y-2">
                {cryptoSteps.map((step, i) => {
                  const StepIcon = step.Icon;
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100">
                        {i > 0 ? (
                          <span className="text-[10px] font-bold" style={{ color: "#999" }}>{i}</span>
                        ) : (
                          <StepIcon size={14} style={{ color: "#999" }} />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{step.title}</div>
                        <div className="text-xs" style={{ color: "#666" }}>{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amount & pay */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs" style={{ color: "#999" }}>{productName}</p>
                <p className="text-center text-xl font-bold" style={{ color: "var(--text)" }}>
                  ${amount.toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleCryptoCheckout}
                disabled={cryptoLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3.5 font-semibold uppercase tracking-wide text-white transition-all hover:bg-orange-600 disabled:opacity-50"
              >
                {cryptoLoading ? <Loader2 size={20} className="animate-spin" /> : <Bitcoin size={20} />}
                <span>{cryptoLoading ? "Creating checkout..." : "Pay with Crypto"}</span>
              </button>
            </div>
          </div>
        )}

        {/* CARD / WALLET TAB */}
        {activeTab === "card" && (
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <CreditCard size={20} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>Card / Wallet Payment</h2>
                <p className="text-xs" style={{ color: "#999" }}>Pay with Credit/Debit Card, Apple Pay, or Google Pay</p>
              </div>
            </div>

            {cardError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {cardError}
              </div>
            )}

            {/* STEP 1: Copy wallet address */}
            <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-200 text-[10px] font-black text-amber-700">1</span>
                <span className="text-xs font-bold uppercase text-amber-700">First &mdash; Copy This Wallet Address</span>
              </div>
              <p className="mb-3 text-sm" style={{ color: "#555" }}>
                You will need to paste this address during checkout. It tells the payment provider where to send the crypto.{" "}
                <strong style={{ color: "var(--text)" }}>Copy it now before you continue.</strong>
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 overflow-hidden text-ellipsis rounded-md border border-gray-200 bg-white px-3 py-2.5 font-mono text-xs" style={{ color: "var(--text)" }}>
                  {walletAddress || "Loading..."}
                </code>
                <button
                  onClick={copyWallet}
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-bold transition-all ${
                    copied ? "bg-green-500 text-white" : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* STEP 2: Choose provider */}
            <div className="mb-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-[10px] font-black" style={{ color: "#666" }}>2</span>
                <span className="text-[10px] font-bold uppercase" style={{ color: "#666" }}>Choose Your Payment Provider</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {providers.map((p) => {
                  const ProviderIcon = p.Icon;
                  return (
                    <button
                      key={p.value}
                      onClick={() => setSelectedProvider(p.value)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border py-3 px-2 text-center transition-all ${
                        selectedProvider === p.value
                          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/30"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${p.bg}`}>
                        <ProviderIcon size={16} className={p.color} />
                      </div>
                      <span className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Instructions */}
            <div className="mb-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-[10px] font-black" style={{ color: "#666" }}>3</span>
                <span className="text-[10px] font-bold uppercase" style={{ color: "#666" }}>Follow These Steps Exactly</span>
              </div>
              <div className={`rounded-lg border bg-gray-50 p-4 ${colors.border}`}>
                <div className="mb-3 flex items-center gap-2">
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {providerLabel} &mdash; Step-by-Step Guide
                  </span>
                </div>
                <div className="space-y-3">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${colors.bg}`}>
                        <span className={`text-[10px] font-bold ${colors.text}`}>{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{step.title}</div>
                        <div className="mt-0.5 text-xs leading-relaxed" style={{ color: "#666" }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-3 rounded-md border px-3 py-2 ${colors.tipBg} ${colors.tipBorder}`}>
                  <p className={`text-xs ${colors.tipText}`}>
                    <strong>Accepted:</strong>{" "}
                    {selectedProvider === "moonpay"
                      ? "Visa, Mastercard, Apple Pay, Google Pay, Bank Transfer"
                      : "Visa, Mastercard, Apple Pay, Google Pay"}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "#999" }}>
                    <strong>Processing time:</strong>{" "}
                    {selectedProvider === "alchemy"
                      ? "2–10 minutes after payment"
                      : selectedProvider === "moonpay"
                        ? "5–15 minutes after payment"
                        : "3–10 minutes after payment"}
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 4: Amount & pay */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-[10px] font-black" style={{ color: "#666" }}>4</span>
                <span className="text-[10px] font-bold uppercase" style={{ color: "#666" }}>Confirm Amount &amp; Proceed</span>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs" style={{ color: "#999" }}>{productName}</p>
                <p className="text-center text-xl font-bold" style={{ color: "var(--text)" }}>
                  ${amount.toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleCardCheckout}
                disabled={cardLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3.5 font-semibold uppercase tracking-wide text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
              >
                {cardLoading ? <Loader2 size={20} className="animate-spin" /> : <ExternalLink size={20} />}
                <span>{cardLoading ? "Opening checkout..." : "Proceed to Payment"}</span>
              </button>
              <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs" style={{ color: "#999" }}>
                <span className="flex items-center gap-1"><CreditCard size={14} /> Visa</span>
                <span className="flex items-center gap-1"><CreditCard size={14} /> Mastercard</span>
                <span>Apple Pay</span>
                <span>Google Pay</span>
              </div>
              <div className="mt-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
                <p className="text-xs" style={{ color: "#555" }}>
                  <strong className="text-green-600">Important:</strong> Make sure you copied the wallet
                  address in Step 1 before clicking Proceed to Payment. If you did not paste it during
                  checkout, your payment will not reach us.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Confirmation */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <MailCheck size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text)" }}>Already Paid?</h3>
              <p className="text-xs" style={{ color: "#999" }}>Send us your payment confirmation</p>
            </div>
          </div>

          {confirmMsg ? (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {confirmMsg}
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setConfirmError("");
                setConfirmLoading(true);
                try {
                  const res = await fetch(urlHelper.payments.confirm, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: confirmName,
                      email: confirmEmail,
                      amount,
                      method: confirmMethod,
                      transactionId: confirmTxId || null,
                    }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    setConfirmMsg(data.message || "Confirmation sent!");
                  } else {
                    setConfirmError(data.message || "Something went wrong.");
                  }
                } catch {
                  setConfirmError("Failed to send. Please try again.");
                } finally {
                  setConfirmLoading(false);
                }
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "#666" }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "#666" }}>Your Email</label>
                  <input
                    type="email"
                    required
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "#666" }}>Payment Method</label>
                  <select
                    value={confirmMethod}
                    onChange={(e) => setConfirmMethod(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  >
                    <option value="Crypto">Crypto (BTC/ETH/USDT)</option>
                    <option value="Alchemy Pay">Alchemy Pay</option>
                    <option value="MoonPay">MoonPay</option>
                    <option value="Transak">Transak</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "#666" }}>Transaction ID (optional)</label>
                  <input
                    type="text"
                    value={confirmTxId}
                    onChange={(e) => setConfirmTxId(e.target.value)}
                    placeholder="0x... or TxID"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>

              {confirmError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {confirmError}
                </div>
              )}

              <button
                type="submit"
                disabled={confirmLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] py-3 font-semibold uppercase tracking-wide text-white transition-all hover:opacity-90 disabled:opacity-50"
              >
                {confirmLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{confirmLoading ? "Sending..." : "Send Payment Confirmation"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Telegram Payment Agent */}
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Bot size={22} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text)" }}>Need Help Paying?</h3>
              <p className="text-xs" style={{ color: "#999" }}>Chat with our Telegram agent &mdash; available 24/7</p>
            </div>
          </div>
          <p className="mb-4 text-xs leading-relaxed" style={{ color: "#666" }}>
            Our Telegram bot will walk you through the entire payment process step by step &mdash; whether you&apos;re paying with crypto (USDT TRC-20) or card/wallet (Visa, Apple Pay). It can generate payment links, share wallet addresses, and answer your questions instantly.
          </p>
          <a
            href="https://t.me/TattooNestBot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2AABEE] py-3.5 font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#229ED9]"
          >
            <Send size={18} />
            Pay via Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
