import { useState } from "preact/hooks";

type ButtonState = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();

    if (!email) return;

    setButtonState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setButtonState("success");
        form.reset();
        setTimeout(() => setButtonState("idle"), 2000);
      } else {
        setButtonState("error");
        setTimeout(() => setButtonState("idle"), 2000);
      }
    } catch (error) {
      setButtonState("error");
      setTimeout(() => setButtonState("idle"), 2000);
    }
  };

  const buttonConfig = {
    idle: { text: "SUBSCRIBE", bg: "bg-black", disabled: false },
    loading: { text: "SUBSCRIBING...", bg: "bg-black", disabled: true },
    success: { text: "SUBSCRIBED!", bg: "bg-green-600", disabled: true },
    error: { text: "ERROR", bg: "bg-red-600", disabled: true },
  };

  const { text, bg, disabled } = buttonConfig[buttonState];

  return (
    <form onSubmit={handleSubmit} class="flex flex-col sm:flex-row gap-4 mt-2">
      <input
        type="email"
        name="email"
        placeholder="tony@soprano.com"
        required
        class="flex-1 px-4 py-2 border-2 border-black focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
      <button
        type="submit"
        disabled={disabled}
        class={`px-4 py-2 ${bg} text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        {text}
      </button>
    </form>
  );
}
