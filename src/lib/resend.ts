const RESEND_API_BASE = "https://api.resend.com";

function getApiKey() {
  return process.env.RESEND_API_KEY?.trim();
}

function getHeaders() {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": "jazmine-marie-site/1.0",
  };
}

export function isResendConfigured() {
  return Boolean(getApiKey());
}

export function getResendFrom() {
  return process.env.RESEND_FROM_EMAIL?.trim() || "Jazmine Marie <hello@trainershub.app>";
}

export function getLeadNotificationEmail() {
  return process.env.LEAD_NOTIFICATION_EMAIL?.trim() || "hello@jazminemarie.com";
}

async function resendRequest(path: string, body: Record<string, unknown>) {
  const headers = getHeaders();
  if (!headers) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch(`${RESEND_API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(`Resend ${path} failed (${response.status}): ${typeof data === "string" ? data : JSON.stringify(data)}`);
  }

  return data;
}

export async function sendTransactionalEmail(input: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  idempotencyKey?: string;
}) {
  return resendRequest("/emails", {
    from: getResendFrom(),
    to: Array.isArray(input.to) ? input.to : [input.to],
    subject: input.subject,
    text: input.text,
    html: input.html,
    ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    ...(input.idempotencyKey ? { headers: { "Idempotency-Key": input.idempotencyKey } } : {}),
  });
}

export async function triggerQuizNurture(input: {
  email: string;
  firstName: string;
  result: string;
}) {
  return resendRequest("/events", {
    event: "overcomeher.quiz.completed",
    email: input.email,
    payload: {
      first_name: input.firstName,
      result: input.result,
      membership_url: "https://jazmine-marie.vercel.app/overcomeher/membership",
      quiz_url: "https://jazmine-marie.vercel.app/healing-style-quiz",
    },
  });
}
