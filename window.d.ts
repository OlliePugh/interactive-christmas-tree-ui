import { PostHog } from "posthog-js";

declare global {
  interface Window {
    posthog: PostHog;
  }
}

window.MyNamespace = window.MyNamespace || {};
