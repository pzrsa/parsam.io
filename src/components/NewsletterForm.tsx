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
    idle: { text: "SUBSCRIBE", bg: "bg-foreground text-background", disabled: false },
    loading: {
      text: "SUBSCRIBING...",
      bg: "bg-foreground text-background",
      disabled: true,
    },
    success: { text: "SUBSCRIBED!", bg: "bg-green-600 text-white", disabled: true },
    error: { text: "ERROR", bg: "bg-red-600 text-white", disabled: true },
  };

  const { text, bg, disabled } = buttonConfig[buttonState];

  return (
    <form onSubmit={handleSubmit} class="flex flex-col sm:flex-row gap-4 mt-2">
      <input
        type="email"
        name="email"
        placeholder="tony@soprano.com"
        required
        class="flex-1 px-4 py-2 border-2 border-foreground focus:outline-none shadow-[4px_4px_0px_0px_var(--color-foreground)]"
      />
      <button
        type="submit"
        disabled={disabled}
        class={`tracking-wide px-4 py-2 ${bg} font-bold border-2 border-foreground shadow-[4px_4px_0px_0px_var(--color-foreground)] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_var(--color-foreground)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        {text}
      </button>
    </form>
  );
}
